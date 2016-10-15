/*菜单--------------------------------------------------------*/
function detail_menu(){ 
	var allType=document.getElementById('allType');	
	var allList=document.getElementById('dd');
	
	var navList=allList.getElementsByClassName('nav_list')[0];
	var aLi=navList.getElementsByTagName('li');
	var detailMenuCont=document.getElementById('detailMenuCont');
	var popup=detailMenuCont.getElementsByClassName('popup');
	var leave_menu=null;//离开右侧 回到左侧
	var leave_allType = null;
	var isOverList=false;
	var curIndex = 0;
	allType.onmouseover=function(){
		aLi[curIndex].className = "";
		allList.style.display="block";
	};
	allType.onmouseout=function(){
		clearTimeout(leave_allType);
		leave_allType = setTimeout(function(){
		if (!isOverList) {
				allList.style.display="none";			
			};
		},400)
		
	};

	navList.onmouseover=function(){
		isOverList=true;
	}

	navList.onmouseout=function(){
		isOverList = false;
	}

	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;//发牌照
		aLi[i].onmouseover=function(){
			aLi[curIndex].className = "";
			curIndex = this.index;

			this.className="liHover";
			clearTimeout(leave_menu);
			detailMenuCont.style.display="block";
			
			//显示相对应的内容(就是选项卡的原理)
			for(var i=0; i<popup.length; i++){
				popup[i].style.display="none";
			};
			popup[this.index].style.display="block";
		};
		
		aLi[i].onmouseout=function(ev){
			//this.className="";
			clearTimeout(leave_menu);
			leave_menu=setTimeout(function(){
				detailMenuCont.style.display="none"; 
			},200)
		};
	};

	detailMenuCont.onmouseover = function(){
		isOverPopup = true;
	}
	detailMenuCont.onmouseout = function(){
		isOverPopup = false;
	}

	allList.onmouseover=function(ev){
		clearTimeout(leave_menu);
		this.style.display="block";

	};
	
	allList.onmouseout=function(ev){
		this.style.display="none";
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
};


//放大镜---------------------------------------------------------------
function magnifyingGlass(){
	var img_list=document.getElementById('img_list');
	var aLi=img_list.getElementsByTagName('li');
	var smallBox=document.getElementById('species1');
	var img=smallBox.getElementsByTagName('img')[0];
	var bigImgBox=document.getElementById('bigImg');
	var bigImg=bigImgBox.getElementsByTagName('img')[0];
	var oSpan=smallBox.getElementsByTagName('span')[0];
	

	var curIndex=0;
	var arrSmallPic=['images/574bba5eN67335c4b.jpg','images/574bba65N4b283a95.jpg','images/574bba5eN67335c4b.jpg','images/574bba6cNb831644d.jpg']
	var arrBigPic=['images/ibig1.jpg','images/ibig4.jpg','images/ibig3.jpg','images/ibig2.jpg'];
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].index=i;
		aLi[i].onmouseover=function(){
			aLi[curIndex].className="";
			curIndex=this.index;
			this.className="borderC";
			img.src=arrSmallPic[this.index];
		}
	};
	
	smallBox.onmousemove=function(ev){
		bigImg.src=arrBigPic[curIndex];
		oSpan.style.display=bigImgBox.style.display='block';
		
		var oEv=ev||event;
		
		//获取滚动条  chrome不识别 documentElement.scrollTop
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		
		//鼠标在span的中心位置
		var l=oEv.clientX-offsetLeft(this)-oSpan.offsetWidth/2-48; 
		var t=oEv.clientY+scrollTop-offsetTop(this)-oSpan.offsetHeight/2;
		
		//限制范围 
		if(l<0)l=0;
		if(l>=this.offsetWidth-oSpan.offsetWidth){
			l=this.offsetWidth-oSpan.offsetWidth;
		}

		if(t<0)t=0;
		if(t>=this.offsetHeight-oSpan.offsetHeight){
			t=this.offsetHeight-oSpan.offsetHeight;
		}
		oSpan.style.left=l+'px';
		oSpan.style.top=t+'px';	
		
		
		var l_rate=l / (this.offsetWidth-oSpan.offsetWidth);
		var t_rate=t / (this.offsetHeight-oSpan.offsetHeight);
		
		
		bigImg.style.left= (bigImgBox.offsetWidth-bigImg.offsetWidth)*l_rate +'px'; //外box 减 内部大图片，为负值
		bigImg.style.top= (bigImgBox.offsetHeight-bigImg.offsetHeight)*t_rate +'px';
		
	};
	
	smallBox.onmouseout=function(){
		oSpan.style.display=bigImgBox.style.display='none';	
	};


	function offsetTop( elm ){ 
		var top = elm.offsetTop; 
		var parent = elm.offsetParent; 
		while( parent != null ){ 
			top += parent.offsetTop; 
			parent = parent.offsetParent; 
		}; 
		return top; 
	}; 
	function offsetLeft( elm ){ 
		var left = elm.offsetLeft; 
		var parent = elm.offsetParent; 
		while( parent != null ){ 
			left += parent.offsetLeft; 
			parent = parent.offsetParent; 
		}; 
		return left; 
	}; 
}

