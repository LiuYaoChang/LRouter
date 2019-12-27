 const http = require('http')
 const fs = require('fs')



 const app = http.createServer(function (req, res) {

   console.log('req', req.url)
   const path = '.' + req.url
  fs.stat(path, (err, stats) => {
    if (err) {
      res.end('file not exist')
    } else {
      fs.createReadStream(path).pipe(res)
    }
  })
 })


app.listen(4000, '192.168.158.75', () => {
  console.log('server Listening Port: 4000')
})
