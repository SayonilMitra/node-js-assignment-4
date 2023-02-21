const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

// process request body data
function processData(reqBody) {
    let data = JSON.stringify(reqBody)
    let dataItems = data.split(',')
    let nums = {
        num1: parseFloat(dataItems[0].split(':')[1]),
        num2: parseFloat(dataItems[1].split(':')[1][0])
    }

    return nums
}

app.get('/', (req, res) => {
    res.end('Hello World!')
})

app.post('/add', (req, res) => {
    let { num1, num2 } = processData(req.body)
    res.end(JSON.stringify({
        status: "success",
        message: "the sum of given two numbers",
        sum: num1 + num2
    }))
})

app.post('/sub', (req, res) => {
    let { num1, num2 } = processData(req.body)
    res.end(JSON.stringify({
        status: "success",
        message: "the difference of given two numbers",
        sum: num1 - num2
    }))
})

app.post('/multiply', (req, res) => {
    let { num1, num2 } = processData(req.body)
    res.end(JSON.stringify({
        status: "success",
        message: "The product of given numbers",
        sum: num1 * num2
    }))
})

app.post('/divide', (req, res) => {
    let { num1, num2 } = processData(req.body)
    if (num2 === 0) {
        res.end(JSON.stringify({
            status: "error",
            message: "Cannot divide by zero"
        }))
    } else {
        res.end(JSON.stringify({
            status: "success",
            message: "the difference of given two numbers",
            sum: num1 - num2
        }))
    }

})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;