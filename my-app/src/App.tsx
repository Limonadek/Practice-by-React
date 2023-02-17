import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { salonsState } from "./components/salons/salonsState"
import { carsState } from "./components/cars/carsState"
import {Salons} from "./components/salons/Salons";

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";


const Index = () => {
    return (
        <>
            <a href="/salons">Перейти к салонам</a>
            <p>Привет реакт</p>
        </>
    )
    
}


const router = createBrowserRouter([
{
    path: "/",
    element: <Index />,
},
{
    path: '/salons',
    element: <Salons />
}
]);



const App = observer(() => {

    const context = useContext(salonsState)
    const contextCar = useContext(carsState)

    useEffect(() => {
        context.feathSalons()
        contextCar.feathCars()
    }, []) 

    return <RouterProvider router={router}/>
})

export default App