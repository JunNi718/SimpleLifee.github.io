---
title: Spring中jdbcTemplate的用法实例（一）
date: 2017-05-08 13:56:19
tags: Spring

---



<div align = "center">

JdbcTemplate详解

</div>

<!-- more -->

# 注入JdbcTemplate的三种方式

​      第一种方式： 在 Spring 的 IoC 容器中配置一个 JdbcTemplate 的 bean，将 DataSource 注入进来，然后再把JdbcTemplate 注入到自定义DAO 中。 

​      第二种方式：我们可以在自己定义的DAO 实现类中注入一个DataSource 引用来完 成JdbcTemplate 的实例化。也就是它是从外部“注入” DataSource 到DAO 中，然后 自己实例化JdbcTemplate，然后将DataSource 设置到JdbcTemplate 对象中。 

​     
​      第三种方式: Spring 提供了 org.springframework.jdbc.core.support.JdbcDaoSupport 类 ， 这 个 类 中 定 义 了 JdbcTemplate 属性，也定义了DataSource 属性，当设置DataSource 属性的时候，会创 建jdbcTemplate 的实例，所以我们自己编写的DAO 只需要继承JdbcDaoSupport 类， 然后注入DataSource 即可。**提倡采用第三种方法**。



第一种方法

```java
public class UserServiceImpl implements UserService {  
  
    private JdbcTemplate jdbcTemplate;  
      
    public JdbcTemplate getJdbcTemplate() {  
        return jdbcTemplate;  
    }  
  
    //注入方法1     
    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {  
        this.jdbcTemplate = jdbcTemplate;  
    }  
  
    //其它方法这里省略……  
}  
```

```xml
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">  
        <property name = "dataSource" ref="dataSource">  
</bean>  
<bean id="userService" class="com.nini.account.jdbcTemplate.UserServiceImpl">  
     <property name="jdbcTemplate" ref="jdbcTemplate"/>  
</bean>  
```

第二种方法

```java
public class UserServiceImpl implements UserService {  
  
        private JdbcTemplate jdbcTemplate;  
          
        //注入方法2  
        public void setDataSource(DataSource dataSource) {  
                   this.jdbcTemplate = new JdbcTemplate(dataSource);  
        }  
       
       //其它方法省略……  
}  
```

```xml
<bean id="userService" class="com.nini.account.jdbcTemplate.UserServiceImpl">  
       <property name="dataSource" ref="dataSource"/>  
</bean> 
```



第三种方法

继承JdbcDaoSupport，其内部有个JdbcTemplate ，需要注入DataSource 属性来实例化。

```java
 public class UserDaoImpl extends JdbcDaoSupport implements UserDao {  
  
    @Override  
    public void save(User user) {  
        String sql = null;  
        this.getJdbcTemplate().update(sql);  
    }  
        //其它方法省略……  
}  
```

```xml
<bean id="userDao" class="com.nini.account.jdbcTemplate.UserDaoImpl">  
           <property name="dataSource" ref="dataSource"/>  
</bean>  
```







# 常用方法

> jdbcTemplate 中的sql均是用“?”做占位符的

```java
public class User {  
    private int id;  
    private String username;  
    private String password;  
    private String sex;  
              
               //setter和getter方法省略……  
}  
```



> jdbcTemplate.update 适合于 insert 、update 和 delete操作；  

