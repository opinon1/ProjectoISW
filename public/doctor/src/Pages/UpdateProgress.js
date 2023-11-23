import React, { useState } from 'react'
import { HSpacer, PatientContainer, VSpacer } from '../Components'

export const UpdateProgress = () => {

    const innerVSpace = 20
    const innerHSpace = 20
    const width = 800

    const [patientContainer, setPatientContainer] = useState(<></>)
    const [patientID, setPatientID] = useState("")
    const [message, setMessage] = useState("");

    const proof = ["Roberto Gonzalez", 30, "Cancer de pulmon", "Etapa 1"]

    const onClickFunc = () => {
        if(patientID){
            setMessage("")
            const [nombre, edad, padecimiento, estatus] = proof
            setPatientContainer(<PatientContainer nombre={nombre} width={width} 
                edad={edad} padecimiento={padecimiento} estatus={estatus}
                setComponent={setPatientContainer}
            />)
            setPatientID("")
        } else {
            setMessage("Ingrese un ID")
            setPatientContainer(<></>)
        }
    }

    return (
        <div id="update" class="content">
            <div class="main">
                <div class="row">
                    <div class="col-sm-12 text-left">

                        <h1>Progreso medico del paciente</h1>
                        <VSpacer height={innerVSpace}/>

                        <div className='p-1 mb-0 bg-dark text-white' style={{width}}>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex justify-content-start p-2'><i>ID del paciente:</i></div> 
                                <div className='d-flex justify-content-end'>
                                    <input type='text' value={patientID} onChange={ e => { setPatientID(e.target.value) }}/>
                                    <HSpacer width={innerHSpace}/>
                                    <button onClick={onClickFunc}>Search</button>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-start p-2'>
                            <HSpacer width={innerHSpace}/>
                            <p className='text-danger'>{message}</p>
                        </div>
                        <VSpacer height={innerVSpace}/>

                        <>{patientContainer}</>

                    </div>
                </div>
            </div>
        </div>
    );
}
