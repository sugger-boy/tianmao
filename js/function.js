// 获取类名
function getClass(selector,obj){
   var obj=obj||document;
  if(obj.getElementByClassName){
  return obj.getElementByClassName(selector); 
   }else{
    var arr=obj.getElementsByTagName('*');
    var newarr=[];
    for (var i = 0; i < arr.length; i++) {       
      if(check(arr[i].className,selector)){
        newarr.push(arr[i]);
      }
    };
    return newarr;
   }  
} 
// 检查类名
function check(longstr,str){
    var arr=longstr.split(" ");
   for (var i = 0; i < arr.length; i++) {
      if(arr[i]==str){
         return true;
      }
   };
   return false;
}
// 获取文本 改变内容
function getText(obj,val){
  if(val==undefined){
    if(obj.textContent!=undefined){
      return obj.textContent;
    }else{
      return obj.innerText;
    }
  }else{
    if(obj.textContent!=undefined){
      //现代浏览器
      obj.textContent=val;
    }else{
      //ie 6-8
      obj.innerText=val;
    }
  }
}
// 获取样式信息
function getStyle(obj,attr){
  if(window.getComputedStyle){
    return getComputedStyle(obj,null)[attr];
  }else{
    return obj.currentStyle[attr];
  };
}
//$函数 多种方式获取元素
function $(selector,object){
    object=object||document;   
      if(typeof selector=="string"){
        selector=trim(selector,"b");
        if(selector.slice(0,1)=="."){
            return getClass(selector.slice(1),object);
        }else if(selector.slice(0,1)=="#"){
          return object.getElementById(selector.slice(1),object);
        }else if(/^[a-z|a-z1-6]{1,10}$/g.test(selector)){
          return object.getElementsByTagName(selector);
        }
      }else if(typeof selector=="function"){
        // window.onload=function(){
        //   selector();
        // }
        //调用绑定事件函数
        addEvent(window,"load",selector)
      }
    }
// 获取元素子节点
// a 只获取元素节点
// b 不仅要获取元素节点  还要包括非空文本
  function getChilds(obj,type){
    var sons=obj.childNodes;
    var arr=[];
    type=type||"a";
    if(type=="a"){
    for (var i = 0; i < sons.length; i++) {
      if(sons[i].nodeType==1){
        arr.push(sons[i]);
      }
    }; 
   }else if(type=="b"){
    for (var i = 0; i < sons.length; i++) {
      if(sons[i].nodeType==1||(sons[i].nodeType==3&&trim(sons[i].nodeValue)!="")){
         arr.push(sons[i]);
     }
    };
   }
    return arr;
  }  
//去空格  取出字符串两端空格left左边 right右边 both两边 all所有 middle中间
  function trim(str,type){
    type=type||"b";
    if(type=="b"){
    return str.replace(/^\s*|\s*$/g,"")
  }else if(type=="l"){
    return str.replace(/^\s*/,"") 
  }else if(type=="r"){
   return str.replace(/\s*$/,"")
  }else if(type=="a"){
   return str.replace(/\s*/g,"")
  }else if(type=="m"){
    var left=/^\s*/.exec(str);
    var right=/\s*$/.exec(str);
    var end=left[0]+str.replace(/\s*/g,"")+right[0];
    return end;
  }
  } 
// 获得第一个子元素
  function getFirst(obj){
    return getChilds(obj)[0];
  }
//获得最后一个子元素 
  function getLast(obj){
    var childs=getChilds(obj)
    return childs[childs.length-1]
  }
//获得下一个兄弟元素
function getNext(obj){
  var next=obj.nextSibling;
  if(next==null){
      return;
    }
  while(next.nodeType!=1){
    next=next.nextSibling;
    if(next==null){
      return;
    }
  }
  return next;
}
//获得上一个兄弟元素  
function getPrevious(obj){
  var up=obj.previousSibling;
  if(up==null){
    return;
  }
  while(up.nodeType!=1){
    up=up.previousSibling;
    if(up==null){
      return;
    }
  }
  return up;
}
// 插入到某个函数的后面
function insertAfter(obj1,obj2){
  var parent=obj2.parentNode;
  var next=getNext(obj2);
  if(next){
  parent.insertBefore(obj1,next);
  }else{
    parent.appendChild(obj1);
  }
}


//12.获取滚动条走了的距离
function getScrollT(){
  var obj=document.documentElement.scrollTop?document.documentElement:document.body;
  var scrollT=obj.scrollTop;
  return scrollT;
}
//任意一个元素距离文档顶部和左边的距离
// 文档坐标 
function getPosition(obj){
  var left=obj.offsetLeft;
  var top=obj.offsetTop;
  var parent=obj.parentNode;
 while(parent.nodeName!="BODY"){ 
  if(getStyle(parent,"position")!="static"){
    var parentLeft=parent.offsetLeft;
    var parentTop=parent.offsetTop;
    var leftBorder=parseInt(getStyle(parent,"borderLeftWidth"));
    var topBorder=parseInt(getStyle(parent,"borderTopWidth"));
    left=left+parentLeft+leftBorder;
    top=top+parentTop+topBorder;
  }
    parent=parent.parentNode;
  }
  return object={x:left,y:top};
}
// 兼容的绑定事件
  function addEvent(obj,event,fun){
   if(obj.addEventListener){
    obj.addEventListener(event,fun,false);
   }else{
    obj.attachEvent("on"+event,fun);
   }
  }
