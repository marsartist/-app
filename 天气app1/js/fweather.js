jsonp('http://api.map.baidu.com/api?v=2.0&ak=ZRhSj3EWxyrNhgZasyZ4SUdauQX6aqpS&callback=getCity');
function getCity() {//以什么样的方式初始化地图

    function city(result) {
        //去掉城市名后的"市"
        var city = result.name.substring(0, result.name.length - 1);
        //请求当前城市的天气数据
        jsonp(createUrl(city)[0]);
        jsonp(createUrl(city)[1]);
    }
    var cityName = new BMap.LocalCity();
    cityName.get(city);
}

// 数据请求函s数
function jsonp(url) {
    var script = document.createElement('script');
    script.src = url;
    document.body.insertBefore(script, document.body.firstChild);
    document.body.removeChild(script);

}
function getWeather(response){//天气预报5~7天
    var fspan=document.getElementsByClassName("futureItem");
    var data=response.result;
    var length=fspan.length;
    var fspanchild;
    for(i=0;i<length;i++){
        fspanchild=fspan[i].getElementsByClassName("fdata");
        fspanchild[0].innerHTML=data[i+1].days;//日期
        fspanchild[1].innerHTML=data[i+1].citynm;//城市
        fspanchild[2].innerHTML=data[i+1].weather;//天气
        fspanchild[3].innerHTML=data[i+1].temperature;//溫度
        fspanchild[4].innerHTML=data[i+1].temp_high;//最高溫度
        fspanchild[5].innerHTML=data[i+1].temp_low;//最低溫度
        fspanchild[6].innerHTML=data[i+1].wind;//風向
        fspanchild[7].innerHTML=data[i+1].winp;//風力
    }
}
function getTodayWeather(data){//生活指数
    // 日期的json数据有问题
    var fspan=document.getElementsByClassName("futureItem");
    var length=fspan.length;
    var i=0;
    var key;
    var date=new Date();
    date=date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+date.getDate();
    for(key in data.result){
        if(key.localeCompare(date)!=0){
            var fspanchild=fspan[i].getElementsByClassName("fdata1");
            fspanchild[0].innerHTML=data.result[key].lifeindex_uv_dese;
            fspanchild[1].innerHTML=data.result[key].lifeindex_gm_dese;
            fspanchild[2].innerHTML=data.result[key].lifeindex_ct_dese;
            i++;
        }
    }
}
function createUrl() {
    var cityName = '';
    cityName=localStorage.getItem("WCcity");
    var date=new Date();
    date=date.getFullYear()+"0"+(date.getMonth()+1)+date.getDate();
    var urls = [];
    urls[0] = 'http://api.k780.com/?app=weather.future&appkey=27583&sign=94bd713588f762a093e433bb98cdfdbc&format=json&jsoncallback=getWeather&weaid=' + encodeURI(cityName);
    urls[1] = 'http://api.k780.com/?app=weather.lifeindex&appkey=27583&sign=94bd713588f762a093e433bb98cdfdbc&format=json&jsoncallback=getTodayWeather&weaid=' + encodeURI(cityName);
    return urls;
}
