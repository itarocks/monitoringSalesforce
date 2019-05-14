const express = require('express');
const request = require('request');
var http = require('http');
const app  = express(); 

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; 
config_data = require('../../../config/config.json');

console.log("pegando do json" + config_data.url);
var token = "";
var valores = "";
var userDetails;
var options2;
var tokenBearen;
var selectCredenciamento = config_data.selectCredenciamento.substring(0,149);

var query = "SELECT+Id+,+Name+FROM+Account+Limit+10";




var dateInicial='2019-01-01T23:59:03Z';
var dateFinal='2019-01-01T23:59:03Z';

var query = `'Select+count+from+Credenciamento__c+where+CreatedDate+>=+{dateInicial}'`;

console.log("query" + query);
//select CreatedDate from Credenciamento__c
//where CreatedDate >= 2019-01-01T23:59:03Z
//and CreatedDate < 2019-02-01T23:59:03Z
//order by CreatedDate 

//select EventName__c, COUNT(Id), SUM(ProcessingTotalTime__c)
//from Queue__c
//where ProcessingTotalTime__c > 0
//and CreatedDate = TODAY
//GROUP BY EventName__c
//data example: 2019-01-01T23:59:00Z

// SELECT+EventName__c+,+COUNT(Id)+,+SUM(ProcessingTotalTime__c)+FROM+Queue__c +WHERE+ProcessingTotalTime__c+>+0+AND+CreatedDate+=+TODAYGROUP+BY+EventName__c


const url = config_data.url;

//app.get('/' , (req, res) => {
var options = {

    method: "POST",
    json:true, 
    url: url,
    headers:{
       
    }
}


function obterTokenSalesForce(){

    // Return new promise 
    return new Promise(function(resolve, reject) {
        // Do async job
        setTimeout(() => {
           request(options, function(err, resp, body) {
               if (err) {
                   reject(err);
               } else {
                   resolve((body));
               }
            }, 15000);
           })
       })
   }

   function main() {
    var initializePromise = obterTokenSalesForce();
    initializePromise.then(function(result) {
        userDetails = result.access_token;
        console.log("Initialized user details");

        var bearen = "Bearer ";
         tokenBearen = bearen.substring(0,7) +  result.access_token;
        console.log("O valor do token" + JSON.stringify(tokenBearen));
        // Use user details from here
        //console.log('teste' + JSON.stringify(userDetails));
        console.log(userDetails.access_token);
        var limit = 5;
        options2 = {
         
          method: "GET",
          //proxy: "http://proxy:8080",
          json:true, 
          url: selectCredenciamento,
          headers:{
             "Authorization": tokenBearen,
             //"Authorization": "Bearer + {userDetails}",
             "ContentType": "application/json"
          }
      }      
    }, function(err) {
        console.log(err);
    })
    var initializePromise2 = consultaInfo();
    initializePromise2.then(function(result) {
        userDetails = result;
        console.log("Initialized user requisicao");
        // Use user details from here
        //console.log('teste' + JSON.stringify(userDetails));

       console.log(userDetails);
    }, function(err) {
        console.log(err);
    })
}

function consultaInfo(){
   
    return  new Promise((resolve,reject) => {
        setTimeout(() => {
            request(options2, function(err, res, body){

                if (err) {
                    reject(err);
                } else {
                    resolve((body));
                }
        }); 
        }, 15000);
    });
}

main();

