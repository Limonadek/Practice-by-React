import { makeAutoObservable, runInAction } from "mobx"
import { createContext } from "react"

interface Salons {
    id: number
    name: string
    location: string
    category: string
}


//делаем класс наблюдаемым(чтобы реакт умей следить за состоянием)
class SalonsState {
    loadState: 'pending' | 'success' | 'error' = 'pending'
    saveState = false;
    salons: Salons[] = []
    constructor() {
        makeAutoObservable(this) //этот метод позволяет реакту следить за состоянием класса
    }

    changeNameSalon(id: number, names: string) {
        this.salons.find(cust => cust.id === id)!.name = names; //! знак говорит typeScript что мы уверены что есть такой элемент
    }

    changeLocationSalon(id: number, location: string) {
        this.salons.find(cust => cust.id === id)!.location = location;
    }

    changeCategorySalon(id: number, category: string) {
        this.salons.find(cust => cust.id === id)!.category = category;
    }

    feathSalons = async () => {
        this.loadState = 'pending';


        //асинхронный запрос
        try {
            const response = await fetch("http://127.0.0.1:4002/salons")
            const saonsFromApi = await response.json()
            console.log(saonsFromApi)
    
            // позволяет обновить State после асинхроного запроса
            runInAction(() => {
                this.salons = saonsFromApi;
                this.loadState = 'success'
            })
        } catch (err) {
            runInAction(() => {
                this.loadState = 'error'
            })
        }
   
    }

    async createSalon() {
        // const newId = Math.max(...this.salons.map(h => Number(h.id)))
        const res = await fetch(`http://127.0.0.1:4002/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: "", location: "", category: "" })
        })

        if (res.ok) {
            const { id } = await res.json();
            this.salons.push({id, name: '', location: '', category: ''})
            return true;
            
        } else {
            return false;
        }
    }

    async updateSalon(id: number) {
        this.saveState = true

        try {
            const res = await fetch(`http://127.0.0.1:4002/update/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.salons.find(cust => cust.id === id)!)
            })
    
            runInAction(() => {
                this.saveState = false;
            })
    
            return res.ok;
        } catch (err) {
            runInAction(() => {
                this.saveState = false;
            })

            return false;
        }
    
    }


    async deleteSalon(id: number) {

        // if (window.confirm("Удалить?")) {
            const res = await fetch(`http://127.0.0.1:4002/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
                // body: JSON.stringify(salon)
            })

            if (res.ok) {

                runInAction(() => {
                    this.salons = this.salons.filter(h => h.id !== id)
                })
                return true

                // const newSalons = salons.filter(h => h.id !== salon.id)
                // setSalons(JSON.parse(JSON.stringify(newSalons)))
                // alert("Удалено")
            } else {
                return false
            }
        // }
    }
    

}


export const salonsState = createContext(new SalonsState())
