const express = require('express');
const app = express();
const fs =require('fs');

app.use(express.json())

app.get('/pets', function(req, res){

    fs.readFile('./pets.json', 'utf-8', function (err, data){ 
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            console.log('error')
        }
        res.send(data)
        res.statusCode = 200;

    })
})

app.get('/pets/:id', function(req, res){

    fs.readFile('./pets.json', 'utf-8', function (err, data){ 
        res.setHeader('Content-Type', 'text/plain');

        const id = req.params.id
        const parseData = JSON.parse(data)
        if (id >= parseData.length || id < 0 ) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.send('Not Found')

        } else {
        const jsonData = JSON.stringify(parseData[id])
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.send(jsonData)

        }
    })
})

app.post('/pets', (req, res) => {

    const age = Number(req.body.age);
    const kind = req.body.kind;
    const name = req.body.name;

    fs.readFile('pets.json', 'utf-8', (err, data) => {
        if(err) {
            console.log('trash');
            process.exit(1);
        }
        const pet = {age, kind, name};
        const parsedData = JSON.parse(data);
        parsedData.push(pet);

        const petJSON = JSON.stringify(parsedData);
        res.send(petJSON);
        if(!age || !kind || !name) {
            console.log('!Age... functions check')
            res.send('Please fill out, info required')

        } else {
            fs.writeFile('pets.json', petJSON, function(err) {
                if (err) {
                    console.log('!Age writeFile functions check')
                    process.exit(1)
                }
            })
        }
    })
})

app.patch('/pets/:id', (req, res) => {
    const reqBody = req.body;
    const reqID = req.params.id;
    console.log(reqBody + ' reqBody check');
    console.log(reqID + ' reqID check');
    
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        if(err) throw err;
        const parsedData = JSON.parse(data);
        const dataID = parsedData[reqID]
        console.log(dataID.name)
        dataID.name = reqBody.name
        dataID.age = reqBody.age
        dataID.kind = reqBody.kind
        const stringData = JSON.stringify(parsedData);
        fs.writeFile('./pets.json', stringData, (err) => {
            res.status(200)
            res.contentType('application/json')
            res.send(dataID)
        })
    })
})



app.delete('/pets/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
      let parsedData = JSON.parse(data);
      parsedData.splice(id, 1)
      let JSONdata = JSON.stringify(parsedData)
      fs.writeFile('./pets.json', JSONdata, 'utf-8', (err) => {
        console.error(err)
        res.send(parsedData)
      })
    })
  })

app.listen(3000, () => {
    console.log('Listening functions check')
});
