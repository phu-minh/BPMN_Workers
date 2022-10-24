const { Client, logger } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;


const duedate = new Date();
duedate.setDate(duedate.getDate() + 7);
var dd = String(duedate.getDate()).padStart(2, '0');
var mm = String(duedate.getMonth() + 1).padStart(2, '0'); 
var yyyy = duedate.getFullYear();
dueday = dd + '/' + mm + '/' + yyyy;

var data = {

    // Let's add a recipient
    "client": {
        "company": "",
        "address": "",
        "zip": "",
        "city": "",
        "country": "Viet Nam"
    },

    // Now let's add our own sender details
    "sender": {
        "company": "Admicro",
        "address": "Số 1 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội",
        "zip": "ADM-1234",
        "city": "Ha Noi",
        "country": "Viet Nam"
    },
    "images": {
        logo: "https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/2940c8cd73a050ad64acd0e9dbeb99c5.png",
    },

    "information": {
        // Invoice number
        "number": "1",
        // Invoice data
        "date": today,
        // Invoice due date
        "due-date": dueday
    },

    // Now let's add some products! Calculations will be done automatically for you.
    "products": [
        {
            "month": "",
            "description": "",
            "tax-rate": "0",
            "price": 0,
        }
    ],

    "bottomNotice": "Kindly pay your invoice within 7 days.",
    "settings": {
        "currency": "USD",
    },

};

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("calPrice", async function({ task, taskService }) {
  // Put your business logic
    var easyinvoice = require('easyinvoice');
    var fs = require('fs');
    var service = task.variables.get("reqService");
    var monthRun = task.variables.get("monthRun");
    var cusName = task.variables.get("cusName");
    console.log(service);
    console.log(monthRun);
    console.log(cusName);


    data.client.company = cusName;
    data.information.date = today;
    data.information.due-date == dueday;
    data.products[0].description = service;

    /*
    easyinvoice.createInvoice(data, function (result) {
    fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
  }); */
  // complete the task
  await taskService.complete(task);
});