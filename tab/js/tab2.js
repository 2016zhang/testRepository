// JavaScript Document
//轮播选项卡工具
function slide(id,direction,speed){
	speed=10||speed; //若speed没有设置参数，则设置默认值为10	
	//获取标签		
	var itemDiv=document.getElementById(id);
	var oDiv=itemDiv.getElementsByClassName('box')[0]
	var btnDiv=itemDiv.getElementsByClassName("button")[0];
	var pic=oDiv.getElementsByClassName('pic')[0];
	var aImg=pic.getElementsByTagName('img');
	var aBtn=btnDiv.getElementsByTagName('button');
	//初始化定时器
	var timer=null;

	//p里放2套图片
	//var w = aImg.length*400; //1套图片的宽度
	//pic.style.width = w*2+'px';
	
	
	if(direction == "left"){
		var w = aImg.length*400; //1套图片的宽度
		pic.style.width = w*2+'px';
	}else if(direction == "top"){
		var h = aImg.length * 260;
		pic.style.height = h*2+'px';

		for(var i=0; i<5;i++){
			aImg[i].className = "img";
		}
	}
	pic.innerHTML+=pic.innerHTML;

	//向左偏移的长度（负值）
	var len = 0;
	//调用定时器开始工作
	time();	

	//绑定鼠标事件
	oDiv.onmouseover=function(){
		clearInterval(timer); //清除计时器
	}
	oDiv.onmouseout=function(){
		time();//再次启动定时器
	}

	//当前按钮下标
	var currentBtnIndex = 0;
	//给每个按钮绑定点击事件
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].index=i;
		aBtn[i].onclick=function(){
			clearInterval(timer);//清除定时器
			
			//设置图片此刻位置
			if(direction == "left"){
				len=-(this.index)*400; 
				pic.style.left=len+"px";
			}
			else if(direction == "top"){
				len=-(this.index)*260; 
				pic.style.top=len+"px";
			}
			//清除当前按钮的颜色
			aBtn[currentBtnIndex].className="";
			//更新当前按钮下标
			currentBtnIndex = this.index % 5;
			this.className='change';

			//点击事件后再次启动定时器（延时2秒）
			time();
		};
	}

	//计数器间隔2秒移动图片
	function time(){
		clearInterval(timer); //清除计时器
		timer=setInterval(move,2000);
	};

	function move(){
		len-=speed;
		
		if(direction == "left"){
			if(len < -w){
				len=0;
			}
			pic.style.left=len+'px';
			
			if(len%400 != 0){//图片切换中状态
			setTimeout(move,10);
			}else{//图片刚好布满窗口
				//更新按钮的当前下标和颜色
				aBtn[currentBtnIndex].className = "";
				currentBtnIndex = (-len/400%5);
				aBtn[currentBtnIndex].className = "change";
			}
		}
		else if(direction == "top"){
			if(len < -h){
				len=0;
			}
			pic.style.top=len+'px';
			
			if(len%260 != 0){//图片切换中状态
			setTimeout(move,20);
			}else{//图片刚好布满窗口
				//更新按钮的当前下标和颜色
				aBtn[currentBtnIndex].className = "";
				currentBtnIndex = (-len/260%5);
				aBtn[currentBtnIndex].className = "change";
			}
		}
		
	};
};