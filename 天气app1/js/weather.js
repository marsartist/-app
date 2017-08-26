 -/**
 * Created by zsq on 2016/11/13.
 */
//调用jsonp函数请求当前所在城市
jsonp('http://api.map.baidu.com/api?v=2.0&ak=ZRhSj3EWxyrNhgZasyZ4SUdauQX6aqpS&callback=getCity');
window.onload = function () {
    //请求天气车数据
    var search=document.getElementById("search");
    gosearch.addEventListener("click",function () {
        jsonp(createUrl()[0]);
        jsonp(createUrl()[1]);
        jsonp(createUrl()[2]);
        search.value="";
    });
    search.addEventListener('keydown', function (e){
        if (e.keyCode == 13) {
            jsonp(createUrl()[0]);
            jsonp(createUrl()[1]);
            jsonp(createUrl()[2]);
        }
    });
}

function getCity() {//以什么样的方式初始化地图

    function city(result) {
        //去掉城市名后的"市"
        var city = result.name.substring(0, result.name.length - 1);
        //请求当前城市的天气数据
        jsonp(createUrl(city)[0]);
        jsonp(createUrl(city)[1]);
        jsonp(createUrl(city)[2]);
    }
    var cityName = new BMap.LocalCity();
    cityName.get(city);
    setInterval(city,3600000);
}

// 数据请求函s数
function jsonp(url) {
    var script = document.createElement('script');
    script.src = url;
    document.body.insertBefore(script, document.body.firstChild);
    document.body.removeChild(script);

}

//数据请求成功回调函数，用于将获取到的数据放入页面相应位置
function getWeather(response) {//天气预报5~7天
    var oSpan = document.getElementsByClassName('Wdata');
    var data = response.result;
    oSpan[0].innerHTML = data[0].citynm;
    oSpan[1].innerHTML = data[0].weather;
    oSpan[2].innerHTML = data[0].temperature;//天气
    oSpan[3].innerHTML = data[0].week;
    oSpan[4].innerHTML = data[0].winp;
    oSpan[5].innerHTML = data[0].wind;
    oSpan[6].innerHTML = data[0].humidity;
    oSpan[7].innerHTML = data[0].temp_high;
    oSpan[8].innerHTML = data[0].temp_low;
    //根据返回数据，替换不同天气图片
    changeImg(response);
}

function getTodayWeather(data) {//生活指数
    var ooSpan = document.getElementsByClassName('Wdata2');
    var key;
    for (key in data.result) {
    ooSpan[0].innerHTML = data.result[key].lifeindex_kq_typenm;//??
    ooSpan[1].innerHTML = data.result[key].lifeindex_kq_attr;//??
    ooSpan[2].innerHTML = data.result[key].lifeindex_uv_typenm;//??
    ooSpan[3].innerHTML = data.result[key].lifeindex_uv_dese;//??
    ooSpan[4].innerHTML = data.result[key].lifeindex_gm_typenm;//??
    ooSpan[5].innerHTML = data.result[key].lifeindex_ct_dese;//??
    ooSpan[6].innerHTML = data.result[key].lifeindex_yd_typenm;//??
    ooSpan[7].innerHTML = data.result[key].lifeindex_yd_dese;//??
  } 
}
function getHourWeather(data){
    var oooSpan=document.getElementsByClassName("Wdata3");
    var ooooSpan=document.getElementsByClassName("Wdata4");
    var data=data.result;
    var length=data.length;
    var i,j=9,idata;
    var Dvalue;
    if(length>10){
        Dvalue=length-10;
    }
    else{
        Dvalue=0;
    }
    for(i=length-1;i>=Dvalue;i--){
        idata=data[i].uptime;
        idata=idata.split(" ")[1];
        idata=idata.slice(0,idata.length-3);

        oooSpan[j].innerHTML=idata;
        ooooSpan[j--].innerHTML=data[i].temperature;
    }
}
//根据获取到的数据更改页面中相应的图片
 function changeImg(data) {
    var weatherSummary=document.getElementsByClassName("weather-summary")[0];
    var weatid=data.result[0].weatid;
    chooseImg(weatid, weatherSummary)
 }

