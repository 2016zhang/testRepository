function tab(id){
	var itemDiv=document.getElementById(id);
	var oDiv=itemDiv.getElementsByTagName('div')[0];
	var aImg=oDiv.getElementsByTagName('img');
	var aBtn=itemDiv.getElementsByTagName('button');

	var timer=null;
	var n=0;
	function show(n){
		for(var i=0;i<aBtn.length;i++){
			for(var j=0;j<aImg.length;j++){
				aImg[j].style.display='none';
				aBtn[j].className='';
			}	
			aImg[n].style.display='block';
			aBtn[n].className='change';
		}
	}
	function time(){
		timer=setInterval(function(){
			n++;
			//判断是否大于等于3，若是，则置为0
			if (n>=aBtn.length) {
				n=0;
			}
			show(n);
		},2000);
	};
	//调用定时器函数开启定时器
	time();

	oDiv.onmouseover=function(){
		//清除定时器
		clearInterval(timer);
	};

	oDiv.onmouseout=function(){
		//开启定时器
		time();
	};

	for(var i=0;i<aBtn.length;i++){
		
		aBtn[i].index=i;
		aBtn[i].onclick=function(){
			//清除定时器
			clearInterval(timer);
			show(this.index);
			n=this.index;
			//开启定时器
			time();
		};
		
	}

};
