const { Client, logger } = require("camunda-external-task-client-js");
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("calPrice", async function({ task, taskService }) {
    // Put your business logic
    var reqService = task.variables.get('reqService');
    var monthRun = task.variables.get('monthRun');
    var startMonth = task.variables.get('startMonth');
    var serviceCode ;

    switch (reqService) {
        case 'network':
            serviceCode = 'DV03'; break;
        case 'booking':
            serviceCode = 'DV01'; break;
        case 'smb': 
            serviceCode = 'DV04'; break;
        case 'market':
            serviceCode = 'DV02'; break;
    }

    

    const { Connection, Request } = require("tedious");
    // Create connection to database
    const config = {
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
    const connection = new Connection(config);

    // Attempt to connect and execute queries if connection goes through
    connection.on("connect", err => {
    if (err) {
        console.error(err.message);
    } else {
        queryDatabase();
    }
    });

    connection.connect();

    function queryDatabase() {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
        `SELECT * from DichVu where MaDV= '%1$s'`.format(serviceCode),
        (err, rowCount) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`${rowCount} row(s) returned`);

            // Close connection     
            connection.close();
        }
        }
    );

    request.on("row", columns => {
        columns.forEach(column => {
        console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
    }


  // complete the task
  await taskService.complete(task);
});