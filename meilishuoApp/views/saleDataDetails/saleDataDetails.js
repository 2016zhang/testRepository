/**
 * Created by zhanghong on 16-10-5.
 */
angular.module("myapp")
    .controller("saleDataDetailsCtrl",function($scope,$state,saleDataFactory,$stateParams,$ionicViewSwitcher){
        // 创建一些scope变量
        $scope.productRows = [];
        $scope.saleProducts = [];
        $scope.contentData = {};
        var contentTitle = $stateParams.contentTitle;

        var saleGoodsData = saleDataFactory.query().saleList;
        // 加载餐馆的方法：每当上拉刷新时，会调用一次这个方法加载新的一页数据
        $scope.getSaleProducts = function () {
            angular.forEach(saleGoodsData, function (saleData) {
                if(saleData.content.title ==  contentTitle){
                    $scope.contentData = saleData.content;
                    angular.forEach(saleData.goodsList, function (saleProduct) {
                        $scope.saleProducts.push(saleProduct);
                    });

                    var productCols = [];
                    angular.forEach($scope.saleProducts,function (saleProduct,index) {
                        if (index%2==0) {
                            productCols.push(saleProduct);
                        }else{
                            productCols.push(saleProduct);
                            var tempProductCols = productCols.concat();
                            $scope.productRows.push(tempProductCols);
                            productCols.length = 0;
                        }
                    })
                }
            });
        };
        $scope.getSaleProducts();  // 加载时，从API加载第一页餐馆数据

        // 跳转
        $scope.toDetail = function(title){
            $state.go("tabs.details",{title:title});

            // 将go有动画效果
            $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
        };
    });