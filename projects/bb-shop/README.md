# bb-shop

The shop project of my test

### json文件描述

下面均为json文件描述

1、default.json   获取默认数据

2、goodsList   获取商品列表
```
@param  shopId 商铺id
@return  list  商品列表
```
3、shopRanking     获取排行前十的店铺
```
@param
@return  list 商铺列表
```
4、goodsRanking   获取该店铺中排行前三的商品
```
@param shopId
@return list
```
5、user  获取当前用户
```
@param
@return object
```
6、login 登录
```
@param username  password
@return object
```
7、buyGoods  购买商品
```
@param list  商品列表，因为可能不是购买一个
@return object
```
8、setUser 设置当前用户
```
@param object
@return object
```


后续功能继续跟进