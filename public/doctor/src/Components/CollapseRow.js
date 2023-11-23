import React, { useState } from 'react'
import { VSpacer } from './VSpacer'

export const CollapseRow = ({width, addAppointment}) => {

    const innerVSpace = 15
    const innerHSpace = 5

    const [id, setID] = useState("")
    const [fecha, setFecha] = useState("")
    const [lugar, setLugar] = useState("")
    const [hora, setHora] = useState("")
    const [message, setMessage] = useState("")

    const onClickFunc = () => {
        if(id && fecha && lugar){
            addAppointment(id, fecha, lugar, hora, setID, setFecha, setLugar, setHora, setMessage)
        }
        else {
            setMessage("Rellena todos los campos")
        }
    }

    return (
        <div className="card" style={{width}}>
            <div className="card-body">
                <h4 className="card-title">Informaciond de la cita:</h4>
            </div>
            <div className='p-3 d-flex align-items-center'>
                <h6>ID paciente: &emsp;</h6>
                <input type='text' value={id} onChange={(e)=>{ setID(e.target.value) }}/>
            </div>
            <div className='p-3 d-flex align-items-center'>
                <h6>Fecha: &emsp;</h6>
                <input type='date' value={fecha} onChange={(e)=>{ setFecha(e.target.value) }}/>
            </div>
            <div className='p-3 d-flex align-items-center'>
                <h6>Hora: &emsp;</h6>
                <input type='time' value={hora} onChange={(e)=>{ setHora(e.target.value) }}/>
            </div>
            <div className='p-3 d-flex align-items-center'>
                <h6>Lugar: &emsp;</h6>
                <input type='text' value={lugar} onChange={(e)=>{ setLugar(e.target.value) }}/>
            </div>
            <div className="d-flex justify-content-around">
                <p className='text-danger'>{message}</p>
                <button className='btn btn-primary btn-sm' onClick={onClickFunc}>Agregar cita</button> 
            </div>
            <VSpacer height={innerVSpace}/>
        </div>
    )
}