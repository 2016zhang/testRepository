/**
 * Created by Administrator on 2016/9/28.
 */
var myapp = angular.module("myapp",["ionic"]);
// 配置路由
myapp.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state("tour",{
        url:"/tour",
        templateUrl:"views/tour/tour.html"
    }).state("tabs", {
            url: "/tabs",
            abstract: true,
            templateUrl: "views/tabs/tabs.html"
        }).state("tabs.home", {
            url: "/home",
            views: {
                "home-tab": {
                    templateUrl: "views/home/home.html",
                    controller:"homeCtrl"
                }
            }
        }).state("tabs.details", {
            url: "/details?:title",
            views: {
                "home-tab": {
                    templateUrl: "views/details/details.html",
                    controller:"detailsCtrl"
                }
            }
        }).state("tabs.saleDataDetails", {
            url: "/saleDataDetails?:contentTitle",
            views: {
                "home-tab": {
                    templateUrl: "views/saleDataDetails/saleDataDetails.html",
                    controller:"saleDataDetailsCtrl"
                }
            }
        }).state("tabs.category", {
            url: "/category",
            views: {
                "category-tab": {
                    templateUrl: "views/category/category.html"
                }
            }
        }).state("tabs.cart", {
            url: "/cart",
            views: {
                "cart-tab": {
                    templateUrl: "views/cart/cart.html",
                    controller:"cartCtrl"
                }
            }
        }).state("tabs.me", {
            url: "/me",
            views: {
                "me-tab": {
                    templateUrl: "views/me/me.html"
                }
            }
    });
    // 默认路由
    $urlRouterProvider.otherwise("/tour");
});

// 使用工厂方法，创建的一个单例对象
// 这个单例对象会被缓存
myapp.factory("dataFactory", function ($http) {
    var data = {productList: []};   // 一定要保存到对象中，不要直接保存到一个数组变量中
    $http.get("products.json").success(function (_data, status, headers, config) {
        data.productList = _data;
    });
    return {
        query: function () {
            return data;   // 返回数据
        } // end query
    };
});

myapp.factory("saleDataFactory", function ($http) {
    var data = {saleList: []};   // 一定要保存到对象中，不要直接保存到一个数组变量中
    $http.get("saleGoods.json").success(function (_data, status, headers, config) {
        data.saleList = _data;
    });
    return {
        query: function () {
            return data;   // 返回数据
        } // end query
    };
});
