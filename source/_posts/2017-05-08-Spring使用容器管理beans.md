---
title: Spring使用容器管理beans
date: 2017-05-08 13:14:00
tags: Spring
---

<div align="center">

使用容器管理beans

</div>

<!-- more-->

# 使用容器管理beans



基于Spring框架构建的应用中的对象，都由Spring容器（container）管理，如下图所示。Spring容器负责创建对象、编织对象和配置对象，负责对象的整个生命周期。



![](beans.png)



容器是Spring框架的核心，通过依赖注入（DI）管理构成Spring应用的组件。正是因为有容器管理各个组件之间的协作关系，使得每个Spring组件都很好理解、便于复用和单元测试。

Spring容器有多种实现，可以分为两类：

- *Bean factories*（由*org.springframework.beans.factory.BeanFactory*接口定义）是最简单的容器，只提供基本的依赖注入功能；
- *Application context*（由*org.springframework.context.ApplicationContext*接口定义）在bean factory的基础上提供application-framework框架服务，例如可以从properties文件中解析配置信息、可以对外公布application events。

## 应用上下文（application context）

Spring提供了多种application context，可列举如下：

- *AnnotationConfigApplicationContext*——从Java配置文件中加载应用上下文；
- *AnnotationConfigWebApplicationContext*——从Java配置文件中加载Spring web应用上下文；
- *ClassPathXmlApplicationContext*——从classpath（resources目录）下加载XML格式的应用上下文定义文件；
- *FileSystemXmlApplicationContext*——从指定文件系统目录下加载XML格式的应用上下文定义文件；
- *XmlWebApplicationContext*——从classpath（resources目录）下加载XML格式的Spring web应用上下文。

**通过应用上下文实例，可以通过*getBean()*方法获得对应的bean。**







## bean的生命周期

在传统的Java应用中，一个对象的生命周期非常简单：通过new创建一个对象，然后该对象就可以使用，当这个对象不再使用时，由Java垃圾回收机制进行处理和回收。

在Spring应用中，bean的生命周期的控制更加精细。Spring提供了很多节点供开发人员定制某个bean的创建过程，掌握这些节点如何使用非常重要。Spring中bean的生命周期如下图所示：

![](bean_life_circle.png)



可以看出，bean factory负责bean创建的最初四步，然后移交给应用上下文做后续创建过程：

1. Spring初始化bean
2. Spring将值和其他bean的引用注入（inject）到当前bean的对应属性中；
3. 如果Bean实现了*BeanNameAware*接口，Spring会传入bean的ID来调用*setBeanName*方法；
4. 如果Bean实现了*BeanFactoryAware*接口，Spring传入bean factory的引用来调用*setBeanFactory*方法；
5. 如果Bean实现了*ApplicationContextAware*接口，Spring将传入应用上下文的引用来调用*setApplicationContext*方法；
6. 如果Bean实现了*BeanPostProcessor*接口，则Spring调用*postProcessBeforeInitialization*方法，这个方法在初始化和属性注入之后调用，在任何初始化代码之前调用；
7. 如果Bean实现了*InitializingBean*接口，则需要调用该接口的*afterPropertiesSet*方法；如果在bean定义的时候设置了*init-method*属性，则需要调用该属性指定的初始化方法；
8. 如果Bean实现了*BeanPostProcessor*接口，则Spring调用*postProcessAfterInitialization*方法
9. 在这个时候bean就可以用于在应用上下文中使用了，当上下文退出时bean也会被销毁；
10. 如果Bean实现了*DisposableBean*接口，Spring会调用*destroy()*方法;如果在bean定义的时候设置了*destroy-method*， 则此时需要调用指定的方法。

本节主要总结了如何启动Spring容器，以及Spring应用中bean的生命周期。



## Spring整体架构

除了Spring的核心模块，Spring还提供了其他的工具组件，这些组件扩展了Spring的功能，例如webservice、REST、mobile和NOSQL，形成了丰富的开发生态。

### 1.3.1 Spring模块

Spring 4.0you 20个独立的模块，每个包含三个文件：二进制库、源文件和文档，完整的库列表如下图所示：



![](spring_jar.png)



按照功能划分，这些模块可以分成六组，如下图所示：

![](modules.png)

这些模块几乎可以满足所有企业级应用开发的需求，但是开发人员并不需要完全使用Spring的这些模块，可以自由选择符合项目需求的第三方模块——Spring为一些第三方模块提供了交互接口。

#### CORE SPRING CONTAINER

Spring框架的核心模块，其他所有模块都基于该模块构建。Spring容器负责管理Spring应用中bean的创建、配置和管理。在这模块中有Spring bean factory，该接口提供了最基本的依赖注入（DI）功能；基于bean factory，该模块提供了集中Spring应用上下文的实现，可以供开发人员选择。

除了bean factory和application context，该模块还支持其他企业级服务，例如email、JNDI access、EJB integration和scheduling。

#### SPRING's AOP MODULE

Spring框架通过AOP模块提供面向切面编程的能力。通过AOP模块，一些系统层面的需求（事务、安全）可以与它们真正要作用到的模块相互解耦合。

#### DATA ACCESS AND INTEGRATION

Spring的JDBC和*data-access object*模块将数据库操作的一些样板式代码封装起来，免去了开发人员的很多工作量。这个模块还对数据库层的异常进行了封装，并向上提供含义更丰富的异常信息。

