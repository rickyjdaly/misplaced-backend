const app = require('./app');

// const fs = require('fs')
// const https = require('https')
// const path = require('path')


// const dirToServe = 'client';
// const port = 3443;


app.listen(8080, function(req, res){
    console.log('Server running...');
})


// const httpOptions = {
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
// }

// https.createServer(httpOptions, app).listen(port, function(){
//     console.log("server running on port 3443...")
// })