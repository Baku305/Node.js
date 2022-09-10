
import express from "express"
import "express-async-errors"

const app = express()

app.get("/", (request,response) => {

 response.send("Up and runnig!")

})

const port = 3000

app.listen(port, () => {

 console.log(`[server]: Server is runnig at localhost:${port}`)

})

