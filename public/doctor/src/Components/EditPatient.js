import React, { useState } from 'react'
import { VSpacer } from './VSpacer'
import { HSpacer } from './HSpacer'
import { PatientContainer } from './PatientContainer'

export const EditPatient = ({width, setComponent, data}) => {

    const innerHeight = 10
    const innerWidth = 20

    const [newStatus, setNewStatus] = useState("")
    const [message, setMessage] = useState("")

    const onClickFunc = () => {
        if(newStatus){
            setNewStatus("")
            setMessage("")
            setComponent(<PatientContainer nombre={data.nombre} width={width} 
                edad={data.edad} padecimiento={data.padecimiento} estatus={newStatus}
                setComponent={setComponent}
            />)
        } else {
            setMessage("Ingrese algun valor")
        }
    }

    return (
        <div class="border border-dark" style={{width}}>
            <div className='p-2 mb-0 bg-dark text-white'>
                <h4>Editar estatus:</h4>
            </div>
            <VSpacer height={innerHeight}/>
            <div className="d-flex justify-content-around">
                <input style={{width: width/2}} type='text' value={newStatus} onChange={ e => { setNewStatus(e.target.value) }}/>
                <button onClick={onClickFunc}>Actualizar</button>
            </div>
            <VSpacer height={innerHeight}/>
            <div className='d-flex justify-content-start'>
                <HSpacer width={innerWidth}/>
                <p className='text-danger'>{message}</p>
            </div>
            <VSpacer height={innerHeight}/>
        </div>
    )
}
