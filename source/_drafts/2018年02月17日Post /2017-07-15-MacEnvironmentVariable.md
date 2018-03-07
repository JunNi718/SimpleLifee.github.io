---
title: Mac 下配置环境变量不生效问题
date: 2017-07-15 23:00:46
tags: Mac
thumbnail: http://osoa5juml.bkt.clouddn.com/image/site/1503124470755.png
---

宁鸣而死，不默而生。  ——范仲淹



<!-- more -->

注意：Mac 下一般使用 bash 作为默认的 shell。

---

## 问题描述

今天在捣鼓 MySQL 的时候，安装删除了好几个循环之后，发现打开 iTerm 之后输入 `mysql` 不起作用了，刚开始还以为是 MySQL 安装失败了，但是再一次安装成功后还是提示 `command not found: mysql` 。看到这句话第一时间我就想到了是不是环境变量没有配呢？但是一想不对啊，我之前也是用的好好的也没出现过这个问题啊。<!-- more -->

思路：我们知道 **`.bash_profile`** 中是可以设置环境变量的，所以就先从它入手，于是我就往其中添加了下面这句：
```
export PATH=$PATH:/usr/local/mysql/bin
```

然后保存，输入命令 **`source ~/.bash_profile`** ，确实有效！

但是呢，别高兴的太早，作用是有的，但是仅限于当前这个会话。一旦重新开启新的会话，又被打回老样子。

于是我就想，既然 **`source ~/.bash_profile`** 这句话能起作用，就不是 **`.bash_profile`** 的问题了，那么问题到底出在哪了呢？会不会是系统压根没执行 **`.bash_profile`** ？所以我根据系统环境变量的加载顺序，去寻找 **`/etc`** 下的两个文件。

**profile**
```
if [ -x /usr/libexec/path_helper ]; then
	eval `/usr/libexec/path_helper -s`
fi

if [ "${BASH-no}" != "no" ]; then
	[ -r /etc/bashrc ] && . /etc/bashrc
fi
```
这个文件好像看不出有什么问题。

**paths**
```
/usr/local/bin
/usr/bin
/bin
/usr/sbin
/sbin
```
这些是系统默认的环境变量，也找不到什么原因。

然后我新开了一个 Terminal 会话，执行下面查看当前系统环境变量的命令
```
$ echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/aria2/bin
```
很奇怪，除了系统默认环境变量之外，还多了 `/usr/local/aria2/bin` 这个，要知道在我的 '.bash_profile' 中并没有声明这个环境变量。


以上我碰到的问题描述，这个问题花了我一个下午的时间，还好最终是解决了，花了一个晚上写了以下这个总结。

---


## 一、Mac 系统的环境变量，加载顺序为：
1. /etc/profile
2. /etc/paths
3. ~/.bash_profile
4. ~/.bash_login
5. ~/.profile
6. ~/.bashrc


前两个是系统级别的，系统启动就会加载。后面 **3** 个是当前用户级别的环境变量。后面几个按照从前往后的顺序读取，如果 **`~/.bash_profile`** 存在，则后面的几个文件就会被忽略不读了，如果 **`.bash_profile`** 不存在，才会依次读取垢面的文件。~/.bashrc没有上述规则，它是bash shell打开的时候载入的。

也就是说在当前用户的目录下，如果又了.bash_profile文件就不会去加载.bashrc文件。

所以如果要能正常加载.bashrc文件，需要在.bash_profile文件的最末尾上加入如下语句：
``` shell
if [ -f ~/.bashrc ]; then
   source ~/.bashrc
fi
```

### 然而

如果你没有修改过，上面的方法默认重启后就能生效。

但是，现在的 mac 上有些使用 zsh 这个作为默认的 shell（比如我！！！），所以，在启动 shell 时，默认不会按上面的套路去加载。

如果想要正常加载 `.bashrc` 文件时，就要找到用户目录下的 `.zshrc` 文件加入如下代码：

```
if [ -f ~/.bashrc ]; then
   source ~/.bashrc
fi
```
参考：[.bash_profile vs .bashrc](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html)，建议读一下。

According to the bash man page, .bash_profile is executed for **login** shells, while .bashrc is executed for **interactive non-login** shells.





---

## 二、设置 PATH 的语法

```
//中间用冒号隔开
export PATH=$PATH:<PATH 1>:<PATH 2>:<PATH 3>:......:<PATH N>
```
### 全局设置

下面的几个文件设置是全局的，修改时需要 root 权限。

1. `/etc/paths` （全局建议修改这个文件）
   编辑时一行一个路径。
   注意：输入环境变量时，不用一个一个输入，只要拖拽文件夹到 Terminal 里就可以了。
2. `/etc/profile` （建议不修改这个文件）
   全局（公有）配置，不管是哪个用户，登录时都会读取该文件。
3. `/etc/bashrc` （一般在这个文件中添加系统级环境变量）
   全局（公有）配置，`bash shell` 执行时，不管是何种方式，都会读取此文件。
4. 分模块创建环境变量
  - 1) 创建一个文件：
```shell
$ sudo touch /etc/paths.d/mysql
```
- 2) 用 vim 打开这个文件（如果是以 open -t 的方式打开，则不允许编辑）：
``` shell
$ sudo vim /etc/paths.d/mysql
```
- 3) 编辑该文件，键入路径并保存（关闭该 Terminal 窗口并重新打开一个，就能使用 mysql 命令了）
```
/usr/local/mysql/bin
```
在我的 '/etc/paths.d' 目录下已经存在了一个文件 `aria2c` ，这也说了为什么一开始打印系统环境变量时，在最后多出了一个 `/usr/local/aria2/bin` 目录，因为在我的 `.bash_profile` 中并没有设置这个路径。顿时豁然开朗，哈哈。

还有就是，这样就不用把变量全放在 `paths` 文件里，方便管理。

### 单用户设置

1. **`~/.bash_profile`** （任意一个文件中添加用户级环境变量）（注：`Linux` 里面是 **`.bashrc`** 而 `Mac` 是 `.bash_profile`）
   若 bash shell 是以 login 方式执行时，才会读取此文件。该文件仅仅执行一次 **1** 默认情况下,它用来设置一些环境变量
   设置命令别名:
```
alias ll=’ls -la’
```
设置环境变量:
```
export PATH=/opt/local/bin:/opt/local/sbin:$PATH
```

### 生效

如果想要立刻生效，则可以执行下面的语句：
``` shell
source ~/.bash_profile
```
一般环境变量更改后，重启后生效。