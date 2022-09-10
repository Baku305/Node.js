import express from "express"
import "express-async-errors"

export const app = express()

app.get("/", (request,response) => {

 response.send("Up and runnig and updated!")

})

