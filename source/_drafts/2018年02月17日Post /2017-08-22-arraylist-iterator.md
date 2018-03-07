---
title: 关于ArrayList的Iterator源码分析
date: 2017-08-20 20:37:41
tags: 
thumbnail: 
---

读书不在于多，在于精。

<!-- more -->

ArrayList 的 Iterator 对象不能连续调用remove() 两次，同时也不能在调用iterator()方法之后再增加或者删除原集合的元素（get和set无影响）。为什么？

ArrayList 的父类 AbstractList 中有一个记录这个 List 修改次数的变量 modCount，每次 add 和 remove 时，这个字段会相应地增加1。咋们来看看源码：add()方法里就几行代码，没有发现modCount自增的操作，只有一个ensureCapacityInternal()方法，这个方法会确保集合能存下当前这个元素，ensureCapacityInternal()方法中又有ensureExplicitCapacity()方法，这个方法内部就执行了modCount++的操作。这当然不是这个方法最重要的操作，下面有个判断增加新的元素后的长度是否大于当前集合的长度，如果是说明容量不够，需要扩容。

实现扩容的方法是grow(minCapacity)，它每次扩容的大小是当前集合长度 + （当前集合长度>>1)，也就是增加50%的长度，如果还是不满足minCapacity的要求，就直接指定成 minCapacity 的长度。对了，如果长度超级大，则可能会抛出OutOfMemoryError异常。接下来就是调用 Arrays.copyOf(elementData, newCapacity) 来把旧的集合元素拷贝到扩容后的新的集合中。

接下来我们回到add()方法中，它调用了System.arraycopy(elementData, index, elementData, index + 1, size - index); 方法，它的作用是将源数组中指定长度的元素，拷贝到新的数组中。它的五个参数依次是：源数组，源数组中拷贝的起始索引，目标数组，目标数组中赋值的起始索引，拷贝的长度。

System.arraycopy() 被修饰为了native ，说明是以JNI的方式调用本地操作系统中的方法。(JNI，Java Native Interface 故名思意，就是java语言调其它语言的一个接口)。

Iterator 调用next之后再调用previous 是同一个元素。

smartni

2017年08月20日