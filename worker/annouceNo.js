const { Client, logger } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("annouceNo", async function({ task, taskService }) {
  // Put your business logic
  var nodemailer = require('nodemailer');
    
    console.log('Writing email');
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '19520218@gm.uit.edu.vn',
        pass: 'nghi@020201'
    }
    });

    var mailOptions = {
      from: '19520218@gm.uit.edu.vn',
      to: 'ichigo.bleach.006@gmail.com',
      subject: 'Thanks by ADMICRO',
      text: 'Thanks for choosing us, we hope that you will come back again.'
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
  // complete the task
  await taskService.complete(task);
});