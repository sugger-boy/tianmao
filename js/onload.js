window.onload=function(){
	//轮播图
	function a(){
      var imgs=$(".imgs"); 
      var btn=$(".btn");
      var banner=$(".box")[0];
      var bgarr=["#FFCC00","#2C2F74","#E8E8E8","#2C2F72"]
      var num=0;
      function move(){
        if(num==4){
          num=0;
        }
        for (var i = 0; i < imgs.length; i++) {
          imgs[i].style.zIndex=2;
          btn[i].style.background="#000";
        };
        imgs[num].style.zIndex=3;
        btn[num].style.background="#333";
        banner.style.background=bgarr[num];
        num++;
      }
      var t=setInterval(move,2000);



      for (var i = 0; i < btn.length; i++) {
        btn[i].index=i;
        btn[i].onmouseover=function(){
          for (var j = 0; j < imgs.length; j++) {
          imgs[j].style.zIndex=1;
          btn[j].style.background="#000";
        };
          clearInterval(t);
          imgs[this.index].style.zIndex=2;
          btn[this.index].style.background="#333";
          banner.style.background=bgarr[this.index];
        }
        btn[i].onmouseout=function(){
          t=setInterval(move,2000);
          num=this.index+1;
        }
      };
    }
	a();




 






//选项卡
function b(){
	var dapai1=getClass("dapai1");
	var zhongtupian=getClass("zhongtupian");
	for (var i = 0; i < dapai1.length; i++) {
		dapai1[i].index=i;
		dapai1[i].onclick=function(){
			for (var j = 0; j < zhongtupian.length; j++) {
				zhongtupian[j].style.display="none";
				dapai1[j].style.fontWeight="normal";
				dapai1[j].style.textDecoration="none"
			};
			zhongtupian[this.index].style.display="block";
			this.style.fontWeight="bold";
			this.style.textDecoration="underline";
		}
	}
	}
	b();



//搜索框
function c(){
	var tex=$("#tex");
	tex.onfocus=function(){
     //表单获得焦点
     if(tex.value=="魅力惠入驻！时尚轻奢首选"){
      tex.value=""};
	};
	tex.onblur=function(){
    //表单失去焦点
    if(tex.value==""){
		tex.value="魅力惠入驻！时尚轻奢首选";
    }
	}
}
c();



//楼层跳转
function d(){
	        var btnbox=$(".button")[0];
	        var search=$(".search")[0];
        	var btns=$("div",btnbox);
        	var floors=$(".yizhong");
        	var flag=true;
     	    var flag1=true;
        	if(document.documentElement.scrollTop==0){
        		document.documentElement.scrollTop=1
        	}
        	for (var i = 0; i < btns.length; i++) {
        		btns[i].index=i;
        		btns[i].onclick=function(){
        			var top=floors[this.index].offsetTop;
        			var obj=document.documentElement.scrollTop==0?document.body:document.documentElement;
        			animate(obj,{scrollTop:top-52},1000)
        		}
        	};
             window.onscroll=function(){
             	var obj=document.documentElement.scrollTop==0?document.body:document.documentElement;
             	var aa=obj.scrollTop;
             	var scrollT=getScrollT();
     		if(scrollT>=100){
     			if(flag){//为了保证页面往下拉时只有一个animate函数执行
     				animate(search,{top:0},500);
     				flag=false;
     				flag1=true;
     			}     			
     		}else{
                if(flag1){
                	animate(search,{top:-50});
                	flag1=false;
                	flag=true;
                }	   			
     		}
            if(aa>1150){
            	btnbox.style.display="block";
            	animate(btnbox,{opacity:1},1000)
            }
            if(aa<1150){
                  btnbox.style.display="none";
                  animate(btnbox,{opacity:0},10)
            };
        }
}
d();



//隐藏搜索框
function e(){
	var tex=$("#ext");
	tex.onfocus=function(){
     //表单获得焦点
     if(tex.value=="魅力惠入驻！时尚轻奢首选"){
      tex.value=""};
	};
	tex.onblur=function(){
    //表单失去焦点
    if(tex.value==""){
		tex.value="魅力惠入驻！时尚轻奢首选";
    }
	}
}
e();



//楼层轮播图
function f(num){
	    var bannerbox=$(".bannerbox11")[num];
    	var left=$(".leftbtn")[num];
    	var right=$(".rightbtn")[num];
    	var flg1=true;
    	function aa(){
    		if(flg1==true){
    			flg1=false;
    		animate(bannerbox,{marginLeft:-190},1000,function(){
    			var fir=getFirst(this);
    			this.appendChild(fir);
    			this.style.marginLeft=0;
    			flg1=true;
    		})
    		}
    	}
    	var t=setInterval(aa,3000)
    	left.onmouseover=right.onmouseover=function(){
    		clearInterval(t);
    	}
    	left.onmouseout=right.onmouseover=function(){
    		t=setInterval(aa,3000);
    	}
    	right.onclick=function(){
    		aa();
    	}
    	left.onclick=function(){
    		var last=getLast(bannerbox);
   	        var first=getFirst(bannerbox);
        	bannerbox.insertBefore(last,first);
   	        bannerbox.style.marginLeft="-190px";
   	        animate(bannerbox,{marginLeft:0},1000)
    	}
}
f(0);
f(1);
f(2);
f(3);
f(4);







//漂浮窗
function g(){
    var box=$(".bbooxx")[0];
    var speedx=6,speedy=6;
    var maxTop=document.documentElement.clientHeight-box.offsetHeight;
    var maxLeft=document.documentElement.clientWidth-box.offsetWidth;
    function move(){
      var ol=box.offsetLeft;
      var ot=box.offsetTop;
      var left=ol+speedx;
      var top=ot+speedy;
      if(top>=maxTop){
        speedy*=-1;
      }
      if(left>=maxLeft){
        speedx*=-1;
      }
      if(top<0){
        speedy*=-1;
      }
      if(left<0){
        speedx*=-1;
      }
      box.style.left=left+"px";
      box.style.top=top+"px";           

    }
    var t=setInterval(move,50)
    box.onmouseover=function(){
      clearInterval(t)
    }
    box.onmouseout=function(){
      t=setInterval(move,50)
    }
  }
g();




//左移动 
function h(){
  var movel=$(".yiyou");
for(var i=0;i<movel.length;i++){
   
   var moveimg=$("img",movel[i]);
    moveLeft(moveimg);
 }
  function moveLeft(obj){
 
    for(var i=0;i<obj.length;i++){
  obj[i].index=i;
  obj[i].onmouseover=function(){
    obj[this.index].style.cssText="position:relative;left:-3px";
  }
  obj[i].onmouseout=function(){
    obj[this.index].style.cssText="position:relative;left:0px"
    }
  }
}
}
h();






//下拉效果
function i(){
  // var yiji=$(".yiji");
  //     var erji=$(".erji");
  //       for (var i = 0; i < yiji.length; i++) {
  //         yiji[i].index=i;
  //         hover(yiji[i],function(){
  //            var lis=$("li",erji[this.index]);
  //            var h=lis[0].offsetHeight;
  //            erji[this.index].style.height=0+"px";
  //            animate(erji[this.index],{height:lis.length*h},300,Tween.Linear);
  //           },function(){
  //            animate(erji[this.index],{height:0},300,Tween.Linear);
  //           }
  //         )
  //       }
   jquery(".yiji").hover(function(){
        jquery(".erji").stop();
    jquery(this).find(".erji").slideDown();//slideDown()从上到下呼出;
   },function(){
    jquery(".erji").stop();
    jquery(this).find(".erji").hide();//hide()隐藏
   })

}
i();





//导航栏隐藏
function k(){
   var daos=getClass("ten");
    var fus=getClass("youyincang");
    for (var i = 0; i < daos.length; i++) {
      daos[i].index=i;
      daos[i].onmouseover=function(){
        this.flag=true;
        var aa=this;
        setTimeout(function(){
        if(aa.flag){  
          fus[aa.index].style.display="block";
          animate(fus[aa.index],{left:190,opacity:1},200)
         }
           },100)
        }

      daos[i].onmouseout=function(){
        this.flag=false;
       
        animate(fus[this.index],{left:170,opacity:1},300,function(){
          this.style.display="none";
        })
      }
    }
    }
k();
}











