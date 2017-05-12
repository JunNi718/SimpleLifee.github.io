---
title: struts2零配置
tags: Struts2

---

## 生成规则

在此说明一下convention插件对Action的查找规则和URL的生成规则

Convention 插件默认扫描继承了action类的子类和文件名以Action结尾的文件

默认找的包是struts, struts2, action or action的包

如：

```Java
com.example.actions.MainAction

com.example.actions.products.Display (implements com.opensymphony.xwork2.Action)

com.example.struts.company.details.ShowCompanyDetailsAction

```



 

找到对应的类后，Convention 插件会根据包名生成namespaces地址

```Java
com.example.actions.MainAction -> /

com.example.actions.products.Display -> /products

com.example.struts.company.details.ShowCompanyDetailsAction -> /company/details

```

 

然后根据类名，去除Action后缀，然后取其余部分小写，若有大小写混合，以-进行连接生成最终访问地址

```Java

com.example.actions.MainAction -> /main

com.example.actions.products.Display -> /products/display

com.example.struts.company.details.ShowCompanyDetailsAction -> /company/details/show-company-details

```





## 配置

配置convention插件的主要方式，是在Struts.xml文件中添加相应的配置。说是零配置，实际上是一次配置便不再需要做其他的配置了。





```Xml
<!-- 不进行扫描的包，用，分割，被包含的包，将不会被扫描成为action -->
    <constant name="struts.convention.exclude.packages" value="com.sean.service" />
    <!-- 进行扫描的根包，该包会被扫描成action -->
    <constant name="struts.convention.action.packages" value="com.sean.action" />
    <!-- 返回页面地址 -->
    <constant name="struts.convention.result.path" value="/WEB-INF/content/" />
    <!-- 用于进行action查找的后缀 -->
    <constant name="struts.convention.action.suffix" value="Action" />
    <!--用于生成action名字时的分隔符，比如DemoCustAction会被映射成为demo_cust,同时用于形成返回文件，比如访问DemoAction，return的值为input，插件会去指定不睦下，查找demo_input.jsp文件 -->
    <constant name="struts.convention.action.name.separator" value="_" />
    <!-- 指定的包会被进行扫描 -->
    <constant name="struts.convention.package.locators" value="action,actions,struts,struts2" />
    <!-- 返回页面类型 -->
    <constant name="struts.convention.relative.result.types" value="dispatcher,velocity,freemarker" />
    <!-- 开启动态调用函数，这个方法在struts2里面不推荐，可是在这里却可以实现动态方法的调用，不用自写action了 -->
    <constant name="struts.enable.DynamicMethodInvocation" value="true" />
    <!-- 开发模式 -->
    <constant name="struts.devMode" value="true" />
```



## 实例

按照上述的配置配置，创建好项目后，我们进行创建两个Action进行测试，这两个Action除了继承了ActionSupport外，其他什么都不添加。

```Java
package com.sean.action;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;

import com.opensymphony.xwork2.ActionSupport;


public class DemoAction extends ActionSupport {

    public String execute(){
        System.out.println("nihao!!!");
        return "nijun";
    }
}

```

```java
package com.sean.action;

import com.opensymphony.xwork2.ActionSupport;

public class MyDemoAction extends ActionSupport{

    public String index(){
        return "index";
    }
}
```

同时创建对应的jsp文件：

在content目录下，对应的 result 页面可以是 `nijun.jsp` 、`demo_nijun.jsp` 或者 `demo.jsp`  





# 例子

