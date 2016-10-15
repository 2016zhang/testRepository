/**
 * Created by hxsd on 2016/9/8.
 */
var $ ={
    ajax:function (method,url,success,error){
        // step 1: 创建核心对象
        var xhr = this.createRequest();
        // step 2：配置请求和响应参数
        xhr.open(method,url,true);
        // 每当xhr的readyState的值改变一次，下面这个函数就会被调用一次
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                // 状态码：200-OK 404-文件没找到
                if(xhr.status == 200){
                    if(success){
                        success(xhr.responseText);
                    }
                }else{
                    if(error){
                        error(xhr.status);
                    }
                }
            }
        };
        // step 3: 发送请求
        xhr.send(null);
    },

    ajax2:function (options){
        // step 1: 创建核心对象
        var xhr = this.createRequest();
        // step 2：配置请求和响应参数
        xhr.open(options.method,options.url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                // 状态码：200-OK 404-文件没找到
                if(xhr.status == 200){
                    if(options.success){
                        options.success(xhr.responseText);
                    }
                }else{
                    if(options.error){
                        options.error(xhr.status);
                    }
                }
            }
        };
        // step 3: 发送请求
        xhr.send(null);
    },

    getJson:function (url,success,error){
        // step 1: 创建核心对象
        var xhr = this.createRequest();
        // step 2：配置请求和响应参数
        xhr.open("GET",url,true);
        // 每当xhr的readyState的值改变一次，下面这个函数就会被调用一次
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                // 状态码：200-OK 404-文件没找到
                if(xhr.status == 200){
                    document.getElementById("loading").style.display="";
                    if(success){
                        success(JSON.parse(xhr.responseText));
                    }
                }else{
                    if(error){
                        error(xhr.status);
                    }
                }
            }
        };
        //配置apikey
        xhr.setRequestHeader("apikey","306bce37a358e444addc2fdf74f4f8f2");
        // step 3: 发送请求
        xhr.send(null);
    },

    createRequest:function (){
        var xhr;
        try{
            xhr=new XMLHttpRequest();
        }catch (e){
            try{
                xhr=new ActiveXObject("Msxm12.XMLHTTP");
            }catch (e){
                xhr=new ActiveXObject("Microsoft.XMLHTTP");
            }
        }

        return xhr;
    }
}