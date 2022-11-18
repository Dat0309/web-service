const express = require('express')
const mysql = require('mysql')
const { create } = require('xmlbuilder2')
const fs = require('fs')

const app = express()
const port = 3000

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "webservice"
});

con.connect(function (err) {
    if (err) throw err;
    var sql = "SELECT * FROM music";
    con.query(sql, function (err, results) {
        if (err) throw err;
        writeXMLFile(results)
    })
});

function writeXMLFile(results) {
    let req_name = 'music';   

    const root = create({ version: '1.0', encoding: "UTF-8", standalone: "yes" }).ele('MusicList')    
    
    results.forEach(item => {
        root.ele('music')
        .ele('id').txt(item.id).up()
        .ele('name').txt(item.name).up()
        .ele('singer').txt(item.singer).up()
        
    });

    const xml = root.end({ prettyPrint: true });
     console.log(xml);
    let full_file_name = "./XMLFile/" + req_name + ".xml";
    fs.writeFileSync(full_file_name, xml, function(err) {
        if (err) throw err;
    });
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

