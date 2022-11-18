var mysql = require('mysql');
var fs = require('fs');
var xml2js = require('xml2js');
const xmlFilePath = '../Lab10/XMLFile/music.xml';

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "webservice"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

fs.readFile(xmlFilePath, 'utf8',function(err, data) {
    if (err) {
        //handle error
        console.log(err.message);
    }else{
        //process data
        //parse data to object and print out to console
        var parser = new xml2js.Parser();
        parser.parseString(data, function (err, result) {
            if (err) {  
                console.log(err.message); 
                return;
            }            ;
            var arr = (result['MusicList'])['music'];
            console.log(arr);       
            InsertDataBase(arr);  
        });
    }
});

function InsertDataBase(array) {
    array.forEach(music => {
        let sqlInsert =  "Insert into music2 (name, singer)" 
            +
            ` Values ('${music['name']}', '${music['singer']}') `;
        conn.query(sqlInsert, function(err, results) {
            if (err) throw err;
        });
    });    
    console.log('Insert Successfull!');
}


