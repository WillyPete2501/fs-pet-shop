var fs = require("fs")

let subCommand = process.argv[2]
let index = process.argv[3]

if (subCommand === 'read') {
    fs.readFile('./pets.json', 'utf8', function(error, data) {
        if (error) {
            console.log("Some error");
            process.exit(1)
        }
    })
} 
if (!subCommand) {
   console.log("Please use these commands: [read | create | update | destroy]");
}
if (subCommand === 'read' && !index) {
    fs.readFile('./pets.json', 'utf8', function(error, data) {
        if (error) {
            console.log("Some error");
            process.exit(1)
        }
        else {
            let formattedData = JSON.parse(data)
            console.log(formattedData)
        }
    })
} 
else if (subCommand === 'read' && index) {
    fs.readFile('./pets.json', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
            process.exit(1)
        }

        let formattedData = JSON.parse(data)
        console.log(formattedData[index]);

if(index > formattedData.length || index < 0) {
    console.log('Not a valid input')
}
})
}
if(subCommand === 'create') {
    fs.readFile('./pets.json', 'utf-8', function (error, data) {
        if (error) {
        return console.log(error)
        }

        let age = parseInt(process.argv[3])
        let kind = process.argv[4]
       //cursed line
        let nam = process.argv[5]
        let pet = {age, kind, nam}
        let formattedData = JSON.parse(data)
        console.log(formattedData)
        formattedData.push(pet)

        let JSONpets = JSON.stringify(formattedData)

        if(!age || !kind || !nam) {
            console.log("Please fill in all pet data")
        }
        else {
            fs.writeFile('./pets.json', JSONpets, function(error, data) {
            if (error) {
                return error
            }
            })
        }
    })
    console.log('Working')
}
