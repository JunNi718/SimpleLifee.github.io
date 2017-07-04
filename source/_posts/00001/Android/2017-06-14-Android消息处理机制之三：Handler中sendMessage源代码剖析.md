---
title: Android消息处理机制之三：Handler中sendMessage源代码剖析
date: 2017-06-14 10:35:30
tags: Android

---



Handler中sendMessage源代码剖析。

<!-- more -->

参考自 AHuier的 [Handler 中 sendMessage() 源代码剖析](http://blog.csdn.net/xukunhui2/article/details/17013647)

1. 使用Handler中的sendEmptyMessage(int what)方式来发送消息.

 sendEmptyMessage (int what)

——> sendEmptyMessageDelayed(int what, long delayMillis)

——>sendMessageDelayed(Message msg, long delayMillis)  

——>sendMessageAtTime(Message msg, long uptimeMillis)  

——>enqueueMessage(Message msg, long when)



2. 使用Handler中的sendEmptyMessageAtTime(int what,long uptimeMillis)方式来发送消息.

sendEmptyMessageAtTime(int what,long uptimeMillis)

——>sendMessageAtTime(msg, uptimeMillis)



3. 使用Handler中的sendEmptyMessageDelayed (int what, long delayMillis)方式来发送消息。

sendEmptyMessageDelayed(int what, long delayMillis) 

——>sendMessageDelayed(Message msg, long delayMillis) 

——>sendMessageAtTime(Message msg, long uptimeMillis)

```shell
public final boolean sendMessageDelayed(Message msg, long delayMillis)  
{  
    if (delayMillis < 0) {  
        delayMillis = 0;  
    }  
    return sendMessageAtTime(msg, SystemClock.uptimeMillis() + delayMillis); 
}
```

SystemClock.uptimeMillis() 是获得到系统启动开机的时间到当前的时间（不包括休眠的时间）

SystemClock.uptimeMillis() + delayMillis 这个是sendMessageAtTime 和 sendMessageDelayed 的区别。



4. 使用Handler中的sendMessage (Message msg)方式来发送消息.

sendMessage(Message msg) 

——> sendMessageDelayed(Message msg, long delayMillis) 

——> sendMessageAtTime(Message msg, long uptimeMillis)







