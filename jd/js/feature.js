/*菜单--------------------------------------------------------*/
function menu(){ 	
	var oMenu=document.getElementById('jdMenu');
	var aLi=oMenu.getElementsByTagName('li');
	var oMenuCont=document.getElementById('menuCont');
	var popup=oMenuCont.getElementsByClassName('popup');
	var leave_menu=null;//离开右侧 回到左侧
	
	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;//发牌照
		
		aLi[i].onmouseover=function(){
			clearTimeout(leave_menu);
			oMenuCont.style.display="block";
			
			//显示相对应的内容(就是选项卡的原理)
			for(var i=0; i<popup.length; i++){
				popup[i].style.display="none";
			};
			popup[this.index].style.display="block";
		};
		
		aLi[i].onmouseout=function(){
			clearTimeout(leave_menu);
			leave_menu=setTimeout(function(){
				oMenuCont.style.display="none"; 
			},200)
		};
	};
	
	oMenuCont.onmouseover=function(ev){
		clearTimeout(leave_menu);
		this.style.display="block";
		
		var oEv=ev||window.event;
		var oEl=oEv.relatedTarget||oEv.fromElement;  
		if( isChild(this,oEl) ){//如果离开的元素还是自己
			return;
		}
	};
	
	oMenuCont.onmouseout=function(ev){
		var oEv=ev||window.event;
		var oEl=oEv.relatedTarget||oEv.toElement;
		if(! isChild(this,oEl) ){ 
			this.style.display="none";
			return;
		}
	};	
	//判断子集	
	function isChild(oParent,obj){
		while(obj){
			if(obj==oParent) return true;
	        obj=obj.parentNode;	
		}	
		// 不是我的子级
		return false;
	};
}

//banner---------------------------------------------------------
function bannerAd(){
	var oDiv=document.getElementById('slide');
	var moveBtn=oDiv.getElementsByClassName('moveBtn');
	var ol=oDiv.getElementsByTagName('ol')[0];
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	aLi[0].style.opacity=1;
	var timer1 = null;
	
	var pBtn=document.getElementById('prevBtn');
	var nBtn=document.getElementById('nextBtn');
	var n=0;//当前显示图片索引

	//添加点击按钮li
	for(var i=0; i<aLi.length; i++){
		var li=document.createElement('li');
		li.innerHTML=i+1;
		ol.appendChild(li);
	}
	var aBtn=ol.children;
	aBtn[0].className="ac";
	//添加点击事件
	for(var i=0; i<aBtn.length; i++){
		aBtn[i].index=i;//发拍照
		aBtn[i].onclick=aBtn[i].onmouseover=function(){
			
			if(n!=this.index){
				slideItem(n,this.index);
				n=this.index;
				changeAc();
			}	
		};
	};

	function time(){
		clearInterval(timer1);
        timer1=setInterval(function(){
            n++;
			if(n>aLi.length-1){
				n=0;
				slideItem(aLi.length-1,0);
			}else{
				slideItem(n-1,n);
			};
            changeAc();
        },3000);
    };
    //调用定时器函数开启定时器
    time();

    oDiv.onmouseover=function(){
    	for (var i = 0; i < moveBtn.length; i++) {
    		moveBtn[i].style.display="block";
    	}
        //清除定时器
        clearInterval(timer1);
    };

    oDiv.onmouseout=function(){
    	for (var i = 0; i < moveBtn.length; i++) {
    		moveBtn[i].style.display="none";
    	}
        //开启定时器
        time();
    };

	pBtn.onclick=function(){
		if(n<1){
			n=aLi.length;
			slideItem(0,aLi.length-1);
		}else{
			slideItem(n,n-1);
		};
		n--;
		changeAc();	
	}

	nBtn.onclick=function(){
		n++;
		if(n>aLi.length-1){
			n=0;
			slideItem(aLi.length-1,0);
		}else{
			slideItem(n-1,n);
		};
		changeAc();	
	};
	
	
	function slideItem(a,b){
		aLi[a].style.display='block';
		aLi[a].style.opacity=1;;
		
		aLi[b].style.display='block';
		aLi[b].style.opacity=0;
		
		hxsd_tools.move(aLi[a],'opacity',0,1000);
		hxsd_tools.move(aLi[b],'opacity',100,1000,function(){
			aLi[a].style.display='none';
		});
	};
	
	
	function changeAc(){
		for(var j=0; j<aBtn.length; j++){
			aBtn[j].className='';
		};
		aBtn[n].className='ac';
	};
}


/*楼层滚动-----------------------------------------------------*/
function locationFloor(){
	var LocationFloorList=hxsd_tools.getByClass(document,'LocationFloorList')[0];
	var aLi=LocationFloorList.getElementsByTagName('li');
	var aFloor=hxsd_tools.getByClass(document,'floor');
	
	var arr=[];
		
	//-------------------------------------------------
		
	for(var i=0; i<aFloor.length; i++){
		var json={};
		json.name='f'+i;
		json.offsetTop=aFloor[i].offsetTop;
		arr.push(json);
	};
	
	window.onscroll=function(){
		//显示楼层编号-------------------------------------------------
		var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
		if(scrolltop>1200 && scrolltop < 9542){
			LocationFloorList.style.display='block';
		}else{
			LocationFloorList.style.display='none';
		};
		
		// 根据楼层滚动位置，定位编号------------------------------------------------
		var screenHeight=document.documentElement.offsetHeight || document.body.Height;
		var last_arr=[];
		for(var j=0; j<arr.length; j++){
			if(arr[j].offsetTop<scrolltop+400){
				last_arr.push(arr[j].name);
			}
		};
		var li_index=last_arr[last_arr.length-1].substr(1);

		for(var l=0; l<aFloor.length; l++){
			aLi[l].className='';
		};
		aLi[li_index].className='ac';
	};
	
	//点击编号，跳转到相对楼层-----------------------------------------------
	for(var i=0; i<aFloor.length; i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var end=arr[this.index].offsetTop;
			move(start,end)
		}
	};
	//move-------------------------------------------------------
	var timer;
	function move(start,end){
		var dis=end-start;
		var count=parseInt(1500/30);
		var n=0;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var step_dis=start+dis*(1-a*a*a*a);
			window.scrollTo(0,step_dis);
			if(n==count){
				clearInterval(timer);
			};
		},30);
	};
}


