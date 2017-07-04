---
title: struts2配置文件
tags: struts2
---

# struts2配置文件的分类 

1. 内部配置文件:有struts2自动加载，对其自身进行配置（struts-default.xml,struts-plugin.xml 等）  
2. 开发人员使用的配置文件：有开发人员使用，用于对web应用进行配置。比如 web.xml，struts.xml struts.propeties. 



# 配置文件的作用详情 

| 配置文件               | 是否可选 | 位置（相对webapp）                        | 说明                                       |
| ------------------ | ---- | ----------------------------------- | ---------------------------------------- |
| web.xml            | 否    | /WEB-INF/                           | web部署的描述文件，包括所有必须的框架组件                   |
| struts.xml         | 是    | /WEB-INF/                           | Struts2框架的主要配置文件，包含action的映射，result映射和拦截器配置等 |
| struts.properties  | 是    | /WEB-INF/classes                    | Struts2框架的属性配置文件                         |
| struts-default.xml | 是    | /WEB-INF/lib/struts2-core-x.x.x.jar | Struts2框架提供的默认配置                         |
| struts-plugin.xml  | 是    | /WEB-INF/lib/struts-xxx-plugin.jar  | Struts2框架的插件的配置文件                        |





# struts.xml

1. 在Struts2框架中，struts.xml文件具有的重要作用，因为应用中的所有常量 action 拦截器 几乎都配置在这个文件中。  
2. struts.xml 文件通常放在web应用的WEB-INF/class目录中，在该目录下的struts.xml文件可以被Struts2框架自动加载  
3. Struts2框架提供了struts.xml文件的DTD（Document Type Definition 文档类型定义）在Struts2的核心struts-core.x.x.jar 包含了struts.-2.0.dtd 该文件就是struts.xml 文件和struts-default.xml的DTD  





struts：package* ，incliude* bean* constant* 

package：result-type? interceptors? default-interceptor-ref? default-aciton-ref? 
​        global-results? action* 

action* : param* result* interceptor-ref   exception-mapping* 





# strut-default.xml

1. struts-default.xml 文件是Struts2框架的基础配置文件，为框架体统默认的配置，例如在前面struts.xml文件有如下的代码  

   ```
   <package name="default" extends="struts-default">  
   ```

2. 在Struts2核心包sturts2-core.x.x.jar 可以找到struts-default.xml 文件 该文件定义在struts-default包，也就是我们平常写的struts.xml 自定义的包 extendx struts-default  





# struts.properties文件 

struts.properties文件是一个属性定义文件,在该文件中可以定义Struts2框架中大量的属性值和常量等，通过修改struts.properties文件中的内容，可以实现Struts2框架中的参数配置的修改。  

struts.properties 文件中的内容 严格遵循标准的键值对 Key-value 的形式 例如:  struts.custom.i18n.resources=globalMessage  



# struts.properties 文件中的键 

| struts.i18n.encoding         | 指定web应用的默认编码集。如果需要获取中文请求，可以将该值设置为GBK  GB2312 |
| ---------------------------- | ---------------------------------------- |
| struts.custom.i18n.resources | 指定struts2应用需要加载的国际化资源文件，多个资源文件中间用 英文逗号分开。 |
| struts.locale                | 指定web 应用的默认Locale                        |
| struts.configuration.files   | 指定struts2默认的加载配置文件。多个配置文件用英文逗号分开，其默认值是struts-default.xml struts-plugin.xml struts.xml |
| struts.ui.theme              | 指定视图标签的默认视图主题，其默认值为xhtml                 |
| struts.i18n.reload           | 设置是否每次HTTP请求到达时，系统都重新加载资源文件， 其默认值是 false。 |







# struts-plugin.xml 文件 主要用于集成其他技术 



1. struts-plugin.xml文件表示了Struts2框架中的插件配置文件，在该文件中定义了组件的包空间，拦截器，和其他配置常量等  
2. 在Struts2框架中的lib文件夹下，除了包含Struts2的核心包之外，还包含了多个插件，这些插件 文件都是jar的形式存在，文件名中包含有-plugin。  


![](struts.xml)





# 常量的配置



> 1.配置的位置 ：struts.xml  strust.properties 也可以在其他配置文件中。  

> 2.Strust2框架按照一下的顺序加载Strust2常量  
>
> struts-default.xml 存放在struts-core.x.x.jar中  
> struts-plugin.xml存放在struts-x.x.x.jar等struts插件jar文件中  
> strust-xml　web应用中Struts2默认的配置文件  
> struts.properties. struts2的属性配置文件  
> web.xml web应用的配置   
>
> 注意：如果后者 中定义了与前者相同的属性，那么后者中的值覆盖前面的值。 


## 常量的配置元素

## struts.xml中