```Xml
<?xml version="1.0" encoding="UTF-8" ?>  
<!DOCTYPE struts PUBLIC  
    "-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"  
    "http://struts.apache.org/dtds/struts-2.3.dtd">  
<struts>  
  
    <!-- 开发模式下的配置 -->  
    <!-- 开发模式 配置文件改了,不用重新启动-->  
    <!-- <constant name="struts.devMode" value="true" /> -->  
    <!-- 设置浏览器是否缓存静态内容，默认值为true（生产环境下使用），开发阶段最好 关闭 -->     
    <constant name="struts.serve.static.browserCache" value="false" />  
    <!-- 当 struts的配置文件修改后，系统是否自动重新加载该文件，默认值为false（生 产环境下使用），开发阶段最好打开 -->   
    <constant name="struts.configuration.xml.reload" value="true"/>  
          
    <!-- 请求参数的编码方式-->   
    <constant name="struts.i18n.encoding" value="UTF-8"/>   
    <!--  struts2拦截器默认拦截的后缀名     多个可以用逗号隔开  用于做网站伪静态化-->  
    <constant name="struts.action.extension" value="html"/>  
    <!-- 简单主题 -->  
    <constant name="struts.ui.theme" value="simple" />  
    <!-- 配置文件上传的总大小 -->  
    <constant name="struts.multipart.maxSize" value="2097152000"></constant>  
    <!-- 把struts的请求委托给spring管理, 作用:创建Action实例的过程由spring处理,其他的还是由struts2自己处理 -->  
    <constant name="struts.objectFactory" value="spring" />   
     <!-- 是否开启动态方法调用-->   
    <constant name="struts.enable.DynamicMethodInvocation" value="false"/>   
      
  
    <!-- Struts2约定限制结果页面必须放到/WEB-INF/content/目录中，可以通过下面常量来修改这个限制。-->  
    <constant name="struts.convention.result.path" value="/WEB-INF/jsp" />  
    <!-- 约定Action包位置：可以使用的Action的祖包，默认为没有， 设置为 cn.javass.ssh 就可以读取这个包及其子包的所有头上注册了【 @Action 】 的类。-->  
    <!-- <constant name="struts.convention.action.packages" value="cn.hl.s2sh.user.controller" /> -->  
    <!-- 默认配置包路径包含action,actions,struts,struts2的所有包都会被struts作为含有Action类的路径来搜索。通过设置struts.convention.package.locators属性来修改这个配置。 -->  
    <constant name="struts.convention.package.locators"  value="action,actions,struts,struts2,controller" />   
    <!-- 约定Action类名：要求Action的命名必须以Action为后缀，可以使用下面常量来修改后缀限制 -->  
    <constant name="struts.convention.action.suffix"  value="Action" />   
      
      
      
      
      
    <!-- 配置全局的包  继承自json-default，json-default继承自struts-default包 --->  
    <package name="mypackage" extends="json-default">  
        <!-- <interceptors>  
            注册自定义登录拦截器  
            <interceptor name="login" class="com.hl.zoneSystem_v01.struts.common.MyInterceptor" />  
            自定义拦截器栈  
            <interceptor-stack name="myInterceptor">  
                <interceptor-ref name="login" />  
                <interceptor-ref name="defaultStack">  
                    <param name="modelDriven.refreshModelBeforeResult">true</param>  
                </interceptor-ref>  
            </interceptor-stack>  
        </interceptors> -->  
        <!-- 定义默认栈 -->  
        <!-- <default-interceptor-ref name="myInterceptor" /> -->  
        <!-- 定义默认action -->  
        <!-- <default-action-ref name="notFound" /> -->  
          
        <!-- 全局结果集 -->  
        <global-results>  
            <!-- ajax请求的结果集  表单验证用,值为true/false-->  
            <result type="json" name="ajax">  
                <param name="root">message</param>  
            </result>  
            <!-- ajax请求的结果集  消息推送用,值为数字-->  
            <result type="json" name="ajax2">  
                <param name="root">message2</param>  
            </result>  
            <!-- ajax请求的结果集 页面数据传送 返回map-->  
            <result type="json" name="jsonResult">  
                <param name="root">jsonMap</param>  
            </result>  
            <!-- 下载 -->  
            <result name="downloadFiles" type="stream">  
                <!-- 对应web中下载配置：下载类型无限制  文件编码UTF-8-->  
                <param name="contentType">application/octet-stream;charset=UTF-8</param>  
                <param name="inputName">inputStreamFile</param>  
                <!-- 对应web中下载配置：response.setHeader("Content-Disposition", "attachment;filename="+newUser.getFilename()); -->  
                <param name="contentDisposition">attachment;filename=${fileName}</param>  
                <!-- 对应web中下载配置：byte[] b = new byte[1024]; -->  
                <param name="bufferSize">1024</param>  
            </result>  
            <!-- 项目根页面 -->  
            <result name="index" type="redirect">/index.jsp</result>  
            <!-- login 登录 -->  
            <result name="loginUI">/login.jsp</result>  
            <!-- 前台全局消息显示页面 -->  
            <result name="clientMessage">/message.jsp</result>  
            <!-- action错误，处理结果页面   -->  
            <result name="error">/error.jsp</result>  
        </global-results>  
        <!-- 全局异常 -->  
        <!-- <global-exception-mappings>  
            <exception-mapping result="error" exception="java.lang.Exception"></exception-mapping>  
        </global-exception-mappings> -->  
          
    </package>     
</struts>  
```



