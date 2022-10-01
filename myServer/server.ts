import { app } from "./app"
import "dotenv/config"
import config from "./lib/config/config"

const port = config.PORT

app.listen(port, () => {

 console.log(`[server]: Server is runnig at localhost:${port}`)

})