> <constant> 元素配置属性常量时，需要指定一下两个必填属性：  
>    name: 指定常量的名称  
>    value：指定的常量的值  
> 例如：　在struts.xml中配置字符集编码为gb2312 代码如下  
> <constant name="struts.i18n.encoding" value="gb2312"/>  

## Struts.properties.xml中

> 如果在struts.properties中定义 代码如下  
>
>   struts.i18n.encoding=gb2312
>
> //struts.custom.i18n.resource=globalMessage  
> 



## web.xml中

```xml
<filter>  
    <filter-name>struts2</filter-name>  
    <filter-class>org.apache.struts2.dispatcher.FilterDispatcher</filter-class>  
     
    <!--配置上面拦截器的初始化参数 -->  
    <init-param>  
      <param-name>struts.i18n.encoding</param-name>  
       <param-value>gb2312</param-value>  
    </init-param>  
</filter>  
```





```xml
<constant name="struts.i18n.encoding" value="UTF-8" />   
指定Web应用的默认编码集，相当于调用HttpServletRequest的setCharacterEncoding方法   
<constant name="struts.action.extension" value="do" />   
该属性指定需要Struts 2处理的请求后缀，该属性的默认值是action，即所有匹配*.action的请求都由Struts 2处理。    如果用户需要指定多个请求后缀，则多个后缀之间以英文逗号（，）隔开。     
<constant name="struts.serve.static.browserCache " value="false" />   
设置浏览器是否缓存静态内容，默认值为true，开发阶段最好false   
<constant name="struts.configuration.xml.reload" value="true" />   
当struts的配置文件修改后，系统是否自动重新加载该文件，默认值为false，开发阶段最好true   
<constant name="struts.devMode" value="true" />   
开发模式下设为true，这样可以打印出更详细的错误信息   
<constant name="struts.enable.DynamicMethodInvocation" value="false" />   
动态方法调用,可以解决多个请求对应一个Servlet的问题,后面详细讲解,默认为true,关闭则设为false.   
下面是其他的一些常量，使用方法和上面相同。  

struts.serve.static.browserCache: 该属性设置浏览器是否缓存静态内容。当应用处于开发阶段时，我们希望每次请求都获得服务器的最新响应，则可设置该属性为false。   

struts.enable.DynamicMethodInvocation 该属性设置Struts 2是否支持动态方法调用，该属性的默认值是true。如果需要关闭动态方法调用，则可设置该属性为false。  

struts.enable.SlashesInActionNames 该属性设置Struts 2是否允许在Action名中使用斜线，该属性的默认值是false。如果开发者希望允许在Action名中使用斜线，则可设置该属性为true。  

struts.tag.altSyntax 该属性指定是否允许在Struts 2标签中使用表达式语法，因为通常都需要在标签中使用表达式语法，故此属性应该设置为true，该属性的默认值是true。   

struts.devMode该属性设置Struts 2应用是否使用开发模式。如果设置该属性为true，则可以在应用出错时显示更多、更友好的出错提示。该属性只接受true和flase两个值，该属性的默认值是false。通常，应用在开发阶段，将该属性设置为true，当进入产品发布阶段后，则该属性设置为false。  

struts.i18n.reload该属性设置是否每次HTTP请求到达时，系统都重新加载资源文件。该属性默认值是false。在开发阶段将该属性设置为true会更有利于开发，但在产品发布阶段应将该属性设置为false。  
提示 开发阶段将该属性设置了true，将可以在每次请求时都重新加载国际化资源文件，从而可以让开发者看到实时开发效果；产品发布阶段应该将该属性设置为false，是为了提供响应性能，每次请求都需要重新加载资源文件会大大降低应用的性能。   

struts.ui.theme该属性指定视图标签默认的视图主题，该属性的默认值是xhtml。   

struts.ui.templateDir该属性指定视图主题所需要模板文件的位置，该属性的默认值是template，即默认加载template路径下的模板文件。   

struts.ui.templateSuffix该属性指定模板文件的后缀，该属性的默认属性值是ftl。该属性还允许使用ftl、vm或jsp，分别对应FreeMarker、Velocity和JSP模板。  

struts.configuration.xml.reload该属性设置当struts.xml文件改变后，系统是否自动重新加载该文件。该属性的默认值是false。   

struts.velocity.configfile该属性指定Velocity框架所需的velocity.properties文件的位置。该属性的默认值为velocity.properties。   

struts.velocity.contexts该属性指定Velocity框架的Context位置，如果该框架有多个Context，则多个Context之间以英文逗号（,）隔开。   

struts.velocity.toolboxlocation该属性指定Velocity框架的toolbox的位置。   

struts.url.http.port该属性指定Web应用所在的监听端口。该属性通常没有太大的用户，只是当Struts 2需要生成URL时（例如Url标签），该属性才提供Web应用的默认端口。   

struts.url.https.port该属性类似于struts.url.http.port属性的作用，区别是该属性指定的是Web应用的加密服务端口。   

struts.url.includeParams该属性指定Struts 2生成URL时是否包含请求参数。该属性接受none、get和all三个属性值，分别对应于不包含、仅包含GET类型请求参数和包含全部请求参数。   

struts.custom.i18n.resources该属性指定Struts 2应用所需要的国际化资源文件，如果有多份国际化资源文件，则多个资源文件的文件名以英文逗号（,）隔开。   

struts.dispatcher.parametersWorkaround 对于某些Java EE服务器，不支持HttpServlet Request调用getParameterMap()方法，此时可以设置该属性值为true来解决该问题。该属性的默认值是false。对于WebLogic、Orion和OC4J服务器，通常应该设置该属性为true。   

struts.freemarker.manager.classname 该属性指定Struts 2使用的FreeMarker管理器。该属性的默认值是org.apache.struts2.views.freemarker.FreemarkerManager，这是Struts 2内建的FreeMarker管理器。  

struts.freemarker.wrapper.altMap该属性只支持true和false两个属性值，默认值是true。通常无需修改该属性值。   
struts.xslt.nocache 该属性指定XSLT Result是否使用样式表缓存。当应用处于开发阶段时，该属性通常被设置为true；当应用处于产品使用阶段时，该属性通常被设置为false。 

struts.configuration.files 该属性指定Struts 2框架默认加载的配置文件，如果需要指定默认加载多个配置文件，则多个配置文件的文件名之间以英文逗号（,）隔开。该属性的默认值为struts-default.xml,struts-plugin.xml,struts.xml，看到该属性值，读者应该明白为什么Struts 2框架默认加载struts.xml文件了。
```





