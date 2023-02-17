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

class CarsState {
    cars: Cars[] = []
    constructor() {
        makeAutoObservable(this);
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

        runInAction(() => {
            this.cars = saonsFromApi;
        })
    }

}


export const carsState = createContext(new CarsState())