//skuchoose--------------------------------------------------------
function selected1(id,cls){
	var chooseColor=document.getElementById(id);
	var aItem=chooseColor.getElementsByClassName(cls);
	var curIndex=0;
	aItem[curIndex].className+=" selected selecting";

	for (var i = 0; i < aItem.length; i++) {
		aItem[i].index=i;
		aItem[i].onmouseover=function(){
			if (curIndex!=this.index) {
				this.className+=" selecting";
			};
		};
		aItem[i].onmouseout=function(){
			if (curIndex!=this.index) {
				this.className = this.className.replace(/ selecting/,"");
			};
		};
		aItem[i].onclick=function(){
			if(curIndex != this.index){
				aItem[curIndex].className=aItem[curIndex].className.replace(/ selected/,"").replace(/ selecting/,"");
				curIndex=this.index;
				this.className+=" selected";
			}
		}
	};
}

function selected2(id,cls){
	var chooseColor=document.getElementById(id);
	var aItem=chooseColor.getElementsByClassName(cls);
	var curIndex=-1;
	for (var i = 0; i < aItem.length; i++) {
		aItem[i].index=i;
		aItem[i].onmouseover=function(){
			if (curIndex!=this.index) {
				this.className+=" selecting";
			};
		};
		aItem[i].onmouseout=function(){
			if (curIndex!=this.index) {
				this.className = this.className.replace(/ selecting/,"");
			};
		};
		aItem[i].onclick=function(){
			if(curIndex!=-1){
				if(curIndex != this.index){
					aItem[curIndex].className=aItem[curIndex].className.replace(/ selected/,"").replace(/ selecting/,"");
				}else{
					aItem[curIndex].className=aItem[curIndex].className.replace(/ selected/,"");
				}
			}		
			
			if(curIndex != this.index){
				curIndex=this.index;
				this.className+=" selected";
			}else{
				curIndex = -1;
			}
			

		}
	};
}

//buyAmount-----------------------------------------------------------------------
function buyAmount(){
	var btnAdd=document.getElementsByClassName('btn-add')[0];
	var btnReduce=document.getElementsByClassName('btn-reduce')[0];
	var input=document.getElementById('input');
	btnAdd.onclick=function(){
		input.value++;
		btnReduce.style.color="#666";
		btnReduce.style.cursor='pointer';
	};
	btnReduce.onclick=function(){
		if (input.value==1) {
			this.style.color="#ccc";
			this.style.cursor='not-allowed';
		}else{
			input.value--;
		}
		
	};
};


//tab---------------------------------------------
function recommendAd(){
	var fitting=document.getElementById('fitting');
	var tabItem=fitting.getElementsByClassName('tab-item');
	var picList=fitting.getElementsByClassName('pic-list');
	var curIndex=1;
	picList[curIndex].style.display='block';
	for (var i = 0; i < tabItem.length; i++) {
		tabItem[i].index=i;
		tabItem[i].onclick=function(){
			tabItem[curIndex].className='tab-item';
			picList[curIndex].style.display='none'
			curIndex=this.index;
			this.className="curr tab-item";
			picList[this.index].style.display='block';
		}
	};
}