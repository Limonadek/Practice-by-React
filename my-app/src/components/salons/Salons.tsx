import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
// import styles from "./App.module.css" //импортируем файл cssthis
// import styles2 from 'salon.module.css';
import { salonsState } from "./salonsState"
import { Salon } from "./Salon"
import { Button } from "@mui/material";

export const Salons = observer(() => {
    const context = useContext(salonsState)

    //условный рендеринг
    return (
        <>
            {context.loadState === "pending" && (
                <div className="loaderWrapper">
                    <div className="loader">
                    </div>
                    <p>Идет загрузка...</p>
                </div>
            )}

            {context.loadState === 'error' && (
                <>
                    <span>Произошла ошибка при загрузке...</span>
                    <button
                        onClick={async () => {
                            await context.feathSalons()
                        }}
                    >
                        Повторить загрузку
                    </button>
                </>
            )}

{context.loadState === "success" && (
                <>
                    {/* <button

                        //с помощью disable отключаем кнопку создать
                        disabled={context.saveState}

                        onClick={async () => {
                            const created = await context.createSalon()
                            if (created) alert("Владелец создан")
                            else alert("Произошла ошибка")
                        }}
                    >
                        Создать
                    </button> */}

                    {context.salons.map(salon => (
                        <Salon
                            key={salon.id}
                            id={salon.id}
                        />
                    ))}
                    {context.saveState && <p>Идет сохранение...</p>}
                    <Button variant="contained"
                        disabled={context.saveState}

                        onClick={async () => {
                            const created = await context.createSalon()
                            if (created) alert("Владелец создан")
                            else alert("Произошла ошибка")
                        }}
                    >
                        Создать
                    </Button>
                </>
            )}
        </>
    )
})
