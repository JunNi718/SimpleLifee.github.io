---
title: 个人博客站点建设历程
date: 2017-05-01 18:51:25
---



这里是对我建立博客以来，所做的研究与尝试的总结。
为方便编辑和查看最新进展，更新以倒序方式呈现。



08-17 添加Google自定义搜索

---

- [为自己博客添加站内搜索](http://devlu.me/2016/01/23/Hexo%E5%8D%9A%E5%AE%A2%E4%BC%98%E5%8C%96%E9%85%8D%E7%BD%AE%E4%B9%8B-%E4%B8%BA%E8%87%AA%E5%B7%B1%E5%8D%9A%E5%AE%A2%E6%B7%BB%E5%8A%A0%E7%AB%99%E5%86%85%E6%90%9C%E7%B4%A2/)
- [Google 自定义搜索](https://cse.google.com/cse/all?hl=zh-CN)
- [授之以鱼，不如授之以渔](http://www.jianshu.com/p/12279cabca81)
- [LP's Blog](http://lupeng.me/)

### 08-16 添加目录

---
相关链接
- [为 Hexo 博客添加目录 by 况琪](http://kuangqi.me/tricks/enable-table-of-contents-on-hexo/)
- [实现文章目录](http://blog.csdn.net/u013082989/article/details/70212008)

### 08-15 添加 About 和 Resume 页



### 08-12 添加emoji表情

- [**hexo-tag-emojis**](https://github.com/sergiolepore/hexo-tag-emojis)
- [Emoji-Cheat-Sheet](https://github.com/WebpageFX/emoji-cheat-sheet.com)
- 安装server服务 `npm install hexo-server --save` 





### 07-15 添加新文章

- [【G】](https://github.com/SmartNJ/SimpleLifee.github.io/commit/344417d15d912ed365e2d4e6cc78281c6f90a8fd) 新增 [[2017-07-15-Mac下配置环境变量不生效问题]](http://nijun.me/2017/07/15/Mac%E4%B8%8B%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E4%B8%8D%E7%94%9F%E6%95%88%E9%97%AE%E9%A2%98/)

### 07-14 新增新文章

- 新增 [[从头开始之web框架基础](http://nijun.me/2017/07/14/%E4%BB%8E%E5%A4%B4%E5%BC%80%E5%A7%8B%E4%B9%8Bweb%E6%A1%86%E6%9E%B6%E5%9F%BA%E7%A1%80/)]
- 新增 [[1000行Mysql学习笔记](http://nijun.me/2017/07/13/1000%E8%A1%8CMysql%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/)]（转）
- 新增 [[20个数据库设计的最佳实践](http://nijun.me/2017/07/13/00001-Database-2017-07-13-20%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%BA%93%E8%AE%BE%E8%AE%A1%E7%9A%84%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5/)]（转）
- 新增 [[简单十步让你全面理解SQL](http://nijun.me/2017/07/13/00001-Database-2017-07-13-%E7%AE%80%E5%8D%95%E5%8D%81%E6%AD%A5%E8%AE%A9%E4%BD%A0%E5%85%A8%E9%9D%A2%E7%90%86%E8%A7%A3SQL/)]（转）

### 07-13 修复了索引页超链接的错误样式

- [【G】](https://github.com/SmartNJ/SimpleLifee.github.io/commit/283f89c6e3d019e4309369499a2b599fe598f485) 修复了之前超链接的 `css` 样式，没有排除索引页面的标题超链接的问题。
- 新增 [[Mysql数据类型](http://nijun.me/2017/07/13/00001-Database-2017-07-13-Mysql%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B/)]
- 新增 [[各大数据库对应的jar、驱动类名和URL格式](http://nijun.me/2017/07/13/00001-Database-2017-07-13-%E5%90%84%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AF%B9%E5%BA%94%E7%9A%84jar%E3%80%81%E9%A9%B1%E5%8A%A8%E7%B1%BB%E5%90%8D%E5%92%8CURL%E6%A0%BC%E5%BC%8F/)] （转）



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



