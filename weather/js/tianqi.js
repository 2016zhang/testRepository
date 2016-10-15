/**
 * Created by Administrator on 2016/9/10.
 */
function loadCity(){
    var province = document.getElementById("province");
    var shi = document.getElementById("shi");
    var city = document.getElementById("city");
    $.getJson("data/city.json",function(data) {
            var provinces=data.zone;
            selectSetDatas(province,provinces,true);

            province.value = province.value == ""? provinces[0].id : province.value;
            for(var j=0;j<provinces.length;j++){
                if(province.value == provinces[j].id){
                    var shies = provinces[j].zone;
                    selectSetDatas(shi,shies,true);

                    shi.value = shi.value == ""? shies[0].id : shi.value;
                    for(var k=0;k<shies.length;k++){
                        if(shi.value == shies[k].id){
                            var cities = shies[k].zone;
                            selectSetDatas(city,cities,false);

                            city.value = city.value == ""? cities[0].code : city.value;
                            //alert(city.value);
                        }
                    }
                }
            }
        },
        function(status){
            alert("错误代码：" + status);
        }
    );

    function selectSetDatas(select,optionData,isIdAsValue){
        //alert(optionData.length);
        var selected = select.value;
        var options = select.getElementsByTagName("option");
        var optionLength = options.length;
        for(var j=0;j<optionLength;j++){
            select.removeChild(options[0]);
        }
        for(var i=0;i<optionData.length;i++){
            var option=document.createElement("option");

            option.value=isIdAsValue?optionData[i].id : optionData[i].code;
            option.innerHTML=optionData[i].name;
            // alert("shi:"+optionData[i].name);
            select.appendChild(option);
        }
        select.value = selected;
    };
}
window.onload=function(){
    loadCity();
    var selects = document.getElementsByTagName("select");
    for(var i=0;i<selects.length;i++){
        selects[i].index = i;
        selects[i].onchange = function(){
            loadCity();
        }
    }
    document.getElementById("btn").onclick = function(){
        document.getElementById("loading").style.display="block";
        $.getJson("http://apis.baidu.com/heweather/weather/free?cityid=CN"+selects[2].value,function(data){
                var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
                var date = new Date();
                var d = date.getDay();
                var content = "";
                var data = data["HeWeather data service 3.0"][0];
                var basic = data.basic;
                content += "<h4>"+date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日,'+week[d] +" [实时预测]</h4>";
                content += "<h2>"+basic.city +"</h2>";
                var now = data.now;
                content += "<div class='w'><p class='temp'>"+now.tmp+"℃</p>";
                content += "<div class='pic'><img src='images/"+pic[now.cond.txt]+"'>";
                content += "<h2>"+now.cond.txt+"</h2></div></div>";

                content += "<p>风速"+now.wind.spd+"kmph&nbsp;"+now.wind.dir+" "+now.wind.sc+"级&nbsp;湿度 "+now.hum+"%</p>";
                //部分城市有
                if(data.aqi){
                    content += "<p>空气质量<span>"+data.aqi.city.aqi+data.aqi.city.qlty+"</span></p>";
                }

                var daily_forcasts = data.daily_forecast;
                //console.log(daily_forcasts.length);
                content += "<ul class='box'>";

                for(i=0;i<daily_forcasts.length;i++) {

                    if (i==0){
                        content += "<li class='one'><p><i>"+week[d]+"</i></p>";
                        content += "<p>"+daily_forcasts[i].date + "<strong>(今天)</strong></p>";
                    }
                    else {
                        j=(d+i)%7;
                        content += "<li><p><i>"+week[j]+"</i></p>";
                        content += "<p>"+daily_forcasts[i].date+"</p>";
                    }
                    content += "<img src='images/"+pic[daily_forcasts[i].cond.txt_d]+"'>";
                    content += "<p>"+daily_forcasts[i].tmp.max + "℃ ～ " + daily_forcasts[i].tmp.min + "℃</p>";
                    content += "<p>"+daily_forcasts[i].cond.txt_d + "</p></li>";
                }
                content += "</ul>";
                /*var hourly_forecast = data["HeWeather data service 3.0"][0].hourly_forecast;
                content += "<h1>下午天气实时监控</h1>";
                content += "<ul class='box'>";
                for(i=0;i<hourly_forecast.length;i++) {
                    content += "<li>"+hourly_forecast[i].date + "<br>";
                    content += "<img src='images/"+pic[hourly_forecast[i].wind.sc]+"'><br>";
                    content += hourly_forecast[i].wind.sc + "<br>";
                    content += hourly_forecast[i].tmp+"℃<br>";
                    content += "降水概率"+hourly_forecast[i].pop + "</li>";
                }
                content += "</ul>";*/
                content += "<div class='suggestion'><h2>今日生活指数&gt;</h2>";
                content += "<ul class='life'>";
                var suggestion = data.suggestion;//生活指数
                content += "<li class='drsg'><i></i><div class='text'><h3>"+suggestion.drsg.brf+"</h3><p>"+suggestion.drsg.txt+"</p></div></li>";
                content += "<li class='flu'><i></i><div class='text'><h3>"+suggestion.flu.brf+"</h3><p>"+suggestion.flu.txt+"</p></div></li>";
                content += "<li class='trav'><i></i><div class='text'><h3>"+suggestion.trav.brf+"</h3><p>"+suggestion.trav.txt+"</p></div></li>";
                content += "<li class='cw'><i></i><div class='text'><h3>"+suggestion.cw.brf+"</h3><p>"+suggestion.cw.txt+"</p></div></li>";
                content += "<li class='sport'><i></i><div class='text'><h3>"+suggestion.sport.brf+"</h3><p>"+suggestion.sport.txt+"</p></div></li>";
                content += "<li class='uv'><i></i><div class='text'><h3>"+suggestion.uv.brf+"</h3><p>"+suggestion.uv.txt+"</p></div></li>";
                content += "</ul></div>";
                document.getElementById("result").innerHTML=content;

                document.body.style.backgroundImage="url(images/"+wea[daily_forcasts[0].cond.txt_d]+")";
                var ali=document.getElementsByClassName("box")[0].children;
                //alert(ali.length);
                for (j=0;j<ali.length;j++){
                    ali[j].index=j;
                    ali[j].onmouseover = function(){
                        document.body.style.backgroundImage="url(images/"+wea[daily_forcasts[this.index].cond.txt_d]+")";
                    }
                    ali[j].onmouseout = function(){
                        document.body.style.backgroundImage="url(images/"+wea[daily_forcasts[0].cond.txt_d]+")";
                    }
                }
            },
            function(status){
                alert("错误代码：" + status);
            }
        );

    }
}