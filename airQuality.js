const airQualityApp = {};
airQualityApp.key = '13ffc7dcd70033bef04bf3edae67f6028bf0a60f'


airQualityApp.getInfo = () => {
    $.ajax({
        url: `https://api.waqi.info/feed/toronto/?token=${airQualityApp.key}`,
        method: 'GET',
        dataType: 'jsonp'
    }).then((result) => {
        console.log(result)
        requiredData = {
            no2: result.data.iaqi.no2.v,
            ozone: result.data.iaqi.o3.v,
            partMatter: result.data.iaqi.pm25.v,
            sulphurDiox: result.data.iaqi.so2.v,
        }
        airQualityApp.updateDOM(requiredData);
    })
}


//Add values to DOM
airQualityApp.updateDOM = (cityData) => {
    //adding the values to DOM
    console.log(cityData);
    $("#no2Value").html(`${cityData.no2}`);
    $("#o3Value").html(`${cityData.ozone}`);
    $("#pm25Value").html(`${cityData.partMatter}`);
    $("#so2Value").html(`${cityData.sulphurDiox}`);
}

//Evaluate data and change styling accordingly

//Add hover effects
airQualityApp.hover = () =>{
    $("#no2Value").hover(() =>{
        $("#no2Info").toggleClass("highlight");
    })
    $("#o3Value").hover(() =>{
        $("#o3Info").toggleClass("highlight");
    })
    $("#pm25Value").hover(() =>{
        $("#pm25Info").toggleClass("highlight");
    })
    $("#so2Value").hover(() =>{
        $("#so2Info").toggleClass("highlight");
    })
}

airQualityApp.init = () => {
    airQualityApp.getInfo();
    airQualityApp.hover();
}


$(document).ready(function () {
    airQualityApp.init();
})