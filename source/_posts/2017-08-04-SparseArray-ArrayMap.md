---
title: Viewholder中为什么要使用SparseArray对View进行存储？
date: 2017-08-04 13:59:21
tags: Android
---

最近项目时，设计 ViewHolder 时用到了 SparseArray，为什么一定要用这个呢？ SparseArray 有什么优点吗？

private SparseArray<View> mViews; 

使用SparseArray保存View。

 SparseArray 比 HashMap更省内存。为什么？

参考：[http://blog.csdn.net/u010687392/article/details/47809295](http://blog.csdn.net/u010687392/article/details/47809295)

<!-- more -->





---



# Hashmap

Hashmap内部默认使用一个容量16的数组来存储数据，而数组中每个元素又是一个链表的头结点。也就是说，Hashmap内部是使用哈希表的拉链结构（数组+链表），也叫做拉链法：

<img src="http://osoa5juml.bkt.clouddn.com/image/site/1501826801083.png" width="528"/>

每个结点是一个Entry，Entry的内部的属性：

```
final K key; 

V value; 

final int hash; 

HashMapEntry<K, V> next;
```

这些Entry数据是按什么规则进行存储的？

通过key计算hash值，然后对HashMap中的数组长度取余得到该元素的存储位置，  hash(key) % len。

拉链法解决了元素冲突的问题，后一个元素不会覆盖前一个元素。

解决hash冲突的方法还有：

1、开放地址法

2、再哈希法

3、链地址法

4、建立公共溢出区

HashMap的默认容量是16，我们创建一个新的HashMap，即使里面没有数据，也会占用16个数据的内存。如果不断往里面put东西，容量到达一个值时就会扩容，这个值怎么算？  答 ：当前容量 * 加载因子（HashMap默认是0.75）。 根据源码，它一定会扩大为原来的两倍。

```
int newCapacity = oldCapacity * 2;
```

所以说，只要满足条件就会扩容，如果数据量很大，就需要不算扩容（而且是2倍），加上计算hash值的消耗，会对内存空间造成很大的消耗和浪费。

HashMap是通过遍历entry[]数组来得到对应的元素，数据量一大就会比较慢。



# SparseArray

SparseArray能避免对key的自动装箱（比如 int 转为 Integer），内部是通过两个数组来存储数据。注意这里key只能是int类型的。

```
private int[] mKeys; 

private Object[] mValues;
```

SparseArray在读取和存放数据的时候，是使用二分查找法

```
public void put(int key, E value) {
      int i = ContainerHelpers.binarySearch(mKeys, mSize, key); 
      … 
} 
public E get(int key, E valueIfKeyNotFound) {
      int i = ContainerHelpers.binarySearch(mKeys, mSize, key); 
      … 
}
```



Put的时候会使用二分查找法，对当前添加的元素和之前已添加的元素的key进行比较，然后从小到大排序。所以SparseArray存储的元素都是按元素的key值从小到大排序好的。

获取的时候也使用二分查找法，比HashMap快得多，HashMap是通过遍历entry数组来获取元素的。

添加数据

```
public void put(int key, E value)
```

删除数据

```
public void remove(int key)
```

或者

```
public void delete(int key)
```

remove内部就是调用delete来删除的。

获取数据

```
public E get(int key)
```

或者
```
public E get(int key, E valueIfKeyNotFound)
```
如果key不存在就会返回valueIfKeyNotFound。

特有方法
```
public int keyAt(int index)

和

public E valueAt(int index)
```

SparseArray      应用场景
虽说SparseArray的性能比较好，但是由于每次增加、修改、删除都需要进行一个二分查找，所以一旦数据量大了，性能提升的并不明显，降低至少50%。

满足下面两个条件我们可以使用SparseArray代替HashMap：

{% emoji star %}  数据量不大，最好在千级以内
{% emoji star %}  key必须为int类型

这样，把HashMap替换成SparseArray比较好。


# ArrayMap

ArrayMap是一个<Key,Value>映射的map数据结构，SparseArray是数组结构，基本和SparseArray一样。

ArrayMap应用场景

满足下面两个条件我们可以使用ArrayMap代替HashMap：

- 数据量不大，最好在千级以内
- 数据结构类型为Map类型

注意这个类在API 19之后才能用，若要兼容之前版本，需要导包：

import android.support.v4.util.ArrayMap;



总结：

SparseArray 和 ArrayMap 如何选择？

假设数据量都在千级以内的情况下：

1、如果key的数据类型确定为int类型，那么使用SparseArray，因为它避免了自动装箱，如果key为long，它还提供了一个LongSparseArray来确保key为long类型时的使用。

2、如果key类型为其它的类型，则使用ArrayMap。



<center>
​								END
![img](https://mmbiz.qlogo.cn/mmbiz_jpg/cOpSHfR7OBp9wokabGvc5BEdicoQ2hI8nQ2VylH1opRxHc5XAkvrTf4nS4KoZC14SRgh0vkHLIM7icicHlDwD8gQA/0.jpeg)
长按二维码关注
个人博客：http://nijun.github.io
GitHub：https://github.com/SmartNJ
</center>