//幻灯片---------------------------------------------------------------------
function slide(id,showBtnNum){
	var oDiv=document.getElementById(id);
	var moveBtn=oDiv.getElementsByClassName('moveBtn');
	var ol=oDiv.getElementsByTagName('ol')[0];
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	aLi[0].style.opacity=1;
	var timer=null;
	var pBtn=moveBtn[0];
	var nBtn=moveBtn[1];
	var n=0;//当前显示图片索引

	//添加点击按钮li
	for(var i=0; i<aLi.length; i++){
		var li=document.createElement('li');
		if(showBtnNum) li.innerHTML=i+1;
		ol.appendChild(li);
	}
	var aBtn=ol.children;
	aBtn[0].className="ac";

	//设定ul宽度
	var li_w=hxsd_tools.getStyle(aLi[0], 'width');//图片的宽度
	oUl.style.width=li_w*aLi.length +'px';
	
	//添加点击事件
	for(var i=0; i<aBtn.length; i++){
		aBtn[i].index=i;//发牌照
		
		aBtn[i].onclick=aBtn[i].onmouseover=function(){
			//改变当前显示索引
			n=this.index;
			changeAc(n);
			hxsd_tools.move1(oUl,{'left':-li_w*n})
		};
	};
	
	pBtn.onclick=function(){
		n--;
		if(n<0) n=3;
		hxsd_tools.move1(oUl,{'left':-li_w*n});
		changeAc(n);
	}
	
	//左右按钮动作

	nBtn.onclick=function(){
		n++;
		//if(n>=aLi.length-1) n=aLi.length-1;
		if(n>aLi.length-1) n=0;

		hxsd_tools.move1(oUl,{'left':-li_w*n});
		changeAc(n);
	};


	function time(){
		clearInterval(timer);
        timer=setInterval(function(){
            n++;
			if(n>aLi.length-1){
				n=0;
			};
			hxsd_tools.move1(oUl,{'left':-li_w*n});
            changeAc(n);
        },2000);
    };
    //调用定时器函数开启定时器
    time();

    oDiv.onmouseover=function(){
    	for (var i = 0; i < moveBtn.length; i++) {
    		moveBtn[i].style.display="block";
    	}
        //清除定时器
        clearInterval(timer);
    };

    oDiv.onmouseout=function(){
    	for (var i = 0; i < moveBtn.length; i++) {
    		moveBtn[i].style.display="none";
    	}
        //开启定时器
        time();
    };
	
	
	function changeAc(n){
		for(var j=0; j<aBtn.length; j++){
			aBtn[j].className='';
		};
		aBtn[n].className='ac';
	};
}


//tab-----------------------------------------------------------------------------------------------
function tab(id,cls){
	var tab=document.getElementById(id); 
	var aLi=tab.getElementsByTagName('li');
	var floor=document.getElementsByClassName(cls)[0];
	var aPicContent=floor.getElementsByClassName('itemList');
	var currentIndex=0;


	aLi[currentIndex].className='liHover';
	aPicContent[currentIndex].style.display='block';
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].index=i;
		aLi[i].onmouseover=function(){
			aLi[currentIndex].className='';
			aPicContent[currentIndex].style.display='none';
			currentIndex=this.index;
			aLi[currentIndex].className='liHover';
			aPicContent[currentIndex].style.display='block';
		}
	};

}



//话费 机票部分
function iconContent(){
	var liHover=document.getElementsByClassName('liHover');
	var cha=document.getElementsByClassName('cha');
	var icon_inner=document.getElementById('icon_inner');

	var imgaeText_det=document.getElementById('imgaeText_det');
	var oLi=imgaeText_det.children;
	var imgaeText_bot=document.getElementsByClassName('imgaeText_bot');
	for(var i=0;i<oLi.length;i++){
		oLi[i].index=i;
		oLi[i].onmouseover=function(){
			for(var j=0;j<oLi.length;j++){
				oLi[j].className=''
				imgaeText_bot[j].style.display='none';
			}
			this.className='imgaeText_ac';
			imgaeText_bot[this.index].style.display='block';
		}
	}
	
	
	for(var i=0;i<liHover.length;i++){
		liHover[i].index=i;
		liHover[i].onmouseover=function(){
			icon_inner.style.transform='translateY(-213px)'
			for(var j=0;j<oLi.length;j++){
				oLi[j].className=''
				imgaeText_bot[j].style.display='none';
			}
			oLi[this.index].className='imgaeText_ac';
			imgaeText_bot[this.index].style.display='block';
		}
		cha[i].onclick=function(){
			icon_inner.style.transform='translateY(0px)'
		}
	}
};