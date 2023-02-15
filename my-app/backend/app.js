require('dotenv').config()

const PORT = process.env.APP_PORT;
const REDIS = process.env.REDIS_PORT;

const { request } = require("express")
const { createClient } = require("redis")
const cors = require("cors")
const path = require("path") //html
const express = require("express")
const bodyParser = require("body-parser")
const salonCarchering = require("./classSalonCarchering")
const carAndBuyer = require("./classCarAndBuyer")
const { readdirSync } = require("fs")
const app = express()
const port = PORT

const client = createClient({
    url: `redis://@${process.env.REDIS_HOST ?? '127.0.0.1'}:${process.env.REDIS_PORT}`
})

client.on("error", err => console.log("Redis Client Error", err))
client.connect()

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public"))) //Он позволяет генерировать абсолютные пути, которые необходимы для передачи статических файлов

app.get("/salon/:id", async (req, res) => {
    const id = parseInt(req.params.id)

    const getHash = await client.get("salon" + String(id))

    if (getHash === null) {
        const salon = new salonCarchering.SalonCarchering()
        const result = await salon.getSalon(id)
        await client.set("salon" + String(id), JSON.stringify(result), {
            EX: 60
        })
        res.json(result)
    } else {
        res.json(JSON.parse(getHash))
    }
})

app.get("/car/:id", async (req, res) => {
    const id = parseInt(req.params.id)

    const getHash = await client.get("car" + String(id))

    if (getHash === null) {
        const car = new carAndBuyer.CarAndBuyer()
        const result = await car.getById(id)
        await client.set("car" + String(id), JSON.stringify(result), {
            EX: 60
        })
        res.json(result)
    } else {
        res.json(JSON.parse(getHash))
    }
})

app.get("/salons", async (req, res) => {
    const salon = new salonCarchering.SalonCarchering()
    const result = await salon.getSalons()
    res.json(result)
})

app.post("/create", async (req, res) => {
    const salon = new salonCarchering.SalonCarchering()
    const { name, location, category } = req.body
    const id = await salon.createSalon(name, location, category)

    res.json({ id })
})

app.post("/update/:id", async (req, res) => {
    const salon = new salonCarchering.SalonCarchering()
    const id = parseInt(req.params.id)
    const { name, location, category } = req.body
    const result = await salon.updateSalon(id, name, location, category)
    res.end(result)
})

app.delete("/delete/:id", async (req, res) => {
    const salon = new salonCarchering.SalonCarchering()
    const id = parseInt(req.params.id)
    const result = await salon.deleteSalon(id)
    res.json(result)
})

app.get("/materization", async (req, res) => {
    const car = new carAndBuyer.CarAndBuyer()
    const result = await car.getMateriz()
    res.json(result)
})

app.post("/refresh", async (req, res) => {
    const car = new carAndBuyer.CarAndBuyer()
    const result = await car.refresh()
    res.end(result)
})

app.get("/search/car", async (req, res) => {
    const car = new carAndBuyer.CarAndBuyer()
    const { brand, color, vehicle } = req.body
    const result = await car.searchThreeIndex(brand, color, vehicle)
    res.json(result)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
