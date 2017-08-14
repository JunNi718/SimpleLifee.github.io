---
title: Android消息处理机制之二：消息中obtain源代码剖析
date: 2017-06-14 10:36:40
tags: Android
categories: Android
---





Message中obtain()源码分析

<!--more -->

参考自 AHuier的[Android消息处理机制之二：消息中obtain()源代码剖析](http://blog.csdn.net/xukunhui2/article/details/17012923) 

obtain的源码，可见是从消息池中取出对象。这里为了防止多个任务访问消息池获取对象，使用 synchronized(sPoolSync) 将 obtain() 方法上锁了。

```java
private static final Object sPoolSync = new Object();  
private static Message sPool;  
private static int sPoolSize = 0;  
  
private static final int MAX_POOL_SIZE = 10;  
  
/** 
 * Return a new Message instance from the global pool. Allows us to 
 * avoid allocating new objects in many cases. 
 */  
public static Message obtain() {  
    synchronized (sPoolSync) {  
        if (sPool != null) {  
            Message m = sPool;  
            sPool = m.next;  
            m.next = null;  
            sPoolSize--;  
            return m;  
        }  
    }  
    return new Message();  
}  
```





1) 通过 Message.obtain()方式获取Message对象

```java
public class MyThread implements Runnable{  
  
    @Override  
    public void run() {  
        // 使用第一种构造方法  
        Message message = Message.obtain();  
        message.what = 1;  
        message.arg1 = 1;  
        message.arg2 = 3;  
        message.obj = "SmartNi";  
        handler.sendMessage(message);  
    }          
}  
```



2) 通过 Message.obtain(Handler h)的方式获取Message对象

首先查看一下obtain(Handler h)的源码，可见 message 的目标对象已经指向了 Handler ，那么在发送消息的时候就直接调用 sendToTarget() 方法即可。

```java
     /**
     * Same as {@link #obtain()}, but sets the value for the <em>target</em> member on the Message returned.
     * @param h  Handler to assign to the returned Message object's <em>target</em> member.
     * @return A Message object from the global pool.
     */
    public static Message obtain(Handler h) {
        Message m = obtain();
        m.target = h;
        return m;
    }
```



```java
/* 
 *  第二种获取Message对象的方法 
 *  public static Message obtain (Handler h) 
 *  传递一个关联到消息Handler. 
 */  
Message message = Message.obtain(handler);  
message.what = 1;  
message.arg1 = 1;  
message.arg2 = 3;  
message.obj = "SmartNi";  
message.sendToTarget(); // 完成发送消息的动作  
```

因为

```java
...  
/*package*/ Handler target;    
...   
/** 
 * Sends this Message to the Handler specified by {@link #getTarget}. 
 * Throws a null pointer exception if this field has not been set. 
 */  
public void sendToTarget() {  
    target.sendMessage(this);  //这里
}  
```



3) 通过 Message.obtain(Handler h,int what)的方式获取Message对象

```java
/** 
 * Same as {@link #obtain()}, but sets the values for both <em>target</em> and 
 * <em>what</em> members on the Message. 
 * @param h  Value to assign to the <em>target</em> member. 
 * @param what  Value to assign to the <em>what</em> member. 
 * @return A Message object from the global pool. 
 */  
public static Message obtain(Handler h, int what) {  
    Message m = obtain();  
    m.target = h;  
    m.what = what;  
  
    return m;  
}  
```





4) 通过 Message.obtain(Handler h, int what, int arg1, int arg2, Object obj)的方式获取Message对象

```java
/* 
 * public static Message obtain (Handler h, int what, int arg1, int arg2, Object obj) 
 * 关联Handler和传递Message的几种常用属性值 
 */  
Message message = Message.obtain(handler, 1, 1, 3, "SmartNi");  
message.sendToTarget(); 
```



```java
/** 
 * Same as {@link #obtain()}, but sets the values of the <em>target</em>, <em>what</em>,  
 * <em>arg1</em>, <em>arg2</em>, and <em>obj</em> members. 
 *  
 * @param h  The <em>target</em> value to set. 
 * @param what  The <em>what</em> value to set. 
 * @param arg1  The <em>arg1</em> value to set. 
 * @param arg2  The <em>arg2</em> value to set. 
 * @param obj  The <em>obj</em> value to set. 
 * @return  A Message object from the global pool. 
 */  
public static Message obtain(Handler h, int what,   
        int arg1, int arg2, Object obj) {  
    Message m = obtain();  
    m.target = h;  
    m.what = what;  
    m.arg1 = arg1;  
    m.arg2 = arg2;  
    m.obj = obj;  
  
    return m;  
}  
```

5) 通过上述几个例子我们可以知道Message中的obtain()的几种重载方法在底层的实现都是大同小异的,他们都是底层都是首先调用obtain()方法来从消息池中获得一个消息的对象的。然后在通过参数传递来封装指定的Handler和需要携带的数据。如果使用这些重载的方法建议完成数据封装之后调用sendToTarget()方法。这就是几种obtain()重载方法的不同。

6) 这里我们需要特别注意Message中的这个重载方法:**Message obtain (Message orig)** 它是将原有的消息体作为一个新的消息参数来发送的,我们看一下它的源代码。

```java
/** 
 * Same as {@link #obtain()}, but copies the values of an existing 
 * message (including its target) into the new one. 
 * @param orig Original message to copy. 
 * @return A Message object from the global pool. 
 */  
public static Message obtain(Message orig) {  
    Message m = obtain();  
    m.what = orig.what;  
    m.arg1 = orig.arg1;  
    m.arg2 = orig.arg2;  
    m.obj = orig.obj;  
    m.replyTo = orig.replyTo;  
    if (orig.data != null) {  
        m.data = new Bundle(orig.data);  
    }  
    m.target = orig.target;  
    m.callback = orig.callback;  
  
    return m;  
}  
```

