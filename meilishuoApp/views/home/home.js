/**
 * Created by hxsd on 2016/9/29.
 */
angular.module("myapp")
    .controller("homeCtrl",function($scope,$http,$state,$ionicViewSwitcher,dataFactory){
        // 创建一些scope变量
        $scope.page = 0;    // 用来保存当前请求的页码
        $scope.total = 1;   // 用来保存总页数
        $scope.products = [];    // 保存所有加载的餐馆信息
        $scope.productRows = [];


        // 加载餐馆的方法：每当上拉刷新时，会调用一次这个方法加载新的一页数据
        $scope.getProducts = function () {
            $scope.page++;  // 页数++

            var url = "products.json";   // 请求的url
            $http.get(url)
                .success(function (products) {
                    angular.forEach(products, function (product) {
                        $scope.products.push(product);
                    });

                    var productCols = [];
                    angular.forEach($scope.products,function (product,index) {
                        if (index%2==0) {
                            productCols.push(product);
                        }else{
                            productCols.push(product);
                            var tempProductCols = productCols.concat();
                            $scope.productRows.push(tempProductCols);
                            productCols.length = 0;
                        }
                    });

                    // 更新总页面数，基于API发送的值
                    //$scope.total = response.totalPages; // 示例数据中为20页
                    $scope.total = 3;
                })
                .finally(function () {
                    // 广播事件，告诉无限滚动组件everything is done
                    $scope.$broadcast("scroll.infiniteScrollComplete");
                });
        };
        $scope.getProducts();  // 加载时，从API加载第一页餐馆数据

        // 查询出来要显示在view中的商品数据
        $scope.data = dataFactory.query();
        // 跳转
        $scope.toDetail = function(title){
            $state.go("tabs.details",{title:title});

            // 将go有动画效果
            $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
        };

        $scope.toSaleDataDetail = function(contentTitle){
            $state.go("tabs.saleDataDetails",{contentTitle:contentTitle});

            // 将go有动画效果
            $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
        };

        $scope.saleList = [];
        $scope.getSaleDatas = function () {
            var url = "saleGoods.json";   // 请求的url
            $http.get(url)
                .success(function (saleDatas) {
                    angular.forEach(saleDatas, function (saleData) {
                        $scope.saleList.push(saleData);
                    });
                });
        };
        $scope.getSaleDatas();

        $scope.getShowSaleProducts = function (saleData) {
            var goodsList = saleData.goodsList;
            var resultGoodsList = [];

            for(var i=0;i<3;i++){
                resultGoodsList.push(goodsList[i]);
            }
            return resultGoodsList;
        }
});