import { makeAutoObservable, runInAction } from "mobx"
import { createContext } from "react"

interface Salons {
    id: number
    name: string
    location: string
    category: string
}


class SalonsState {
    loadState: 'pending' | 'success' | 'error' = 'pending'
    saveState = false;
    salons: Salons[] = []
    constructor() {
        makeAutoObservable(this)
    }

    changeNameSalon(id: number, names: string) {
        this.salons.find(cust => cust.id === id)!.name = names;
    }

    changeLocationSalon(id: number, location: string) {
        this.salons.find(cust => cust.id === id)!.location = location;
    }

    changeCategorySalon(id: number, category: string) {
        this.salons.find(cust => cust.id === id)!.category = category;
    }

    feathSalons = async () => {
        this.loadState = 'pending';

        try {
            const response = await fetch("http://127.0.0.1:4002/salons")
            const salonsFromAli = await response.json()

            runInAction(() => {
                this.salons = salonsFromAli;
                this.loadState = 'success'
            })
        } catch (err) {
            runInAction(() => {
                this.loadState = 'error'
            })
        }
   
    }

    async createSalon() {
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
        const res = await fetch(`http://127.0.0.1:4002/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (res.ok) {

            runInAction(() => {
                this.salons = this.salons.filter(h => h.id !== id)
            })
            return true

        } else {
            return false
        }
    }
    

}


export const salonsState = createContext(new SalonsState())
