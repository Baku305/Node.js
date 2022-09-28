import { PrismaClient } from "@prisma/client"
import express from "express"
import "express-async-errors"

const prisma = new PrismaClient()

export const app = express()

app.get("/coffee",async  (request,response) => {


 const coffee = await prisma.coffee.findMany()

 response.json(coffee)

})

