---
title: 个人博客站点建设历程
date: 2017-05-01 18:51:25
---



这里是对我建立博客以来，所做的研究与尝试的总结。
为方便编辑和查看最新进展，更新以倒序方式呈现。



### 07-12 修复了.gitignore 中的错误

- [【G】](https://github.com/SmartNJ/SimpleLifee.github.io/commit/1a3c1af3dcce543aa5781c33caa1dc5c06348bd9) 原本是为了将根目录中不需要上传到 github 上的文件夹过滤掉，`css/` 这样的写法会递归遍历所有名为 `css` 的文件夹，将其过滤。正确的写法应该是 `/css/`。
- [【G】](https://github.com/SmartNJ/SimpleLifee.github.io/commit/e55ec39cdbd2adb97fff3a5472c4ccdb03bea48e) 新增 `h1`、`h2`、`h3` 的标题样式。
- [【G】](https://github.com/SmartNJ/SimpleLifee.github.io/commit/9feb9ecddcba53b71042ad37add08788007dc014) 新增超链接悬停时的渐变效果



### 07-08 修改导航栏顺序和文字描述

- [【G】](https://github.com/SmartNJ/SimpleLifee.github.io/commit/b1e5bf26917fa295cd3059a3fca9722f046fabc8)  修改了导航栏中的文字描述和顺序。
- 修复了原来 404 页面点击回到主页不正确的问题。

### 07-07 Next主题没有添加到git的问题

- [【G】 ](https://github.com/SmartNJ/SimpleLifee.github.io/commit/b423e50868ab5dbdee9c8b94b2907d35ab7d1183)解决了NexT主题文件夹没有添加到git工作区的问题



### 07-06 炫酷背景、自定义swig文件

- [【G】 ]()自定义的 `swig` 文件创建在当前目录下新建 `xxx` 文件夹内新建 `xxx-custom.swig` ，然后只要在 `xxx.swig` 文件末尾添加（注意针对 `NexT`）：

  ```groovy
  {% include 'head/custom-head.swig' %}
  ```

- [【G】](https://github.com/SmartNJ/SimpleLifee.github.io/commit/c446fce62056207a8d24f2c23576dcd408cc0e7f) 添加仿知乎动态背景图片的样式。



### 07-05 高亮代码块

- 取消了 hexo 默认的代码高亮，使用 [highlightjs ](https://highlightjs.org/)，[参考](http://www.ieclipse.cn/2016/07/18/Web/Hexo-dev-highlight/)

### 07-04 fexo主题

- [【G】 ](https://github.com/SmartNJ/SimpleLifee.github.io/commit/044b788feb67b30170278375d1356de9e6c6d95d)主题从 [Next](http://theme-next.iissnan.com/) 换成 [fexo](https://github.com/forsigner/fexo) 。
- [【G】 ](https://github.com/SmartNJ/SimpleLifee.github.io/commit/f3bcddef8d6d09f320ed1f16712cd13499f2b4cf)解决无序列表不显示前面小黑圈的问题

### 07-03 七牛图床

- 注册使用[七牛](https://portal.qiniu.com)图床

- 使用 [markdown图片实用工具](https://github.com/tiann/markdown-img-upload)，其中需要使用到 [requests](http://www.python-requests.org/en/master/user/install/#install) 库

  ​

### 05-01 卸载

- 卸载 Hexo 

```shell
$ npm uninstall hexo hexo-cli hexo-server hexo-generator-index hexo-generator-archive hexo-generator-category hexo-generator-tag hexo-deployer-git hexo-generator-feed hexo-generator-sitemap hexo-renderer-marked hexo-renderer-stylus 
```



### 05-01 添加CNAME

- 在博客的根目录中添加 [CNAME](http://baike.baidu.com/item/CNAME%E8%AE%B0%E5%BD%95) 别名记录。
- 理解 [TLL](http://baike.baidu.com/item/TTL/130248) 值 ，[域名解析](http://baike.baidu.com/item/%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90)，[A记录](http://baike.baidu.com/item/A%E8%AE%B0%E5%BD%95)。



### 04-30 GitHub Pages 配置

花了一天的时间，开始搭建自己的博客。

完成了：

- 域名注册 [GoDaddy](https://sg.godaddy.com/)，域名服务商，支持支付宝结算。
- 域名解析 [DNSPod](https://www.dnspod.cn/)，是国内域名解析服务提供商，现被腾讯收购了，免费，拥戴代替GoDaddy的域名解析不稳定的问题。
- [Github Page](https://pages.github.com/) & [Hexo](https://hexo.io/zh-cn/index.html) 完成博客的初步搭建。



