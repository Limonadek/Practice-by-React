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


//домашка сделать красиво. Типо css прописать и тд

// interface Salons {
//     id: string
//     name: string
//     location: string
//     category: string
// }

// interface Car {
//     buyerId: string
//     buyerName: string
//     buyerAge: string
//     buyerPhone: string
//     carId: string
//     carName: string
//     vehicleCondition: string
//     price: string
// }





const App = observer(() => {
    const [counter, setCounter] = useState(0) //useState- hook который создает переменную на которую react может реагировать.
    const increment = () => {
        setCounter(counter + 1)
    }

    //useContext- (хук) позволяет использовать собственный контекст
    const context = useContext(salonsState)
    const contextCar = useContext(carsState)

    // const [salons, setSalons] = useState<Salons[]>([]) //используем типизацию
    // const [cars, setCars] = useState<Car[]>([])

    useEffect(() => {
        //     // используется при монтировании компонентов(добавляется/удаляется)

        //     const feathCar = async () => {
        //         const response = await fetch("http://127.0.0.1:4000/materization")
        //         const carsFromApi = await response.json()
        //         console.log(carsFromApi)
        //         setCars(carsFromApi)
        //     }

        //     feathCar()

        context.feathSalons()
        contextCar.feathCars()
    }, []) // массив зависимости

    // если хотим несколько элементов отобразить надо '<> </>'.
    // className={styles.salonsName}- таким образом мы присоединяем класс с css файла(черточки в названии класса нельзя делать)
    //onChange- вызывается когда мы чтото вводим в input
    //JSON.parse- делается копия
    //JSON.stringify- превращает обьект в JSON

    return <RouterProvider router={router}/>
    // return (
    //     <>
    //         {/* <button onClick={increment}>Нажми!</button>
    //         <p>{counter}</p> */}

    //         <div className={styles.mainBlock}>
    //             <div className={styles.getSalons}>
    //                 <p className={styles.centerText}>GET-SALONS</p>

    //                 {/* <button
    //                     onClick={async () => {
    //                         const res = await fetch(`http://127.0.0.1:4000/create`, {
    //                             method: "POST",
    //                             headers: {
    //                                 "Content-Type": "application/json"
    //                             },
    //                             body: JSON.stringify({ name: "", location: "", category: "" })
    //                         })

    //                         if (res.ok) {
    //                             alert("Владелец создаан")
    //                             const { id } = await res.json()
    //                             salons.push({ id, name: "", location: "", category: "" })
    //                             setSalons(JSON.parse(JSON.stringify(salons)))
    //                         } else {
    //                             alert("Произошла ошибка при создании салона")
    //                         }
    //                     }}
    //                 >
    //                     Добавить Салон
    //                 </button> */}
    //                 <Salons />
    //             </div>

    //             <div className={styles.getCars}>
    //                 <p className={styles.centerText2}>GET-CARS</p>
    //                 <div>
    //                     {/* {contextCars.cars.map(salon => (
    //                         <div key={salon.id} className={styles.salonsBlock}>

    //                             <p>Имя машины</p>
    //                             <input
    //                                 className={[styles.inputEdit, 'form-control'].join(' ')}
    //                                 value={salon.name}
    //                                 onChange={event => {
    //                                     context.changeNameSalon(salon.id, event.target.value)
    //                                 }}
    //                             />
    //                         </div>
    //                     ))} */}
    //                     {/* {cars.map(car => (
    //                         <>
    //                             <span>
    //                                 {car.buyerId} - {car.buyerName} - {car.buyerAge} - {car.buyerPhone} - {car.carId} -{" "}
    //                             </span>
    //                             <input
    //                                 className={styles.inputCar}
    //                                 value={car.carName}
    //                                 onChange={event => {
    //                                     car.carName = event.target.value
    //                                     setCars(JSON.parse(JSON.stringify(cars)))
    //                                 }}
    //                             />

    //                             <span>
    //                                 {" "}
    //                                 - {car.vehicleCondition} - {car.price}
    //                             </span>
    //                             <p></p>
    //                         </>
    //                     ))} */}
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // )
})

export default App

{
    /* <button onClick={async () => {
                        for (const h of salons) {
                            const res = await fetch("http://127.0.0.1:4000/salons/updat", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(h)
                            })
                        }
                    }}></button> */
}

{
    /* <input
                                className={[styles.inputEdit, "form-control"].join(" ")}
                                value={salon.name}
                                onChange={event => {
                                    salon.name = event.target.value
                                    setSalons(JSON.parse(JSON.stringify(context.salons)))
                                }}
                            /> */
}
