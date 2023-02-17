import { IconButton, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import SaveIcon from "@mui/icons-material/Save"
import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { salonsState } from "./salonsState"

interface SalonsProps {
    id: number
}

export const Salon = observer(({ id }: SalonsProps) => {
    const context = useContext(salonsState)
    const salon = context.salons.find(h => h.id === id)!

    return (
        <div className="salonsBlock">
            <p>Имя салона</p>
            <TextField
                label='Имя'
                variant='outlined'
                className="inputBackground"
                disabled={context.saveState}
                value={salon.name}
                onChange={event => {
                    context.changeNameSalon(salon.id, event.target.value)
                }}
            />

            <p>Локация салона</p>
            <TextField
                label='Локация'
                variant='outlined'
                className="inputBackground"
                disabled={context.saveState}
                value={salon.location}
                onChange={event => {
                    context.changeLocationSalon(salon.id, event.target.value)
                }}
            />

            <p>Категория салона</p>
            <TextField
                label='Категория'
                variant='outlined'
                className="inputBackground"
                disabled={context.saveState}
                value={salon.category}
                onChange={event => {
                    context.changeCategorySalon(salon.id, event.target.value)
                }}
            />

            <IconButton aria-label='save'
                disabled={context.saveState}
                onClick={async () => {
                    const update = await context.updateSalon(salon.id)
                    if (update) alert("Обновление прошло успешно")
                    else alert("Не удалось обновить")
                }}
            >
                <SaveIcon />
            </IconButton>

            <IconButton aria-label='delete'
                disabled={context.saveState}
                onClick={async () => {
                    if (window.confirm("Удалить?")) {
                        const deleted = await context.deleteSalon(salon.id)
                        if (deleted) alert("Удален")
                        else alert("Не удалился")
                    }
                }}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    )
})
