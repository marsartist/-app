// (function(){
// 	var btnleft=document.getElementById("btnleft");
// 	var navshow=document.getElementsByTagName("nav")[0];
// 	var navshowStyle;
// 	if(window.getComputedStyle){
// 		navshowStyle=window.getComputedStyle(navshow);
// 	}
// 	else{
// 		navshowStyle=navshow.currentStyle;//IE
// 	}
// 	// alert(navshowStyle);
// 	btnleft.addEventListener("click",function(){
// 		if(navshowStyle.display=="none"){
// 		navshow.setAttribute("class",'show');
// 		}
// 		else{
// 			navshow.removeAttribute("class");
// 		}

// 	})
// })();
//获取设备的宽高
//  (function(){
// 	// var body=document.body;
// 	// if(body.currentStyle){
// 	// 	var style=body.currentStyle;
// 	// }
// 	// else{
// 	// 	var style= window.getComputedStyle(body,null);
// 	// }
// 	// style.width=;
// 	// style.height;
// 	var stylesheets=document.styleSheets;
// 	var body=document.body;
// 	var styleComputer;
// 	if(stylesheets[0].cssRules){
// 		var rules=stylesheets[0].cssRules;
// 	}
// 	else{
// 		var rules=stylesheets.rules;
// 	}
// 	if(body.currentStyle){
// 		styleComputer=body.currentStyle;
// 	}
// 	else
// 	{
// 		styleComputer=window.getComputedStyle(body,null);
// 	}
// 	// rules[5].style.width=parseInt(styleComputer.clientWidth)+"px";
// 	// rules[5].style.height=parseInt(styleComputer.clientHeight)+"px";
// 	alert(rules[5].style.width);
// 	alert(rules[5].style.height);
// })();

