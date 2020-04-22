const airQualityApp = {};
airQualityApp.key = '13ffc7dcd70033bef04bf3edae67f6028bf0a60f'


airQualityApp.getInfo = () => {
    $.ajax({
        url: `https://api.waqi.info/feed/toronto/?token=${airQualityApp.key}`,
        method: 'GET',
        dataType: 'jsonp'
    }).then((result) => {
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
    $("#no2Value").html(`${cityData.no2}`);
    $("#o3Value").html(`${cityData.ozone}`);
    $("#pm25Value").html(`${cityData.partMatter}`);
    $("#so2Value").html(`${cityData.sulphurDiox}`);
    // }
    
    //Evaluate data and change styling accordingly
    const pollutionHolder = Object.keys(cityData); 
    const valueHolder = Object.values(cityData);
    for (i=0; i < valueHolder.length; i++){
        if (valueHolder[i] > 300) {
            $("#" + `${pollutionHolder[i]}` + "Colour").addClass('hazardous');
        } else if (300 > valueHolder[i] && valueHolder[i] >= 200 ) {
            $("#" + `${pollutionHolder[i]}` + "Colour").addClass('veryUnhealthy');
        } else if (200 > valueHolder[i] && valueHolder[i] > 100) {
            $("#" + `${pollutionHolder[i]}` + "Colour").addClass('unhealthy');
        } else if (100 > valueHolder[i] && valueHolder[i] > 50) {
            $("#" + `${pollutionHolder[i]}` + "Colour").addClass('moderate');
        } else  {
            $("#" + `${pollutionHolder[i]}` + "Colour").addClass("healthy");
        }           
    }
}

//Add hover effects
airQualityApp.hover = () =>{
    $("#no2Colour").hover(() =>{
        $("#no2Info").toggleClass("highlight");
    })
    $("#ozoneColour").hover(() =>{
        $("#o3Info").toggleClass("highlight");
    })
    $("#partMatterColour").hover(() =>{
        $("#pm25Info").toggleClass("highlight");
    })
    $("#sulphurDioxColour").hover(() =>{
        $("#so2Info").toggleClass("highlight");
    })
}


$("#cityNameButton").on("click", function () {
    const input = $('#cityName').val();
    const searchUrl = `https://api.waqi.info/feed/${input}/?token=${airQualityApp.key}`
        $.ajax({
            url: searchUrl,
            method: 'GET',
            dataType: 'jsonp'
        }).then((result2) => {
            if (result2.status == 'error') {
                $('#cityWorking').html("Oops. That query provided no result.")
                return
            } else {
            requiredData2 = {
                no2: result2.data.iaqi.no2.v,
                ozone: result2.data.iaqi.o3.v,
                partMatter: result2.data.iaqi.pm25.v,
                sulphurDiox: result2.data.iaqi.so2.v,
            }
            airQualityApp.updateDOM2(requiredData2);
            $("#cityWorking").html(result2.data.city.name)
            $('input').val('')
            }
        })
    })

airQualityApp.updateDOM2 = (cityData2) => {
    //adding the values to DOM
    $("#no2Value2").html(`${cityData2.no2}`);
    $("#o3Value2").html(`${cityData2.ozone}`);
    $("#pm25Value2").html(`${cityData2.partMatter}`);
    $("#so2Value2").html(`${cityData2.sulphurDiox}`);


    const pollutionHolder = Object.keys(cityData2);
    const valueHolder = Object.values(cityData2);
    for (i = 0; i < valueHolder.length; i++) {
        $("#" + `${pollutionHolder[i]}` + "Colour2").removeClass();
        if (valueHolder[i] > 300) {
            $("#" + `${pollutionHolder[i]}` + "Colour2").addClass('hazardous');
        } else if (300 > valueHolder[i] && valueHolder[i] > 200) {
            $("#" + `${pollutionHolder[i]}` + "Colour2").addClass('veryUnhealthy');
        } else if (200 > valueHolder[i] && valueHolder[i] > 100) {
            $("#" + `${pollutionHolder[i]}` + "Colour2").addClass('unhealthy');
        } else if (100 > valueHolder[i] && valueHolder[i] > 50) {
            $("#" + `${pollutionHolder[i]}` + "Colour2").addClass('moderate');
        } else {
            $("#" + `${pollutionHolder[i]}` + "Colour2").addClass("healthy");
        }
    }
}

airQualityApp.init = () => {
    airQualityApp.getInfo();
    airQualityApp.hover();
}


$(document).ready(function () {
    airQualityApp.init();
})