1，Action annotation。 
最简单的例子 


```Java

package com.example.actions;  
  
import com.opensymphony.xwork2.ActionSupport;   
import org.apache.struts2.convention.annotation.Action;  
  
public class HelloWorld extends ActionSupport {  
  @Action("/different/url")  
  public String execute() {  
    return SUCCESS;  
  }  
}  
```
那么这个HelloWorld的访问url就变为了/different/url。 

一个方法可以被映射到多个url上面，如下所示，方位注解中的两个url都可以访问这个方法 
```java
 
package com.example.actions;  
  
import com.opensymphony.xwork2.ActionSupport;   
import org.apache.struts2.convention.annotation.Action;  
import org.apache.struts2.convention.annotation.Actions;  
  
public class HelloWorld extends ActionSupport {  
  @Actions({  
    @Action("/different/url"),  
    @Action("/another/url")  
  })  
  public String execute() {  
    return SUCCESS;  
  }  
}  
```

如果一个action中有多个方法，那么可以分别为各个方法指定访问url

```java
package com.example.actions;  
  
import com.opensymphony.xwork2.ActionSupport;   
import org.apache.struts2.convention.annotation.Action;  
import org.apache.struts2.convention.annotation.Actions;  
  
public class HelloWorld extends ActionSupport {  
  @Action("/different/url")  
  public String execute() {  
    return SUCCESS;  
  
  }  
  
  @Action("url")  
  public String doSomething() {  
    return SUCCESS;  
  }  
}  
```
请注意上面这个类的第二个方法doSomething()，它的url是“url”，这是个相对路径是，也就是说访问这个方法时的正确路径是namespace+url。而execute()通过访问/different/url就可以访问。 







# 拦截器


使用@Action的interceptorRefs 属性可以指定action或者方法的interceptor，如下面的例子
 ```Java
package com.example.actions;  
  
import com.opensymphony.xwork2.ActionSupport;   
import org.apache.struts2.convention.annotation.Action;  
import org.apache.struts2.convention.annotation.Actions;  
  
public class HelloWorld extends ActionSupport {  
  @Action(interceptorRefs={@InterceptorRef("validation"), @InterceptorRef("defaultStack")})  
  public String execute() {  
    return SUCCESS;  
  }  
  
  @Action("url")  
  public String doSomething() {  
    return SUCCESS;  
  }  
}  
 ```
上面的action中execute()方法应用了 `validation `拦截器和 `defaultStack` 拦截器栈。 

还可以使用params属性指定要传给拦截器的参数。形式为{键，值，键，值…………}，键值总是会成对出现，如下面的例子
```Java
package com.example.actions;  
  
import com.opensymphony.xwork2.ActionSupport;   
import org.apache.struts2.convention.annotation.Action;  
import org.apache.struts2.convention.annotation.Actions;  
  
public class HelloWorld extends ActionSupport {  
  @Action(interceptorRefs=@InterceptorRef(value="validation",params={"programmatic", "false", "declarative", "true}))  
  public String execute() {  
    return SUCCESS;  
  }  
  
  @Action("url")  
  public String doSomething() {  
    return SUCCESS;  
  }  
}  
```
如果Action没有显式的指定拦截器的话，默认的拦截器会应用在这个Action上。 

 



拦截器可以在类和方法的层面上应用。在方法层面指定拦截器使用@Action注解，在类层面指定拦截器使用@InterceptorRefs注解。类层面引用的拦截器会应用在所有的方法上，如下面的例子

```java
package com.example.actions;  

import com.opensymphony.xwork2.ActionSupport;   
import org.apache.struts2.convention.annotation.Action;  
import org.apache.struts2.convention.annotation.Actions;  

@InterceptorRefs({  
    @InterceptorRef("interceptor-1"),  
    @InterceptorRef("defaultStack")  
})  
public class HelloWorld extends ActionSupport {  
  @Action(value="action1", interceptorRefs=@InterceptorRef("validation"))  
  public String execute() {  
    return SUCCESS;  
  }  

  @Action(value="action2")  
  public String doSomething() {  
    return SUCCESS;  
  }  
}  
```
如上代码所示，execute()方法应用了interceptor-1,validation和defaultStack中的所有拦截器；而doSomething()方法则没有validation拦截器。 



