/**
 * Created by wxl on 16-10-9.
 */
$(document).ready(function () {
    var x=300;//此值可以更改，越大效果越明显，分成的越多。  建议不超过999.大于一定图片可能不清晰。
    var pHTML="";
    // 分成多少块后每一块的宽度
    var ewid=800/x;

    var cHTML="";
    var zHTML="";
    var tHTML="";
    var z=0;
    for(var i=0;i<x;i++){
        // 图片动态添加4个面，上下，前后。不需要左右面
        pHTML+="<li><div></div><div></div><div></div><div></div></li>";
        // 其实是给每一个div添加了一个背景，但是让背景只显示一小部分。通过position设置。-i*ewid是控制背景图片的左偏移量。
        cHTML+=".pic li:nth-child("+(i+1)+") div{background-position:"+(-i*ewid)+"px;background-size:800px 360px;}";
        // 控制每一个li里面div的运动时间。
        tHTML+=".pic li:nth-child("+(i+1)+"){transition: 1s "+0.5*(i/x)+"s}"
        // 控制显示层，防止背后和上下的图片显示到前面。
        if(i>x/2){
            z--;
            zHTML+=".pic li:nth-child("+(i+1)+"){z-index:"+z+";}"
        }

    }
    $('.pic').append(pHTML);
    $('#css').append(cHTML+zHTML+tHTML);
    $('.pic li').css('width',ewid);
    $('.pic li div').css('width',ewid);
//console.log($('.pic li div:nth-of-type(1)').css("width"));
// 给下面的4个按钮添加点击事件
    $('.but li').click(function(){
        var a=$(this).index();
        var b=a*90+'deg';
        $(".pic li").css("transform","translateZ(-180px) rotateX("+b+")");
        $(this).addClass("active").siblings().removeClass();
    });
//图片自动播放
    var i=0;
    var fun1=function(){
        if(i==4){
            i=0;
        }
        $(".pic li").css("transform","translateZ(-180px) rotateX("+90*i+"deg)");
        $('.but li').eq(i).addClass("active").siblings().removeClass();
        i++;
    }
    var timer=setInterval(fun1,4000);
    $('.wrap').hover(
        function(){
            clearInterval(timer);
        },
        function(){
            timer=setInterval(fun1,4000);
        }
    );
});
