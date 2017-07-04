



# 投影查询

是什么？

> 查询一个或多个属性，但不全部查询。

有三种方式：

1. 直接查

   ​

```java
Query query = getSession().createQuery("select username,password from User");
List<Object[]> list = query.list();
for(Object[] o :list){
  System.out.println("用户名：" + o[0] );
}
```



2. 查询返回对象



```java
Query query = getSession().createQuery("select new User(username,password) from User");
List<User> list = query.list();
for(User user :list){
  System.out.println("用户名：" + user.getUsername() );
}
```



3. 查询返回Map键值对



```java
//在遍历Map时可以根据编号获取属性值
//Query query = getSession().createQuery("select new Map(username,password) from User");
//使用属性的别名，在遍历的时候可以根据名称获取属性值
Query query = getSession().createQuery("select new Map(u.username as username,u.password as password) from User as u");

List<User> list = query.list();
for(Map m :list){
  System.out.println("用户名：" + m.get("username") + "密码" + m.get("password") );
}
```

