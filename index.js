const startParser = require("./modules/parser")
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
const fs = require('fs')

function startProc(){
  let output = './currentBrand.json';
fs.unlink(output, function(err){
  if (err) {
      console.log(err);
  } else {
      console.log("Файл удалён");
  }
});
}

const express = require('express')
const app = express()
const port = 3000
const path = require('path');

startProc()

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.post('/ReqApi',jsonParser,(req,res)=>{ //Отправляю запрос из формы и ожидаю данные start(query)
 data = req.body;
 res.send(data)
 console.log(data)
  console.log('ok')
  
  try{
  startParser(data.query)
  }catch{
    startParser(data.query)
  }
 
})

app.get('/ResApiBrand', (req, res) => {

  res.sendFile(`${__dirname}/currentBrand.json`);//отправляю json с брендами reloadMassiv
 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})