const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST ?? 'localhost',
    database: process.env.POSTGRES_DB ,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
})


class CarAndBuyer {
    constructor(buyerId, buyerName, buyerAge, buyerPhone, carId, carName, vehicleCondition, price) {
        this.buyerId = buyerId;
        this.buyerName = buyerName;
        this.buyerAge = buyerAge;
        this.buyerPhone = buyerPhone;
        this.carId = carId;
        this.carName = carName;
        this.vehicleCondition = vehicleCondition;
        this.price = price;
    }

    // поиск по двум индексам
    async getMateriz() {
        try {
            const res = await pool.query("select * from car_and_buyer where buyer_age > 30 and vehicle_condition = 'new';");
            const arrayCarAndBuyer = [];

            for (let i = 0; i < res.rows.length; i++) {
                const arr = new CarAndBuyer(res.rows[i].buyer_id, res.rows[i].buyer_name, res.rows[i].buyer_age, res.rows[i].buyer_phone, res.rows[i].car_id, res.rows[i].car_name, res.rows[i].vehicle_condition, res.rows[i].price)
                arrayCarAndBuyer.push(arr);
            }

            return arrayCarAndBuyer;    
        } catch (error) {
            console.log(error);
        }
    }

    async refresh() {
        try {
            await pool.query('refresh materialized view concurrently car_and_buyer;')
            return 'ok';
        } catch(error) {
            console.log(error);
        }
    }   

    async searchThreeIndex(brand, color, vehicle) {
        try {
            const res = await pool.query("select car_id, car_name, car_name, car_brand, car_color, vehicle_condition, price from car where car_brand = $1 and car_color = $2 and vehicle_condition = $3; ", [brand, color, vehicle])
            
            return res.rows;
        } catch(error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const res = await pool.query('SELECT * FROM car where car_id = $1', [id]);
            return res.rows;
        } catch(error) {
            console.log(error);
        }
    }
}


module.exports = {
    CarAndBuyer
}
