let express = require('express')
let app = express()

app.post('/src/pages/today/photo',function(req,res){
    
    res.send('hello world')
})