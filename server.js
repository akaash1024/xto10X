require("dotenv").config()
const express = require("express")
const connectDB = require("./database/db")

const app = express()








const PORT = process.env.PORT
// ! server calling
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is lietning at http://localhost:3000/`)
    })
})
