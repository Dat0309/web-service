const sv = [
    {
        email: 'abc@gmail.com',
        pass: '123456',
        name: 'Dinh Trong Dat',
        score: 10
    },
    {
        email: 'abcd@gmail.com',
        pass: '123456',
        name: 'Dinh Trong Hieu',
        score: 9
    },
    {
        email: 'abcde@gmail.com',
        pass: '123456',
        name: 'Tran Minh Canh',
        score: 8
    },
    {
        email: 'abcdef@gmail.com',
        pass: '123456',
        name: 'Tran Khanh Du',
        score: 7
    },
]

const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/check/', (req, res) => {
    let kq = checkSinhVien(req.body)
    if(kq.check) {
        res.json(kq.sv)
    }
    else {
        res.json({error: 'Not Exists!'})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function checkSinhVien(body) {
    let kq = {check: false}
    sv.forEach(sv => {
        if (body.email === sv.email && body.pass === sv.pass)
            kq = {check: true, sv: sv}
    })
    return kq
}