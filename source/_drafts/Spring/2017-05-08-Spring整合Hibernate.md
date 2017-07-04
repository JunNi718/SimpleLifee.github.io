---
title: Spring整合Hibernate
date: 2017-05-08 07:55:47
tags: Spring
---



<div align="center">

Spring整合Hibernate

</div>

<!-- more-->



hibernate.cfg.xml   Hibernate配置文件

```xml
<hibernate-configuration>
	<session-factory>
		<!-- 第一部分： 配置数据库信息 必须的 -->
	 	<property name="hibernate.connection.driver_class">com.mysql.jdbc.Driver</property>
		<property name="hibernate.connection.url">jdbc:mysql:///spring_day04</property>
		<property name="hibernate.connection.username">root</property>
		<property name="hibernate.connection.password">root</property>   
		
		<!-- 第二部分： 配置hibernate信息  可选的-->
		<!-- 输出底层sql语句 -->
		<property name="hibernate.show_sql">true</property>
		<!-- 输出底层sql语句格式 -->
		<property name="hibernate.format_sql">true</property>
		<!-- hibernate帮创建表，需要配置之后 
			update: 如果已经有表，更新，如果没有，创建
		-->
		<property name="hibernate.hbm2ddl.auto">update</property>
		<!-- 配置数据库方言
			在mysql里面实现分页 关键字 limit，只能使用mysql里面
			在oracle数据库，实现分页rownum
			让hibernate框架识别不同数据库的自己特有的语句
		 -->
		<property name="hibernate.dialect">org.hibernate.dialect.MySQLDialect</property>
		
		<!-- 第三部分： 把映射文件放到核心配置文件中 必须的-->
		<mapping resource="cn/nini/entity/User.hbm.xml"/>
	</session-factory>
```



ApplicationContext.xml

```Xml
	<bean id="sessionFactory" class="org.springframework.orm.hibernate4.LocalSessionFactoryBean">
        <!--把数据源 bean 注入到sessionFactory的dataSource属性-->
		<property name="dataSource" ref="dataSource"></property>
		<!-- 引入hibernate配置文件 -->
		<property name="configLocation" value="classpath:/hibernate.cfg.xml"></property><!-- 1 -->
        <!-- 引入映射文件，如果有多个可以继续添加 -->
        <property name="mappingResources">     <!-- 2 -->
            <list>
                <value>cn/nini/entity/User.hbm.xml</value>
            </list>
        </property>
		</property>
		<!-- 映射文件 -->
		 <property name="mappingLocations" value="classpath:org/hhx/ssh/entities/*.hbm.xml"></property> 
		<!-- 使用注解 -->
		<property name="packagesToScan" value="org.nan.entities"></property>
	</bean>
```



优化：

可以去掉这句<!-- 1 -->

```Xml
<property name="configLocation" value="classpath:/hibernate.cfg.xml"></property>
```

在spring的配置文件中直接添加以下配置语句

```Xml
        <property name="hibernateProperties">
            <props>
                <prop key="hibernate.show_sql">true</prop>
                <prop key="hibernate.format_sql">true</prop>
                <prop key="hibernate.hbm2ddl.auto">update</prop>
                <prop key="hibernate.dialect">org.hibernate.dialect.MySQLDialect</prop>
            </props>
        </property>
```





如果用到映射文件

可以这样写

```xml
        <property name="mappingResources">     <!-- 2 -->
            <list>
                <value>cn/nini/entity/User.hbm.xml</value>
            </list>
        </property>
		</property>
```

也可以这样写

```xml
		<!-- 映射文件 -->
		 <property name="mappingLocations" value="classpath:org/hhx/ssh/entities/*.hbm.xml">			</property> 
```





如果是用注解

只要在sessionFactory中添加如下代码

```xml
<property name="packagesToScan" value="org.nan.entities"></property>
```

