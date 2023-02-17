const { Pool } = require("pg")

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST ?? 'localhost',
    database: process.env.POSTGRES_DB ,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
})

class SalonCarchering {
    constructor(id, name, location, category) {
        this.id = id
        this.name = name
        this.location = location
        this.category = category
    }

    async getSalon(id) {
        try {
            const res = await pool.query("SELECT * FROM salon_carsharing where id = $1", [id])
            return res.rows[0]
        } catch (error) {
            console.log(error)
        }
    }

    async getSalons() {
        try {
            await pool.query("SELECT pg_sleep(1)")
            const res = await pool.query("SELECT * FROM salon_carsharing" )

            const arraySalon = []

            for (let i = 0; i < res.rows.length; i++) {
                const arr = new SalonCarchering(
                    res.rows[i].id,
                    res.rows[i].name_salon,
                    res.rows[i].location_salon,
                    res.rows[i].salon_category
                )
                arraySalon.push(arr)
            }
            return arraySalon
        } catch (error) {
            console.log(error)
        }
    }

    async createSalon(name, location, category) {
        try {
            const {rows} = await pool.query(
                "INSERT INTO salon_carsharing(name_salon, location_salon, salon_category) VALUES($1, $2, $3) returning id",
                [name, location, category]
            )

            return rows[0].id
        } catch (error) {
            console.log(error)
        }
    }

    async updateSalon(id, name, location, category) {
        try {
            await pool.query("SELECT pg_sleep(2)")
            await pool.query(
                "UPDATE salon_carsharing SET name_salon  = $1, location_salon = $2, salon_category = $3 WHERE id = $4",
                [name, location, category, id]
            )

            const check = await pool.query("SELECT * FROM salon_carsharing WHERE id = $1", [id])

            if (check === undefined) {
                return "error"
            }

            return "ok"
        } catch (error) {
            console.log(error)
        }
    }

    async deleteSalon(id) {
        try {
            await pool.query("UPDATE car SET fk_id = null WHERE fk_id = $1 returning fk_id;", [id])
            await pool.query("DELETE FROM salon_carsharing WHERE id = $1;", [id])

            return "ok"
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    SalonCarchering
}