//兼容的移除事件
  function removeEvent(obj,event,fun){
    if(obj.removeEventListener){
    obj.removeEventListener(event,fun,false);
   }else{
    obj.detachEvent("on"+event,fun);
   }
  } 
// 获取浏览器的宽高值
  function browserSize(){
    var bwidth=document.documentElement.clientWidth;
    var bheight=document.documentElement.clientHeight;
    return{width:bwidth,height:bheight};
  }
// 拖拽功能
 function Drag(obj,settingObj){
      settingObj=settingObj||{};
      this.area=settingObj.dragarea==undefined?document:settingObj.dragarea;
      this.direction=settingObj.direction==undefined?"all":settingObj.direction;
      this.obj=obj;
      obj.style.position="absolute";
      if(this.area!=document){
        this.area.style.position="relative";
      }      
      this.ox=0;
      this.oy=0;
      this.cx=0;
      this.cy=0;
      this.left=0;
      this.top=0;
      this.boxleft=this.area==document?0:getPosition(this.area).x+parseInt(getStyle(this.area,"borderLeftWidth"));
      this.boxtop=this.area==document?0:getPosition(this.area).y+parseInt(getStyle(this.area,"borderTopWidth"));
      this.bw=this.area==document?browserSize().width:this.area.offsetWidth-2*parseInt(getStyle(this.area,"borderLeftWidth"));
      this.bh=this.area==document?browserSize().height:this.area.offsetHeight-2*parseInt(getStyle(this.area,"borderTopWidth"));
          // 获取拖拽对象的宽高
      this.dw=obj.offsetWidth;
      this.dh=obj.offsetHeight;
      this.mousedown();
    }      
    Drag.prototype={
     mousedown:function(){
      var that=this;
      this.obj.onmousedown=function(e){
        var ev=e||window.event;
        that.prevent(ev);
        that.ox=ev.offsetX;
        that.oy=ev.offsetY;
        that.mousemove();
        that.mouseup();
      }
     },
     mousemove:function(){
      var that=this;
      document.onmousemove=function(e){
        var ev=e||window.event;
        that.prevent(ev);
        that.cx=ev.clientX;
        that.cy=ev.clientY;
        that.left=that.cx-that.ox-that.boxleft;
        that.top=that.cy-that.oy-that.boxtop;              
          if(that.left<0){
            that.left=0;
          }
          if(that.top<0){
            that.top=0;
          }
          if(that.left>that.bw-that.dw){
            that.left=that.bw-that.dw;
          }
          if(that.top>that.bh-that.dh){
            that.top=that.bh-that.dh;
          }
          if(that.direction=="all"||that.direction=="x"){
            that.obj.style.left=that.left+"px";            
          }
          if(that.direction=="all"||that.direction=="y"){
            that.obj.style.top=that.top+"px";
          }        
      }
     },
     mouseup:function(){
      document.onmouseup=function(){
          document.onmousemove=null;
      }
     },
     prevent:function(aa){
      if(aa.preventDefault){
      aa.preventDefault();
    }else{
      aa.returnValue=false; 
    } 
     }
  }
  // 滚轮事件
  function mousewheel(obj,upfun,downfun){
      if(obj.attachEvent){
          obj.attachEvent("onmousewheel",fun); 
      }else{
      obj.addEventListener("mousewheel",fun,false);
      obj.addEventListener("DOMMouseScroll",fun,false);
      }
      function fun(e){
        var ev=e||window.event;
        if(ev.preventDefault){
          ev.preventDefault();
        }else{
          ev.returnValue=false;
        }
        var val=ev.detail||ev.wheelDelta;
        if(val==-3||val==120){
          upfun();
        }else if(val==3||val==-120){
          downfun();
        }
      }
    }
  //判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

 //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；

  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }


//鼠标移入移除事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
function getEvent(e){
   return e||window.event;
}   
// 倒计时效果
function djs(year,month,day,hour,minute,second){
    var now=new Date();
        newyear.setFullYear(year);
    newyear.setMonth(month-1);
    newyear.setDate(day);
    newyear.setHours(hour);
    newyear.setMinutes(minute);
    newyear.setSeconds(second);
    var chazhi=newyear.getTime()-now.getTime();
    var days=Math.floor(chazhi/(1000*60*60*24));
    var hours=Math.floor(chazhi/(1000*60*60))%24;
    var minutes=Math.floor(chazhi/(1000*60))%60;
    var seconds=Math.floor(chazhi/1000)%60;
    return {days:days,hours:hours,minutes:minutes,seconds:seconds};
    }