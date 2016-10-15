/**
 * Created by hxsd on 2016/9/29.
 */
angular.module("myapp")
    .controller("detailsCtrl", function ($scope, $stateParams, dataFactory,saleDataFactory,$state,$ionicViewSwitcher,myCart) {
        // 解析url中的参数(通过url传递的参数，解析出来都是字符串)
        var title = $stateParams.title;

        // 查询出来要显示在view中的商品数据
        var data = dataFactory.query();
        var isFound = false;
        angular.forEach(data.productList, function (item) {
            if (item.title == title) {
                isFound = true;
                $scope.product = item;
                //$scope.product.img = $scope.product.img.replace("50x50", "400x400");
                return false;   // 中断forEach循环 <=> break
            }
        });
        if(!isFound){
            var saleGoodsData = saleDataFactory.query().saleList;
            angular.forEach(saleGoodsData, function (saleData) {
                angular.forEach(saleData.goodsList, function (saleGoods) {
                    if (saleGoods.goods_title == title) {
                        var item = {};
                        item.img = saleGoods.show_pic;
                        item.title = saleGoods.goods_title;
                        item.price = saleGoods.goods_price;

                        $scope.product = item;
                        //$scope.product.img = $scope.product.img.replace("50x50", "400x400");
                        return false;   // 中断forEach循环 <=> break
                    }
                });
            });
        }

        $scope.goCart = function (product) {
            myCart.add(product);
            $state.go("tabs.cart");

            // 将go有动画效果
            $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
        }
    });