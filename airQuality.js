const airQualityApp = {};
airQualityApp.key = '13ffc7dcd70033bef04bf3edae67f6028bf0a60f'


airQualityApp.getInfo = () => {
    $.ajax({
        url: `https://api.waqi.info/feed/toronto/?token=${airQualityApp.key}`,
        method: 'GET',
        dataType: 'jsonp'
    }).then((result) => {
        console.log(result)
    })
}



airQualityApp.init = () => {
    airQualityApp.getInfo();
}


$(document).ready(function () {
    airQualityApp.init();
})