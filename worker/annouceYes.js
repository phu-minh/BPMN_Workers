const { Client, logger } = require("camunda-external-task-client-js");
// const { Console } = require("console");

// configuration for the Client:
const config_camunda = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config_camunda);

const { Connection, Request } = require("tedious");
    // Create connection to database
const config_sql = {
    authentication: {
        options: {
        userName: "sa", // update me
        password: "Docker@123" // update me
        },
        type: "default"
    },
    server: "localhost", // update me
    options: {
        database: "admicro", //update me
        encrypt: true,
        port:1433
    }
    };

var serviceCode = "DV00";
var serviceName = "Undefined";
var price = 0;

client.subscribe("annouceYes", async function({ task, taskService }) {
  // Put your business logic
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    var cusName = task.variables.get("cusName");
    var address = task.variables.get("address");
    var zip = task.variables.get("zip");
    var city = task. variables.get("city");
    var service = task.variables.get("reqService");
    var monthRun = Number(task.variables.get("monthRun"));
    var cusName = task.variables.get("cusName");
    var address = task.variables.get("address");
    switch (service) {
        case "network":
            serviceCode = 'DV03';serviceName = 'Adnetwork'; price=20;break;
        case "booking":
            serviceCode = 'DV01';serviceName = 'Adbooking'; price=10; break;
        case "smb": 
            serviceCode = 'DV04'; serviceName = 'SMB'; price=35;break;
        case "market":
            serviceCode = 'DV02'; serviceName = 'Admarket'; price=30;break;
    }
    // console.log(serviceCode);
    // console.log(serviceName);

    var TongTienDV = price * monthRun;
    console.log(TongTienDV);
    
    const connection = new Connection(config_sql);
    connection.on("connect", err => {
      if (err) {
        console.error(err.message);
      } else {  
        queryDatabaseKhachHang(""+cusName+zip+city.slice(-3),cusName,zip,address,city,'Viet Nam');
      }
    });
    connection.connect();
    function queryDatabaseKhachHang(MaKH,TenKH,Zip,DiaChi,ThanhPho,QuocGia) {
            console.log("Adding KhachHang rows...");
            const request = new Request(
                `Insert Into KhachHang (MaKH,TenKH,Zip,DiaChi,ThanhPho,QuocGia) Values ('${MaKH}','${TenKH}','${Zip}','${DiaChi}','${ThanhPho}','${QuocGia}')`
                // Insert Into HoaDon (MaHD,MaKH,TongTien,NgayBan) Values ('${MaHD}','${MaKH}','${TongTien}','${NgayBan}')
                // Insert Into CTHD (MaHD,MaDV,SL,ThanhTien) Values ('${MaHD}','${MaDV}','${SL}','${ThanhTien}')
                ,
                 (err) => {
                  if (err) {
                      console.error(err.message);
                  } else {
                      console.log(` KhachHang Table row(s) affected`);
                      // Close connection       
                      connection.close();
                  }
              }
            );
            request.setTimeout(1000);
            connection.execSql(request);

    }

    
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
        path: 'invoice.pdf', // stream this file
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

    // complete the task
    await taskService.complete(task);
});

// console.log(config_sql);
// var connection = new Connection(config);
// connection.on("connect", err => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     queryDatabaseKhachHang();
//   }
// });
// connection.connect();
// function queryDatabaseKhachHang(TenKH,Zip,DiaChi,ThanhPho,QuocGia) {
//         console.log("Adding KhachHang rows...");
//         const request = new Request(
//             `Insert Into DichVu (TenKH,Zip,DiaChi,ThanhPho,QuocGia) Values ('${TenKH}','${Zip}','${DiaChi}','${ThanhPho}','${QuocGia}')`,
//             (err, rowCount) => {
//             if (err) {
//                 console.error(err.message);
//             } else {
//                 console.log(` KhachHang Table ${rowCount} row(s) affected`);
//                 // Close connection     
//                 connection && connection.close();
//             }
//           }
//         );
//         connection.execSql(request);
// }

// var connection = new Connection(config);
// connection.on("connect", err => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     queryDatabaseHoaDon();
//   }
// });
// connection.connect();
// function queryDatabaseHoaDon(MaHD,MaKH,TongTien,NgayBan) {
//   console.log("Adding HoaDon rows...");
//   const request = new Request(
//       `Insert Into HoaDon (MaHD,MaKH,TongTien,NgayBan) Values ('${MaHD}','${MaKH}','${TongTien}','${NgayBan}')`,
//       (err, rowCount) => {
//       if (err) {
//           console.error(err.message);
//       } else {
//           console.log(`HoaDon Table ${rowCount} row(s) affected`);
//           // Close connection     
//           connection && connection.close();
//       }
//     }
//   );
//   connection.execSql(request);
// }

// var connection = new Connection(config);
// connection.on("connect", err => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     queryDatabaseCTHD();
//   }
// });
// connection.connect();
// function queryDatabaseCTHD( MaHD,MaDV,SL,ThanhTien) {
//   console.log("Adding CTHD rows...");
//   const request = new Request(
//       `Insert Into CTHD (MaHD,MaDV,SL,ThanhTien) Values ('${MaHD}','${MaDV}','${SL}','${ThanhTien}')`,
//       (err, rowCount) => {
//       if (err) {
//           console.error(err.message);
//       } else {
//           console.log(`CTHD Table ${rowCount} row(s) affected`);
//           // Close connection     
//           connection && connection.close();
//       }
//     }
//   );
//   connection.execSql(request);
// }



// console.log(serviceCode);
// console.log(serviceName);
// console.log(price);