const express = require('express')
const app = express()

const fs = require('fs')
var data

app.listen(5501, () => console.log('Listening at 5501'))
app.use(express.static('public'))
app.use(express.json({
    limit: '1mb'
}))


app.post('/api', (request, response) => {
    console.log(request.body.value)
    let barcode = request.body.value
    database = JSON.parse(fs.readFileSync('data.json'))
    let barcodes = []
    database.forEach(function (item) {
        barcodes.push(item.barcode)
        if (item.barcode == barcode) {

            console.log(barcodes)
            response.json({
                status: 'success',
                barcode: barcode,
                name: item.name,
                price: item.price,
                stock: item.stock
            })

        }
    })
    if (!barcodes.includes(parseInt(barcode))) {
        console.log('not found')
        response.json({
            status: 'failed',
            barcode: 'not found'
        })
        app.post('/newItem', (request, response) => {
            console.log(request.body.newName)
            let newName = request.body.newName
            let newPrice = request.body.newPrice
            let newStock = request.body.newStock
            let newBarcode = request.body.value
            let newTva = request.body.newTva
            response.json({
                status: 'success',
                barcode: newBarcode,
                name: newName,
                price: newPrice,
                stock: newStock
            })
            database.push({
                name: newName,
                price: newPrice,
                tva: newTva,
                stock: parseInt(newStock),
                barcode: newBarcode,
            })
            myString = JSON.stringify(database, null, 2)
            fs.writeFile('./data.json', myString, err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    console.log('Successfully wrote file')
                }
            })
        })
    }



    app.post('/adding', (request, response) => {
        console.log(request.body.addValue)
        amountAdded = parseInt(request.body.addValue)
        console.log(typeof amountAdded)
        response.json({
            status: 'success',
            added: amountAdded
        })

        fs.readFile('./data.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            try {
                data = JSON.parse(jsonString)


                data.forEach(function (item) {
                    let itemBarcode = item.barcode;

                    if (barcode == itemBarcode) {

                        item.stock = item.stock + amountAdded;
                        console.log(item.stock);

                        const myString = JSON.stringify(data, null, 2)
                        fs.writeFile('./data.json', myString, err => {
                            if (err) {
                                console.log('Error writing file', err)
                            } else {
                                console.log('Successfully wrote file')
                            }
                        })
                    }
                })
            } catch (err) {
                console.log('Error parsing JSON string:', err)
            }
        })
    })
})