Spring并未实现自己的ORM框架，但是它提供了跟其他几个ORM框架整合的能力，例如Hibernate、Mybatis、Java Persistence AP等等，而且这些ORM框架都支持使用Spring提供的事务管理模块。

#### WEB AND REMOTING

Spring提供了自己的 WEB开发框架——Spring MVC，除此之外，这个模块还提供远程调用支持：Remote Method Invocation(RMI)、Hessian、Burlap和JAX-WS。

#### INSTRUMENTATION

不常使用

#### TESTING

可以与常用的JUNIT、Mockito、Spock等测试框架整合使用。

### 1.3.2 Spring portfolio

如果只是学习Spring的核心模块，将会错过不少Spring社区提供的经典项目，下面介绍的这些项目使得Spring几乎可以覆盖整个Java开发（PS：带*的项目值得每位Spring用户仔细学习）。

#### SPRING WEB FLOW

基于Spring MVC框架拓展，利用该框架可以构建流式web应用。

#### SPRING WEB SERVICE

虽然核心的Spring 框架提供了将Spring Bean 以声明的方式发布为Web Service，但是这些服务基于一个具有争议性的架构（拙劣的契约置后模型）之上而构建的。这些服务的契约由Bean 的接口来决定。 Spring Web Service 提供了契约优先的Web Service模型，服务的实现都是为了满足服务的契约而编写的。

#### SPRING SECURITY（*）

安全对于许多应用都是一个非常关键的切面。利用Spring AOP，Spring Security为Spring 应用提供了声明式的安全机制。我们将在第9 章讲解如何为应用添加SpringSecurity。你可以在主页[http://static.springsource.org/spring-security/site](http://static.springsource.org/spring-security/site) 获得关于SpringSecurity 更多的信息。

#### SPRING INTEGRATION

许多企业级应用都需要与其他应用进行交互。Spring Integration 提供了几种通用的应用集成模式的Spring 声明式风格的实现。

我们不会在本书覆盖Spring Integration 内容，但是如果你想了解更多关于SpringIntegration 的信息， 我推荐Mark Fisher、Jonas Partner、Marius Bogoevici 和IweinFuld 编写的《Spring Integration in Action》；或者还可以访问Spring Integration 的主页[http://www.springsource.org/spring-integration](http://www.springsource.org/spring-integration)。

#### SPRING BATCH

当我们需要对数据进行大量操作时，没有任何技术可以比批处理更能胜任此场景的。如果需要开发一个批处理应用，你可以借助于Spring 强大的面向POJO 的编程模型来使用Spring Batch 来实现。

Spring Batch 超出了本书的范畴，但是你可以阅读Thierry Templier 和Arnaud Cogoluègnes编写的《Spring Batch in Action》，或者访问Spring Batch 的主页[http://static.springsource.org/spring-batch](http://static.springsource.org/spring-batch)。

#### SPRING DATA（*）

Spring Data用于简化数据库相关的开发工作。尽管多年以来关系型数据库都是企业级应用开发的主流，但是随着移动互联网的发展，对NoSQL这类菲关系型数据库的需求也越来越强。

无论你选择NoSQL还是关系型数据库，Spring Datat都能提供简洁的编程模型，例如非常方便的repository机制，可以为开发人员自动创建具体的SQL实现。

#### SPRING SOCIAL

社交网络是互联网冉冉升起的一颗新星，越来越多的应用正在融入社交网络网站，例如Facebook 或者Twitter。如果对此感兴趣，你可以了解下Spring Social，Spring 的一个社交网络扩展模块。

Spring Social 相对还比较新颖，我并没有计划将它放入本书，但是你可以访问[http://www.springsource.org/spring-social](http://www.springsource.org/spring-social) 了解Spring Social 更多的相关信息。

#### SPRING MOBILE

移动应用是另一个引人瞩目的软件开发领域。智能手机和平板设备已成为许多用户首选的客户端。Spring Mobile 是Spring 新的扩展模块用于支持移动Web 应用开发。
与Spring Mobile 相关的是Spring Android 项目。这个新项目旨在通过Spring 框架为开发基于Android 设备的本地应用提供某些简单的支持。最初，这个项目提供了Spring 的RestTemplate 版本（请查看第11 章了解RestTemplete）可以用于Android 应用。
再次声明，这两个项目已超出了本书的范围，但是如果你对这两个项目感兴趣，可以访问[http://www.springsource.org/spring-mobile](http://www.springsource.org/spring-mobile) 和[http://www.springsource.org/spring-android](http://www.springsource.org/spring-android) 了解更多相关的信息。

#### SPRING BOOT（*）

Spring Boot是Spring社区中发展速度最快的框架之一，它旨在简化Spring的使用，解决Spring开发时遇到的“配置地狱”问题。

Spring Boot通过大量使用自动配置技术，可以取消大量的XML配置文件，同时该框架提出了starter的概念，用于简化pom文件。可以参考我的一系列博文：[《Spring Boot Cookbook》阅读笔记](http://www.jianshu.com/p/5ac18abc91f0)





主要总结下Spring社区的趋势：

1. 注重注解，能用注解解决的尽量用注解，尽量少写XML配置文件；
2. Spring Boot已经是Spring社区中增长最迅速的框架，前三名是：Spring Framework，Spring Boot和Spring Security
3. 支持Java 8，通过Java8的lambda表达式，使得一些回调接口更易使用和阅读。