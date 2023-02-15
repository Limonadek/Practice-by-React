import { IconButton, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import SaveIcon from "@mui/icons-material/Save"
import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
// import styles from "../../App.module.css" //импортируем файл cssthis
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
            {/* <input
                disabled={context.saveState}
                className={[styles.inputEdit, "form-control"].join(" ")}
                value={salon.name}
                onChange={event => {
                    context.changeNameSalon(salon.id, event.target.value)
                }}
                /> */}
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
            {/* <input
                disabled={context.saveState}
                className={[styles.inputEdit, "form-control"].join(" ")}
                value={salon.location}
                onChange={event => {
                    context.changeLocationSalon(salon.id, event.target.value)
                }}
            /> */}
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
            {/* <input
                disabled={context.saveState}
                className={[styles.inputEdit, "form-control"].join(" ")}
                value={salon.category}
                onChange={event => {
                    context.changeCategorySalon(salon.id, event.target.value)
                }}
            /> */}
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
            {/* <button
                disabled={context.saveState}
                onClick={async () => {
                    const update = await context.updateSalon(salon.id)
                    if (update) alert("Обновление прошло успешно")
                    else alert("Не удалось обновить")
                }}
            >
                Обновить
            </button> */}

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

            {/* <button
                disabled={context.saveState}
                onClick={async () => {
                    if (window.confirm("Удалить?")) {
                        const deleted = await context.deleteSalon(salon.id)
                        if (deleted) alert("Удален")
                        else alert("Не удалился")
                    }
                }}
            >
                Удалить
            </button> */}

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
            <p></p>
        </div>
    )
})