(function(){
	var futurecont=document.getElementsByClassName("futurecont");
	var ItemBox=document.querySelectorAll(".futureItem>.ItemBox");
	var spanbtn=document.querySelectorAll(".futureItem>.fdata");
	var i;
	var length=spanbtn.length;
	for(i=0;i<length;i++){
		(function(i){
			futurecont[0].addEventListener('click',function(event){
				var arr;
				if(spanbtn[i]==event.target){
					if(ItemBox[i].className.indexOf("active")!=-1)
						{	
							arr=ItemBox[i].className.split(" ");
							if(arr[0]=="active"){
								ItemBox[i].className=arr[1];
							}
							else{
								ItemBox[i].className=arr[0];
							}
						}
						else
							{
								ItemBox[i].className+=" active";
							}
				}
				else{
					if(ItemBox[i].className.indexOf("active")!=-1){
						arr=ItemBox[i].className.split(" ");
						if(arr[0]=="active"){
							ItemBox[i].className=arr[1];
						}
						else{
							ItemBox[i].className=arr[0];
						}
					}
				}
			});
		})(i);
	}        
})();
(function(){
	var read=document.getElementById("read");
	var save=document.getElementById("save");
	var formContext=document.getElementById("form-context");
	var dairycontext=document.getElementById("dairycontext");
	var emotianvalue=document.getElementById("emotianvalue");
	var sectionOne=document.getElementById("sectionOne");
	var emotionPage=document.getElementById("emotionPage");
	save.addEventListener("click",function(){
		var date=new Date();
		var arr={};
		var Id="WE"+date.getTime();
		date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		arr.date=date;
		arr.emotianvalue=emotianvalue.value;
		arr.dairycontext=dairycontext.value;
		if(arr.dairycontext==""){
			alert("你轻轻的来,不带走一片云彩");
		}
		else{
		arr=JSON.stringify(arr);
		localStorage.setItem(Id,arr);
		if(localStorage.getItem(Id)){
			alert("保存成功");
			dairycontext.value="";
			emotianvalue.value="#000000";
		}
	}
	})
	// 获取数据
	function getdatas() {
		sectionOne.innerHTML="";
		for(var i=0;i<localStorage.length;i++)
		{
			var key=localStorage.key(i);
			if(key.indexOf("WE")!=-1){
				var data=localStorage.getItem(key);
				data=JSON.parse(data);
				var div=document.createElement("div");
				var span1=document.createElement("span");
				var span2=document.createElement("span");
				var p=document.createElement("p");
				var svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
				var path=document.createElementNS("http://www.w3.org/2000/svg","path");
				svg.setAttribute("viewBox","0 0 1024 1024");
				svg.setAttribute("width","32");
				svg.setAttribute("height","32");
				path.setAttribute("d","M651.264 238.933333c-53.4528 0-103.150933 26.8288-135.850667 71.031467C482.7136 265.728 433.015467 238.933333 379.562667 238.933333 283.204267 238.933333 204.8 324.642133 204.8 430.011733c0 62.839467 28.091733 106.939733 50.653867 142.336 65.604267 102.912 230.5024 230.980267 237.499733 236.373334 6.724267 5.2224 14.609067 7.816533 22.459733 7.816533 7.850667 0 15.701333-2.594133 22.4256-7.816533 6.997333-5.393067 171.9296-133.461333 237.533867-236.3392 22.562133-35.4304 50.653867-79.530667 50.653867-142.370134C826.026667 324.608 747.6224 238.933333 651.264 238.933333z");
				path.setAttribute("fill",data.emotianvalue);
				span2.innerText=data.date;
				p.innerText=data.dairycontext;
				div.className="diary-item";
				svg.appendChild(path);
				span1.appendChild(svg);
				div.appendChild(span1);
				div.appendChild(span2);
				div.appendChild(p);
				sectionOne.appendChild(div);

			}
		}
	}
	emotionPage.onload=getdatas;
	read.addEventListener("click",getdatas);
	
	var sectionone=document.getElementById("sectionOne");
	var pageX,moveendX,Dx;
	sectionOne.addEventListener("touchstart",function(e){
		var diaryItems=document.getElementsByClassName("diary-item");
		pageX=e.touches[0].pageX;
		for(var i=0;i<diaryItems.length;i++){
			if(e.target==diaryItems[i]){
				(function(i){
				diaryItems[i].addEventListener("touchmove",function(et){
					moveendX=et.changedTouches[0].pageX;
					Dx=moveendX-pageX;
					diaryItems[i].style.left=Dx+"px";
					diaryItems[i].addEventListener("touchcancel",function(ee){
							diaryItems[i].style.left=0+"px";
						});
					if(Dx<-12){
//						var returned=confirm("除却巫山不是云");
//						if(returned){
							var spans=diaryItems[i].getElementsByTagName("span");
							var re=/[^0-9]/g;
							var timespanValue=new String(spans[1].innerText).replace(re,"").trim();
							//添加动画效果 未实现
							//diaryItems[i].className="diary-item removeDiaryitem";
							for(var j=0;j<localStorage.length;i++){
								var keyVal=localStorage.key(i);
								var keyOval=keyVal;
								if(keyVal.indexOf("WE")!=-1){
									keyVal=keyVal.slice(2,keyVal.length);
									keyVal=parseInt(keyVal);
									var keyTime=new Date(keyVal);
									keyTime=keyTime.getFullYear()+""+(keyTime.getMonth()+1)+""+keyTime.getDate()+""+keyTime.getHours()+""+keyTime.getMinutes()+""+keyTime.getSeconds();;
									keyTime=new String(keyTime).trim();
									if(timespanValue.localeCompare(keyTime)==0){
										localStorage.removeItem(keyOval);
										window.location.reload();
										sectionone.removeChild(diaryItems[i]);
									}
								}
							}	
					}
					
//					}
				});}
				)(i);
			}
		}
	});
	
})();
// 排序
(function(){
	var timesort=document.getElementById("timesort");
	var colorsort=document.getElementById("colorsort");
	var object=[];
	var j=0;
	function Rebulidarr(){
		for(i=0;i<localStorage.length;i++){
			var key=localStorage.key(i);
			if(key.indexOf("WE")!=-1){
				var data=localStorage.getItem(key);
				data=JSON.parse(data);
				object[j++]=data;
			}
		}
	}
	Rebulidarr();
	var Dflag=0;
	var Cflag=0;
	function datesort(a,b){
		var a=new String(a.date);
		var b=new String(b.date);
		var re=/[^0-9]/g;
		a=a.replace(re,"");
		b=b.replace(re,"");
		a=parseInt(a);
		b=parseInt(b);
		if(a>b){
			return 1;
		}
		else{
			return -1;
		}
	}
	function datereverse(a,b){
		var a=new String(a.date);
		var b=new String(b.date);
		var re=/[^0-9]/g;
		a=a.replace(re,"");
		b=b.replace(re,"");
		a=parseInt(a);
		b=parseInt(b);
		if(a>b){
			return -1;
		}
		else{
			return 1;
		}
	}
	function Sedinsert(arr){
	var sectionOne=document.getElementById("sectionOne");
		sectionOne.innerHTML="";
		for(var i=0;i<arr.length;i++){
				var div=document.createElement("div");
				var span1=document.createElement("span");
				var span2=document.createElement("span");
				var p=document.createElement("p");
				var svg=document.createElementNS("http://www.w3.org/2000/svg","svg");
				var path=document.createElementNS("http://www.w3.org/2000/svg","path");
				svg.setAttribute("viewBox","0 0 1024 1024");
				svg.setAttribute("width","32");
				svg.setAttribute("height","32");
				path.setAttribute("d","M651.264 238.933333c-53.4528 0-103.150933 26.8288-135.850667 71.031467C482.7136 265.728 433.015467 238.933333 379.562667 238.933333 283.204267 238.933333 204.8 324.642133 204.8 430.011733c0 62.839467 28.091733 106.939733 50.653867 142.336 65.604267 102.912 230.5024 230.980267 237.499733 236.373334 6.724267 5.2224 14.609067 7.816533 22.459733 7.816533 7.850667 0 15.701333-2.594133 22.4256-7.816533 6.997333-5.393067 171.9296-133.461333 237.533867-236.3392 22.562133-35.4304 50.653867-79.530667 50.653867-142.370134C826.026667 324.608 747.6224 238.933333 651.264 238.933333z");
				path.setAttribute("fill",arr[i].emotianvalue);
				span2.innerText=arr[i].date;
				p.innerText=arr[i].dairycontext;
				div.className="diary-item";
				svg.appendChild(path);
				span1.appendChild(svg);
				div.appendChild(span1);
				div.appendChild(span2);
				div.appendChild(p);
				sectionOne.appendChild(div);
			}
	}
	timesort.addEventListener("click",function(){
			if(Dflag==0){
				object.sort(datesort);
				Sedinsert(object);
				Dflag=1;
			}
			else{
				object.sort(datereverse);
				Sedinsert(object);
				Dflag=0;
			}

	});
	// 颜色排序
	function colorVsort(a,b){
		if(a.emotianvalue.localeCompare(b.emotianvalue)!=-1){
			return 1;
		}	
		else{
			return -1;
		}
	}
	function colorReverse(a,b){
		if(a.emotianvalue.localeCompare(b.emotianvalue)!=-1){
			return -1;
		}	
		else{
			return 1;
		}
	}
	colorsort.addEventListener("click",function(){
		if(Cflag==0){
				object.sort(colorVsort);
				Sedinsert(object);
				Cflag=1;
			}
			else{
				object.sort(colorReverse);
				Sedinsert(object);
				Cflag=0;
			}
	});
})();