//选择图片
function chooseImg(weatid, weatherbox) {
    switch (weatid) {
        case '1':
            weatherbox.style.background = "url(img/太阳.svg) no-repeat 90% 5%";
            break;
        case '2':
            weatherbox.style.background = "url(img/多云.svg) no-repeat 90% 5%";
            break;
        case '3':
            weatherbox.style.background =  "url(img/阴天.svg) no-repeat 90% 5%";
            break;
        case '4':
            weatherbox.style.background =  "url(img/阵雨.svg) no-repeat 90% 5%";
            break;
        case '5':
            weatherbox.style.background =  "url(img/雷阵雨.svg) no-repeat 90% 5%";
            break;
        case '6':
            weatherbox.style.background =  "url(img/雷阵雨有冰雹.svg) no-repeat 90% 5%";
            break;
        case '7':
            weatherbox.style.background =  "url(img/雨夹雪.svg) no-repeat 90% 5%";
            break;
        case '8':
            weatherbox.style.background =  "url(img/小雨.svg) no-repeat 90% 5%";
            break;
        case '9':
            weatherbox.style.background =  "url(img/中雨.svg) no-repeat 90% 5%";
            break;
        case '10':
            weatherbox.style.background =  "url(img/大雨.svg) no-repeat 90% 5%";
            break;
        case '11':
            weatherbox.style.background =  "url(img/暴雨.svg) no-repeat 90% 5%";
            break;
        case '12':
            weatherbox.style.background =  "url(img/大暴雨.svg) no-repeat 90% 5%";
            break;
        case '13':
            weatherbox.style.background =  "url(img/特大暴雨.svg) no-repeat 90% 5%";
            break;
        case '14':
            weatherbox.style.background =  "url(img/阵雪.svg) no-repeat 90% 5%";
            break;
        case '15':
            weatherbox.style.background =  "url(img/小雪.svg) no-repeat 90% 5%";
            break;
        case '16':
            weatherbox.style.background =  "url(img/中雪.svg) no-repeat 90% 5%";
            break;
        case '17':
            weatherbox.style.background =  "url(img/大雪.svg) no-repeat 90% 5%";
            break;
        case '18':
            weatherbox.style.background =  "url(img/暴雪.svg) no-repeat 90% 5%";
            break;
        case '19':
            weatherbox.style.background =  "url(img/雾.svg) no-repeat 90% 5%";
            break;
        case '20':
            weatherbox.style.background =  "url(img/冻雨.svg) no-repeat 90% 5%";
            break;
        case '21':
            weatherbox.style.background =  "url(img/沙尘暴.svg) no-repeat 90% 5%";
            break;
        case '22':
            weatherbox.style.background =  "url(img/小雨-中雨.svg) no-repeat 90% 5%";
            break;
        case '23':
            weatherbox.style.background =  "url(img/中雨-大雨.svg) no-repeat 90% 5%";
            break;
        case '24':
            weatherbox.style.background =  "url(img/大雨-暴雨.svg) no-repeat 90% 5%";
            break;
        case '25':
            weatherbox.style.background =  "url(img/暴雨-大暴雨.svg) no-repeat 90% 5%";
            break;
        case '26':
            weatherbox.style.background =  "url(img/大暴雨-特大暴雨.svg) no-repeat 90% 5%";
            break;
        case '27':
            weatherbox.style.background =  "url(img/小雪-中雪.svg) no-repeat 90% 5%";
            break;
        case '28':
            weatherbox.style.background =  "url(img/中雪-大雪.svg) no-repeat 90% 5%";
            break;
        case '29':
            weatherbox.style.background =  "url(img/大雪-暴雪.svg) no-repeat 90% 5%";
            break;
        case '30':
            weatherbox.style.background =  "url(img/浮尘.svg) no-repeat 90% 5%";
            break;
        case '31':
            weatherbox.style.background =  "url(img/扬沙.svg) no-repeat 90% 5%";
            break;
        case '32':
            weatherbox.style.background =  "url(img/强沙尘暴.svg) no-repeat 90% 5%";
            break;
        case '33':
            weatherbox.style.background =  "url(img/霾.svg) no-repeat 90% 5%";
            break;
    }
}

//根据城市名创建请求数据及url

function createUrl() {
    var cityName = '';
    if (arguments.length == 0) {
        cityName = document.getElementById('search').value;

    } else {
        cityName = arguments[0];
    }
    //将cityname进行本地保存，以便fweather页面保持和主页面相同的城市
    localStorage.setItem("WCcity",cityName);
    var date=new Date();
    date=date.getFullYear()+"0"+(date.getMonth()+1)+date.getDate();
    var urls = [];
    urls[0] ='http://api.k780.com/?app=weather.future&appkey=27583&sign=94bd713588f762a093e433bb98cdfdbc&format=json&jsoncallback=getWeather&weaid=' + encodeURI(cityName);
    urls[1] ='http://api.k780.com/?app=weather.lifeindex&appkey=27583&sign=94bd713588f762a093e433bb98cdfdbc&format=json&jsoncallback=getTodayWeather&weaid=' + encodeURI(cityName);
    urls[2]='http://api.k780.com/?app=weather.history&appkey=27583&sign=94bd713588f762a093e433bb98cdfdbc&format=json&jsoncallback=getHourWeather&date='+date+"&weaid="+encodeURI(cityName);
    return urls;
}

