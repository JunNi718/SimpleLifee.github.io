最近做项目碰到 Android Studio 提示 Android Gradle Plugin Version 版本太低的问题。之前对 Plugin Version 和 Gradle Version 一直没有明确的认识，认为它俩是一个概念。索性刨根问底去 Google 一下。

Android Studio 报错如下：
<img src="http://osoa5juml.bkt.clouddn.com//image/site/1500459320686.png" width="1177"/>

其实，Android 中的 Plugin Version和Gradle Version 是两个不同的概念，**`Plugin Version` 指的是 Android 中的 Gradle Plugin 插件的版本，后者是本地使用的 Gradle 版本**。区分了这两个概念，后面说的就容易理解了。


在项目中，Gradle插件的版本一般在 项目的 **`build.gradle`** 中

```groovy
    dependencies {
         classpath 'com.android.tools.build:gradle:3.0.0-alpha1'
         ...
    }
```

本地的 Gradle 版本在 **`gradle-wrapper.properties`** 中
``` 
distributionUrl=https\://services.gradle.org/distributions/gradle-4.0-milestone-1-all.zip
```

然后根据官方提供的这张对照表

<img src="http://osoa5juml.bkt.clouddn.com//image/site/1500460060716.png" width="834"/>

可以看出，只要 Plugin Version 在 `2.3.0` 以以上，本地的 Gradle 版本就必须在 `3.3+` 以上。至此我是符合规定的。那为什么会报错呢？

原因是 `alpha/beta` 版本有40天的使用时间限制，到时间 AndroidStudio 就会强制提示你要求更新版本，如果根据上面那张表换成2.3.1这个稳定版就没有问题了。

这是 Stack Overflow 中找到的答案：

<img src="http://osoa5juml.bkt.clouddn.com//image/site/1500460312617.png" width="746"/>