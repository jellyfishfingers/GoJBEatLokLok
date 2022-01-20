$(document).ready(function(){
$.ajaxSetup({
    async: false
});

var currentdate = new Date();
debugger;
var currentdateJS = dayjs();

goJBEatLokLok(getURL());
beforeCovid(currentdate, getURL());

function dateDisplay(date)
{
  return date.getDate() + "/"+  (parseInt(date.getMonth())+ 1)
  + "/" + date.getFullYear() + " "  
  + date.getHours() + ":"  
  + date.getMinutes() 
}

$(".date").html(dateDisplay(currentdate));

function getURL(parameters)
{ 
  var getTrafficImageURI = "https://api.data.gov.sg/v1/transport/traffic-images";
  return getTrafficImageURI;
}

function goJBEatLokLok(requestURL) {         
  $.getJSON(requestURL , function(data) { 
      console.log("Singapore");
      console.log(data.items[0].cameras[12].camera_id);
      
      var image = "";
      
      $.each(data.items[0].cameras, function (key,value){
          //Get only Camera 2701's Data: Causeway Camera.
          if (data.items[0].cameras[key].camera_id === "2701"){
              image = data.items[0].cameras[key].image;
            
              $(".currentWoodlandsCausewayTraffic").append("<img src='" + image + "' width='640px'>");
          }    
      });

  });
}

function dateNumbersToString(number)
{
  let convertedString = number.toString();
  if (convertedString.length == 1)
  {
    convertedString = "0" + convertedString 
  }

  return convertedString;
}

function beforeCovid(requestDate, requestURL) {
    let parameter = "?date_time=2019-" + dateNumbersToString(requestDate.getMonth()+1)+ "-" + dateNumbersToString(requestDate.getDate()) + "T";
    parameter = parameter + dateNumbersToString(requestDate.getHours()) + "%3A" + dateNumbersToString(requestDate.getMinutes()) + "%3A" + dateNumbersToString(requestDate.getSeconds()); 

    requestURL = requestURL + parameter;    
    //"https://api.data.gov.sg/v1/transport/traffic-images?date_time=2020-10-05T10%3A05%3A05"
    debugger;

    $.getJSON(requestURL , function(data) { 
        console.log(data.items[0].cameras[12].camera_id);
        
        var image = "";
        
        $.each(data.items[0].cameras, function (key,value){
            //Get only Camera 2701's Data: Causeway Camera.
            if (data.items[0].cameras[key].camera_id === "2701"){
                image = data.items[0].cameras[key].image;
              
                $(".beforeCovid19").append("<img src='" + image + "' width='640px'>");
            }    
        });

    });
}

});
