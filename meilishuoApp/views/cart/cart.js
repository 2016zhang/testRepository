/**
 * Created by hxsd on 2016-09-23 0023.
 *
 * 创建一个新的模块，负责管理和维护单例的购物车对象，
 * 以及购物车相关的控制器、数据和视图(MVC)
 *
 * 在angularJS中，创建单例的service对象，有多种方式。
 * 最常用的是工厂方法factory。
 */
angular.module("myapp")
    .factory("myCart",function(){
        // 声明一个数组，保存购买的商品项-充当购物车的购物筐
        var cart = [];

        return{
            // 添加商品到购物车的方法
            add:function(product){
                for(var i=0;i<cart.length;i++){
                    var item = cart[i];
                    // 判断购物车中是否已经有了该商品
                    if(item.product.title == product.title){
                        // 说明购物车中已经有了该商品，将该商品的购买数量+1
                        item.number++;
                        return; // 添加商品过程结束
                    }
                }

                // 如果代码执行到这里，说明购物车中没有要添加的商品
                // 构造一个购买项item，加入到购物筐中
                cart.push({product:product,number:1});
            },
            // 从购物车中删除某种商品的方法
            remove:function(title){
                // 遍历购物筐，找到要删除的商品
                for(var i=0;i<cart.length;i++){
                    var item = cart[i];
                    // 判断购物车中是否已经有了该商品
                    if(item.product.title == title){
                        // 说明找到了要删除的商品，将该商品的从数组中删除
                        cart.splice(i,1);
                        return; // 结束
                    }
                }
            },
            // 获得购物车中所有商品的方法
            findAll:function(){
                return cart;
            },
            // 清空购物车
            clear:function(){
                cart.length = 0;
            }
        };
    })
    // 依赖注入购物车
    .controller("cartCtrl",function($scope,myCart){
        $scope.data = {
            showDelete:false,
            showReorder:false
        };
        $scope.ding = function(item){
            //先删除索引为fromIndex的删除
            var index = $scope.cart.indexOf(item);
            $scope.cart.splice(index,1);
            //再将product插入到1处
            $scope.cart.splice(0,0,item);
        };
        // 删除商品的事件函数
        $scope.itemRemove = function(item){
            myCart.remove(item.product.title);
        };



        $scope.cart = myCart.findAll();    // 获得购物车中所有购买的商品
        // 计算购物车中商品的总数量
        $scope.count = function(){
            var total = 0;
            angular.forEach(cart,function(item){
                total += item.number;   // 累加每种商品的购买数量
            });
            return total;
        };
        // 计算购物车中商品的总金额
        $scope.money = function(){
            var total = 0;
            angular.forEach(cart,function(item){
                total += item.number * item.product.price;   // 累加每种商品的购买金额
            });
            return total;
        };

        // 计算购买商品的总金额
        $scope.totalMoney = function(){
            var total = 0;
            angular.forEach($scope.cart,function(item){
                total += item.number * item.product.price;
            });
            return total;
        };
    });