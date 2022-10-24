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
    subject: 'Sending Invoice Email by ADMICRO',
    text: 'Thanks for choosing us',
    attachments: [
      {   // file on disk as an attachment
          filename: 'invoice.pdf',
          path: 'worker/invoice.pdf', // stream this file
          contentType: 'application/pdf'
      }]
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