```java
	/**   
     * 第一个参数为执行sql   
     * 第二个参数为参数数据   
     */   
    public void save3(User user) {  
        Assert.isNull(user, "user is not null");  
        jdbcTemplate.update("insert into tb_test1(name,password) values(?,?)",   
                new Object[]{user.getUsername(),user.getPassword()});  
    }  
      
    /**   
     * 第一个参数为执行sql   
     * 第二个参数为参数数据   
     * 第三个参数为参数类型   
     */   
    @Override  
    public void save(User user) {  
        Assert.isNull(user, "user is not null");  
        jdbcTemplate.update(  
                "insert into tb_test1(name,password) values(?,?)",   
                new Object[]{user.getUsername(),user.getPassword()},   
                new int[]{java.sql.Types.VARCHAR,java.sql.Types.VARCHAR}  
                );  
    }  


	//避免sql注入  
    public void save2(final User user) {  
        Assert.isNull(user, "user is not null");  
          
        jdbcTemplate.update("insert into tb_test1(name,password) values(?,?)",   
                new PreparedStatementSetter(){  
              
                    @Override  
                    public void setValues(PreparedStatement ps) throws SQLException {  
                        ps.setString(1, user.getUsername());  
                        ps.setString(2, user.getPassword());  
                    }  
        });  
          
    }  

	//返回插入的主键  
    public List save5(final User user) {  
          
        KeyHolder keyHolder = new GeneratedKeyHolder();  
  
        jdbcTemplate.update(new PreparedStatementCreator() {  
                      
                                @Override  
                                public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {  
                                    PreparedStatement ps = connection.prepareStatement("insert into tb_test1(name,password) values(?,?)", new String[] {"id"});  
                                    ps.setString(1, user.getUsername());  
                                    ps.setString(2, user.getPassword());  
                                    return ps;  
                                }  
                            },  
                keyHolder);  
          
        return keyHolder.getKeyList();  
    } 

    @Override  
    public void delete(User user) {  
        Assert.isNull(user, "user is not null");  
        jdbcTemplate.update(  
                "delete from tb_test1 where id = ?",   
                new Object[]{user.getId()},   
                new int[]{java.sql.Types.INTEGER});  
    }  

    //最全的参数3个  
    public int queryForInt3(User user){  
        return jdbcTemplate.queryForInt("select count(0) from tb_test1 where username = ?" ,  
                new Object[]{user.getUsername()},  
                new int[]{java.sql.Types.VARCHAR});  
    }  

    public User queryForObject5(User user) {  
        return (User) jdbcTemplate.queryForObject(  
                "select * from tb_test1 where id = ?",   
                new Object[]{user.getId()},  
                new RowMapper(){  
  
                    @Override  
                    public Object mapRow(ResultSet rs,int rowNum)throws SQLException {  
                        User user  = new User();  
                        user.setId(rs.getInt("id"));  
                        user.setUsername(rs.getString("username"));  
                        user.setPassword(rs.getString("password"));  
                        return user;  
                    }  
              
        }); //class是结果数据的java类型  
    }  

    @SuppressWarnings("unchecked")  
    //最全的参数查询  
    public List<User> queryForList3(User user) {  
        return (List<User>) jdbcTemplate.queryForList("select * from tb_test1 where username = ?",  
                            new Object[]{user.getUsername()},  
                            new int[]{java.sql.Types.VARCHAR},  
                            User.class);  
    }  


    //批量操作    适合于增、删、改操作  
    public int[] batchUpdate(final List users) {  
          
        int[] updateCounts = jdbcTemplate.batchUpdate(  
                "update tb_test1 set username = ?, password = ? where id = ?",  
                new BatchPreparedStatementSetter() {  
                      
                        @Override  
                        public void setValues(PreparedStatement ps, int i) throws SQLException {  
                            ps.setString(1, ((User)users.get(i)).getUsername());  
                            ps.setString(2, ((User)users.get(i)).getPassword());  
                            ps.setLong(3, ((User)users.get(i)).getId());  
                        }  
                          
                        @Override  
                        public int getBatchSize() {  
                            return users.size();  
                        }  
                }   
        );  
          
        return updateCounts;  
    }  

	//调用存储过程  
    public void callProcedure(int id){  
        this.jdbcTemplate.update("call SUPPORT.REFRESH_USERS_SUMMARY(?)", new Object[]{Long.valueOf(id)});  
	}  
```

其中，batchUpdate适合于批量增、删、改操作；

​         update(…)：使用于增、删、改操作；

​         execute（）：执行一个独立的sql语句，包括ddl语句；

​         queryForInt ：查询出一个整数值





# HibernateTemplate

下面是 HibernateTemplate的常用方法。

delete(Object entity): 删除指定持久化实例。    

deleteAll(Collection entities): 删除集合内全部持久化类实例。  

find(String queryString): 根据 HQL 查询字符串来返回实例集合。 

findByNamedQuery(String queryName): 根据命名查询返回实例集合。    

get(Classentity Class,Serializable id): 根据主键加载特定持久化类的实例。    

save(Object entity): 保存新的实例。    

saveOrUpdate(Object entity): 根据实例状态，选择保存或者更新。    

update(Object entity): 更新实例的状态，要求entity 是持久状态。   

setMaxResults(intmax Results): 设置分页的大小。



hql语句

Select/update/delete…… from …… where …… group by …… having …… orderby …… asc/desc