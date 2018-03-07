---
title: 温故而知新——封装继承多态
date: 2017-07-30 14:34:25
tags: Java
thumbnail: http://osoa5juml.bkt.clouddn.com/image/site/1503123644337.png
---

想得到你从未拥有过的东西，就必须做你从未做过的事情。   @(美)Thomas Jefferson



<!-- more -->

> 面向对象的三个基本特征是：封装、继承、多态。这是我对这三个特征的一些总结，希望能帮助大家复习一下。



#   什么是封装 ？

封装通过合并特征和行为来创建新的数据类型，并隐藏实现细节（私有化），把接口和实现分离开来，使得代码模块化。



#   什么是继承 ？

一句话解释就是：继承可以扩展已存在的代码模板（类）。继承和封装有一个共同的目的——代码重用。

除了修饰为 private 和 final 的，子类是继承不了的之外，构造器也是不能被继承的。对于构造器而言，它只能够被调用（ super() ），而不能被继承。

子类会默认调用父类的构造器。如果父类没有默认的构造器，子类必须显示地指定父类的构造器，而且必须是在子类构造器中做的第一件事（第一行代码）。

要实现继承，可以通过 “ 继承 ” 或 “ 组合 ” 来实现。

继承是一种强耦合关系，当考虑要不要继承的时候，先问自己子类是否需要向上转型到父类。如果必须向上转型，则继承是必要的，但是如果不需要，则应当好好考虑是否需要继承。

继承允许将对象视为自己本身的类型或其基类型来加以处理（ 向上转型 ）。也就是说继承允许将多种类型（ 同一父类导出的 ）视为同一类型来处理。这为多态提供了前提条件。接下来我们来看看多态。



# 什么是多态 ？

> “不要犯傻，如果它不是后期绑定，它就不是多态。” ——Bruce Eckel

多态通过分离做什么和怎么做，从另一个角度将接口和实现分离开来。多态的作用是消除类型之间的耦合关系。多态的目的——接口重用。

多态的实现条件？

✔继承/接口✔重写✔向上转型

在继承的基础上，多态允许一种类型表现出与其他相似类型之间的区别，只要它们都是从同一基类导出的。通过对同一个基类方法的调用，表现出不同的行为。

例如，Shape 类有三个具体子类 Circle、Square、Triangle。他们都具体实现了父类的 draw() 方法。将其中一个子类对象的引用传递给父类对象（ 这里会发生向上转型 ），调用父类对象的 draw() 方法，就会表现出子类对象的具体行为。这是多么的神奇啊！

继承是单继承，接口是多继承多实现。实际上，接口与多态有更广泛的应用。

为什么重载不行？

方法重载其实不属于 “ 面向对象编程 ”，重载的实现是：编译器根据函数不同的参数列表，对同名函数的名称做修饰，然后这些同名函数就成了不同的函数（ 至少对于编译器来说是这样的 ）。也就是说，重载的方法的地址在编译器就绑定了（ 前期绑定 ），因此，重载与多态无关。

真正和多态相关的是 “ 覆盖 ” ，也就是方法重写。当子类重新定义父类的函数后，子类将自己的类型传递给父类后，父类动态调用属于子类的该函数，这样的函数调用再编译器是无法确定的（ 调用子类的的函数地址无法给出 ）。因此，这样的函数地址是在运行期绑定的。

需要注意的是，private 和 final 方法是不能被覆盖的。private 方法被自动认为是 final 方法。

这里还有一个大坑，那就是域和静态方法。我们来看一个例子

```java
class Super{
  public int field = 0;
  public int getField() { return field; }
}
```

```java
class Sub extends Super{
    public int field = 1;
  	public int getField() { return field; }
  	public int getSuperField() { return super.field; }
}
```

``` java
public class FieldAccess{
  public static void main(String[] args){
    Super sup = new Sub(); //向上转型
    System.out.println("sup.field = " + sup.field +
    	", sup.getField() = " + sup.getFiled());
    Sub sub = new Sub(); 
    System.out.println("sub.field = " + sub.field +
    	", sub.getField() = " + sub.getFiled() +
    	", sub.getSuperField() = " + sub.getSuperField());
  }
}
```

结果是

> sup.field = 0,sup.getField() = 1
>
> sub.field = 1,sub.getField() = 1,sub.getSuperField() = 0

可以看到 sup.field 等于 0 ，也就是说，并没有显示出子类的具体特征。

当子类对象转型为父类引用时，任何域的访问操作都将由编译器解析。由编译器解析就不是多态，因为它是前期绑定。在这个例子中，为 Super.field 和 Sub.field 分配了不同的存储空间，这样 Sub 就包含了两个称为 field 的域：它自己的和从 Super 继承得到的，最重要的是在引用 Sub 中的 field 时所产生的默认域并非 Super 的，要想获取 Super.field 就必须显式地指明 super.field。

![金属质感分割线](https://mmbiz.qlogo.cn/mmbiz/cZV2hRpuAPjEIibB1UYw1VMPzscNxReKZVxEh23qB9KgPqFq3uoyBy3M93PcFOunrvjkYVrtfvXMworbBuWAZ4A/0)

注：方法调用绑定（Method-call binding）

下面是 《Think in Java》中对绑定的解释:

Connecting a method call to a method body is called binding. when binding is performed before the program is run (by the compiler and linker,if there is one), it’s called early binding. 

将一个方法调用同一个方法主体关联起来称为绑定。在程序执行前进行绑定（一般由编译器和连接程序实现），就叫做前期绑定（也可以说成是编译期绑定）。C 语言只有一种方法调用，那就是前期绑定。

相信小伙伴们一定猜到有前期绑定，就一定有后期绑定。没错，Java 中的后期绑定就是在运行时根据对象的类型进行绑定，后期绑定也叫做动态绑定或运行时绑定。 Java 中除了static 方法和 final 方法（ private 属于 final 方法 ） ，其他方法都是后期绑定。


