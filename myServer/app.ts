import express from "express"
import "express-async-errors"

export const app = express()

app.get("/planets", (request,response) => {

 response.json([{ name: "Mercury" }, { name: "Venus" }])

})

