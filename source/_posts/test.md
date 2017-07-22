---
title: JSP学习笔记（1）-JSP简介
date: 2017-07-12 18:55:24
tags:
---
[jsp你好.](#jsp你好。哈哈abc)
[jsp你好.](#jsp你好.哈哈abc)
[jsp你好.](#jsp你好哈哈abc)
[jsp你好.](#jsp你好哈哈)
[2什么是JSP？](#什么是jsp)
[jsp你好.](#1：jsp你好哈哈)
[jsp你好.](#1jsp你好哈哈)
<a href="#什么是jsp"> 什么是JSP</a>

<a href="https://github.com/SmartNJ/SimpleLifee.github.io/blob/hexo/source/_posts/test.md#什么是jsp"> 3ddd </a>

[jsp你好.](#1world你好)
<a href="#1world你好"> 1world 你好</a>

---

## 什么是JSP？

JSP是Java server page的缩写，有sun公司倡导，许多公司参与，于1999年推出的一种web服务设计标准。
JSP基于Java Servlet以及整个java体系的Web开发技术。
Java servlet 就是编写在服务器端创建对象的java类，习惯上称为servlet类，servlet类的对象习惯上称为一个servlet。
那么二者的关系是什么呢？
Java Servlet是java语言的一部分，而jsp是基于java servlet的，jsp具备了几乎所有java servlet的好处，当客户请求一个jsp页面时，tomcat服务器自动生成java文件、编译java文件，并用编译得到的字节码文件在服务器端创建一个servlet。
Java servlet是java的一部分，jsp是java servlet一个成功的应用，但是jsp并不是java servlet的一个子集，jsp可以配合javabean有效分离页面视图和数据存储，也可以是jsp+javabean+servlet创建web应用。

## jsp你好.哈哈abc
##         1、World，你好。       

###### 1：jsp你好。哈哈

## JSP的运行原理？

当服务器上的一个JSP页面第一次被请求执行时，服务器上的JSP引擎首先将JSP页面文件转换成一个java文件，并编译这个Java文件生成字节码文件，然后执行字节码文件响应客户的请求。当这个页面再次被请求执行时，JSP引擎将直接执行字节码文件来响应客户。
字节码文件的主要工作：
（1）处理JSP标记，并将有关的处理结果发送到客户的浏览器
（2）把JSP页面中的HTML标记符号交给客户浏览器
（3）执行<%%>之间的java代码，并返回结果给客户浏览器
（4）多用户访问的时候，Tomcat给每个客户一个线程，通过执行常驻内存的字节码文件响应客户的请求


## 3.JSP运行环境

Tomcat环境配置

JDK必备，注意设置Java环境变量
Tomcat 安装完成浏览器输入：localhost:8080或者127.0.0.1:8080测试是否安装成功
Tomact 配置文件 ../conf/server.xml
端口配置：

<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
## 4.Tomcat的Web服务目录

目录：../webapps/  Root目录为根目录，localhost:8080默认访问root目录下的index.jsp页面
新建Web服务目录

...
<Context path="pinnsvin" docBase="D:\workplace\Tomcat" debug="0" reloadable="true"/>
</Host>
localhost:8080/pinnsvin 就可以访问到"D:\workplace\Tomcat"目录了


项目目录：默认在tomcat目录下webapps目录下，可以在此目录下建立项目目录，访问：“localhost:8080/项目目录/文件.jsp”。如果，项目下存在index.jsp可以使用”localhost:8080/项目目录“访问。

## 设置Tomcat虚拟目录

就是这种效果



 要如何实现呢？

在tomcat目录下conf/server.xml中配置
```
  <Context path="cm" docBase="E:\CM" debug="0" reloadable="true" crossContext="true"/>
```
修改conf/web.xml
```
    <param-value>false</param-value>中false改为true
    <servlet>
        <servlet-name>default</servlet-name>
        <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
        <init-param>
            <param-name>debug</param-name>
            <param-value>0</param-value>
        </init-param>
        <init-param>
            <param-name>listings</param-name>
            <param-value>true</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
```
