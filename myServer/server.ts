import { app } from "./app"
import "dotenv/config"

const port = process.env.PORT

app.listen(port, () => {

 console.log(`[server]: Server is runnig at localhost:${port}`)

})

