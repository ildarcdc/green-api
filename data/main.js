console.log('Тестовое задание для Green-API');

// Global variables
const apiUrl = "https://7103.api.greenapi.com"; 
const mediaUrl =  "https://7103.api.greenapi.com"; 

var idInstance = null;
var ApiTokenInstance = null;
var answer = [];

var numberForMessage = null;
var textMessage = null;
var numberFileByUrl = null;
var fileByUrl = null;
var nameFileByUrl = null;


const mainInformation = document.querySelector("#mainInformation");
const getSettings = document.querySelector("#getSettings");
const getStateInstance = document.querySelector("#getStateInstance");
const sendMessage = document.querySelector("#sendMessage");
const sendFileByUrl = document.querySelector("#sendFileByUrl");

getSettings.addEventListener("click", getSettingsEvent);
function getSettingsEvent() {
    idInstance = $('input[name="idInstance"]').val();
    ApiTokenInstance = $('input[name="ApiTokenInstance"]').val();
    const url = "https://7103.api.greenapi.com/waInstance" + idInstance + "/getSettings/" + ApiTokenInstance;
    $.get( url, function( data ) {
        answer = JSON.stringify(data);
        console.log(data);
        $('#answerMessage').val(answer);
    });
    console.log(answer);   
}

getStateInstance.addEventListener("click", getStateInstanceEvent);
function getStateInstanceEvent() {
    idInstance = $('input[name="idInstance"]').val();
    ApiTokenInstance = $('input[name="ApiTokenInstance"]').val();
    const url = "https://7103.api.greenapi.com/waInstance" + idInstance + "/getStateInstance/" + ApiTokenInstance;
    $.get( url, function( data ) {
        answer = JSON.stringify(data);
        console.log(data);
        $('#answerMessage').val(answer);
    });
    console.log(answer);
}

sendMessage.addEventListener("click", sendMessageEvent);
async function sendMessageEvent() {
    idInstance = $('input[name="idInstance"]').val();
    ApiTokenInstance = $('input[name="ApiTokenInstance"]').val();
    const url = "https://7103.api.greenapi.com/waInstance" + idInstance + "/sendMessage/" + ApiTokenInstance;
    numberForMessage = $('input[name="numberForMessage"]').val(); 
    textMessage = $('textarea[name="textMessage"]').val();
    const data = {}
    data["chatId"] = numberForMessage + "@c.us";
    data["message"] = textMessage;
    console.log(data);
    
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      $('#answerMessage').val(JSON.stringify(json));
    } catch (error) {
      $('#answerMessage').val(JSON.stringify(json));
    } 
}

sendFileByUrl.addEventListener("click", sendFileByUrlEvent);
async function sendFileByUrlEvent() {
    idInstance = $('input[name="idInstance"]').val();
    ApiTokenInstance = $('input[name="ApiTokenInstance"]').val();
    const url = "https://7103.api.greenapi.com/waInstance" + idInstance + "/sendFileByUrl/" + ApiTokenInstance;
    numberFileByUrl = $('input[name="numberFileByUrl"]').val(); 
    fileByUrl = $('input[name="fileByUrl"]').val();

    nameFileByUrl = $('input[name="fileByUrl"]').val();
    console.log(nameFileByUrl);
    nameFileByUrl = nameFileByUrl.split('').reverse().join('');
    nameFileByUrl =  nameFileByUrl.slice(0, (nameFileByUrl.indexOf("/")));
    nameFileByUrl = nameFileByUrl.split('').reverse().join('');

    const data = {}
    data["chatId"] = numberFileByUrl + "@c.us";
    data["urlFile"] = fileByUrl;
    data["fileName"] = nameFileByUrl;
    console.log(data);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      $('#answerMessage').val(JSON.stringify(json));
    } catch (error) {
      $('#answerMessage').val(JSON.stringify(json));
    } 
}