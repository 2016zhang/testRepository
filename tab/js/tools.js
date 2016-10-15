// JavaScript Document
//全选工具
function chk_itmes(id){
	var idDiv=document.getElementById(id);
	var all=idDiv.getElementsByTagName('input')[0];
	var oDiv=idDiv.getElementsByTagName('div')[0];
	var ones=oDiv.getElementsByTagName('input');
	var count=0;   //用count计数，标记下面input选中的个数来判断全选是否要被选中
	//找到谁 事件  让谁  干什么    
	//全选按钮绑定事件   
	all.onclick=function(){
		// if (this.checked) {
		// 	for (var i = 0; i < ones.length; i++) {
		// 		ones[i].checked=true;
		// 		count=ones.length;
		// 	}
		// }else{
		// 	for (var i = 0; i < ones.length; i++) {
		// 		ones[i].checked=false;
		// 		count=0;
		// 	}
		// }
		//改进代码，先循环再判断
		for (var i = 0; i < ones.length; i++) {
			if (this.checked) {
				//如果全选按钮选中，则下面的input状态改为true
				ones[i].checked=true;
				count=ones.length;
			}else{
				//否则，下面的input状态改为false
				ones[i].checked=false;
				count=0;
			}
		}	
	};
	for(var j=0;j<ones.length;j++){
		//下面的按钮绑定事件
		ones[j].onclick=function(){
			if(this.checked){
				count++;
			}else{
				count--;	
			}
			
			if(count==ones.length){
				all.checked=true;	
			}else{
				all.checked=false;	
			}
		};
	}
};


//选项卡工具                                                                  
function tab(id){
	var itemDiv=document.getElementById(id);
	var oDiv=itemDiv.getElementsByTagName('div')[0];
	var aImg=oDiv.getElementsByTagName('img');
	var aBtn=itemDiv.getElementsByTagName('button');
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].index=i;
		aBtn[i] .onclick=function(){
			for(var j=0;j<aImg.length;j++){
				aImg[j].style.display='none';
				aBtn[j].className='';
			}	
			aImg[this.index].style.display='block';
			this.className='change';
		};
	}
};


//轮播图工具
function slide(id,direction,speed){	
    speed=10||speed; //若speed没有设置参数，则设置默认值为10、
	var oDiv=document.getElementById(id);
	var pic=oDiv.getElementsByClassName('pic')[0];
	var aImg=pic.getElementsByTagName('img');
	var timer=null;

	//p里放2套图片
	if(direction == "left" || direction == "right"){
		var w = aImg.length*400; //1套图片的宽度
		pic.style.width = w*2+'px';
	}else{
		var h = aImg.length * 260;//
		pic.style.height = h*2+'px';

		for(var i=0; i<aImg.length;i++){
			aImg[i].className = "img";
		}
	}
	pic.innerHTML+=pic.innerHTML;
	var len = 0;
	time();
	//绑定事件
	oDiv.onmouseover=function(){
		clearInterval(timer); //清除计时器
	}
	oDiv.onmouseout=function(){
		time();
	}

	//计数器让图片移动起来,封装函数
	function time(){
		if(direction == "right"){
			len=400-2*w;
		}else if(direction == "bottom"){
			len = 260-2*h;
		}

		clearInterval(timer);
		timer=setInterval(function(){
			if(direction == "left"){
				len-=speed;
				if(len < -w){
					len=0;
				}
				pic.style.left=len+'px';
			}
			else if(direction == "right"){
				len+=speed;
				if(len>0){
					len=400-w*2;
				}
				pic.style.left=len+'px';
			}
			else if(direction == "top"){
				len-=speed;
				if(len<-h){
					len=0;
				}
				pic.style.top=len+'px';
			}else{
				len+=speed;
				if(len> 0){
					len=260-h*2;
				}
				pic.style.top=len+'px';
			}
			
		},80);
	};
};
