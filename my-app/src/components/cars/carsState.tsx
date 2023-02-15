import { makeAutoObservable, runInAction } from "mobx"
import { createContext } from "react"

interface Cars {
    id: string
    buyerId: string
    buyerName: string
    buyerAge: string
    buyerPhone: string
    carId: string
    carName: string
    vehicleCondition: string
    price: string
}

//делаем класс наблюдаемым(чтобы реакт умей следить за состоянием)
class CarsState {
    cars: Cars[] = []
    constructor() {
        makeAutoObservable(this) //этот метод позволяет реакту следить за состоянием класса
    }

    changeBuyerName(id: string, buyerName: string) {
        this.cars.find(cust => cust.id === id)!.buyerName = buyerName;
    }

    changeBuyrAge(id: string, buyerAge: string) {
        this.cars.find(cust => cust.id === id)!.buyerAge = buyerAge;
    }

    changeBuyePhone(id: string, buyerPhone: string) {
        this.cars.find(cust => cust.id === id)!.buyerPhone = buyerPhone;
    }

    changeCarName(id: string, carName: string) {
        this.cars.find(cust => cust.id === id)!.carName = carName;
    }

    changevehicleCondition(id: string, vehicleCondition: string) {
        this.cars.find(cust => cust.id === id)!.vehicleCondition = vehicleCondition;
    }

    changeCarPrice(id: string, price: string) {
        this.cars.find(cust => cust.id === id)!.price = price;
    }

    feathCars = async () => {
        const response = await fetch("http://127.0.0.1:4002/materization")
        const saonsFromApi = await response.json()
        console.log(saonsFromApi)

        runInAction(() => {
            this.cars = saonsFromApi;
        })
    }

    // changeLocationSalon(id: string, location: string) {
    //     this.salons.find(cust => cust.id === id)!.location = location;
    // }

    // changeCategorySalon(id: string, category: string) {
    //     this.salons.find(cust => cust.id === id)!.category = category;
    // }


}


export const carsState = createContext(new CarsState())