# Struts2 包、命名空间、包含的配置

## 包配置

在Struts2框架中，其核心组件是Action和拦截器等，该框架使用包管理这些组件，在包可以配置多个action，多个拦截器，多个拦截器栈，返回类型。使用 <package> 元素配置包。可以指定4个属性



| 属性名       | 必选   | 说明                          |
| --------- | ---- | --------------------------- |
| name      | 是    | 指定包的名称，该名称是该包被其他包引用的key值    |
| extends   | 否    | 知道该包继承其他包                   |
| namespace | 否    | 指定哪个该包的命名空间                 |
| abstract  | 否    | 指定该包是否是一个抽象包。抽象包中不定义action。 |





## 命名空间配置 

在Struts2中命名空间用namespace的方式来管理Action  
因为在Action类中有多个业务处理方法，而客户端请求需要指向不同的方法，此时就需要用命名空间了。  
例如：

```xml
<package name="myPackage" extends="struts-default" namespace="/tmq">  
   <action name="login" class="my.test.Login.Action">  
      <result name="success">welcome.jsp</result>  
    </action>  
</package>  

```

上述的配置后，name为login的action就可以处理下面的URL请求了  
http://localhost:8080/struts2/tmq/login.action  
http://localhot:8080/struts2/login.action  



另一个例子

```xml
<struts>  
    <!--配置myPackage包，默认命名空间为空-->  
     <package name="myPackage" extends="struts-default">  
           <action name="login" class="my.test.LoginAction">  
                <result name="success">welcome.jsp</result>  
                <result name="Login">login.jsp</result>  
           </action>  
       </package>  
  
     <package name="myPackage2" extends="struts-default" namespace="/tmq">  
           <action name="login" class="my.test.LoginAction2">  
                <result name="success">welcome.jsp</result>  
                <result name="Login">login.jsp</result>  
           </action>  
       </package>  
       <!---http://localhost:8080/struts/login.action;会先查询非默认命名空间中的login Action如果没有找到 然后才到默认的命名空间-->  
</struts> 
```





> 命名空间注意：
>
> 1. 通过为包指定不同的命名空间，就可以在不同的包中配置name值相同的Action 而框架根据请求的ＵＲＬ，依然可以知道使用那个额Action来处理。如果为一个包指定了默认的命名空间，那么该包下的所有Action，都可以处理这个URL中对应的Action请求。  
> 2. 同一个命名空间中的不能包含同名的Action，不同的命名空间中，可以包含相同的Action。  





## 包含

```Xml
<!--_在一个Jsp文件中可以使用<jsp:include>指令，将其他文件包含到该文件中，同样的道理，在struts.xml文件中可以使用包含元素<include>包含其他配置文件-->  
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE struts PUBLIC "-//Apache Software Foundation//DTD Struts Configuration 2.0/EN" "http://struts.apache.org/dtds/struts-2.0.dtd">  
<struts>  
   <include file="struts-actionchaining.xml"/>  
   <include file="struts-fileupload.xml"/>  
   <include file="struts-jsf.xml"/>  
   <include file="struts-filedownload.xml"/>  
   <include file="struts-conversion.xml"/>  
   <include file="struts-freemarker.xml"/>  
   <includer file="struts-tiles.xml"/>  
</struts> 
```

