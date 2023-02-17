import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { salonsState } from "./salonsState"
import { Salon } from "./Salon"
import { Button } from "@mui/material";

export const Salons = observer(() => {
    const context = useContext(salonsState)

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
