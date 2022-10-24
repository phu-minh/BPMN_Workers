const { Client, logger } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("sendEmail", async function({ task, taskService }) {
  // Put your business logic
    var nodemailer = require('nodemailer');
    
    console.log('Writing email');
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email@gmail.com',
        pass: 'xxxxxxxxxxx'
    }
    });

    var mailOptions = {
    from: '19520218@gm.uit.edu.vn',
    to: 'ichigo.bleach.006@gmail.com',
    subject: 'Sending Invoice Email by ADMICRO',
    text: 'Thanks for choosing us'
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