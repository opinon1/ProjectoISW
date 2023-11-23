import React, { useState } from 'react'
import { HSpacer } from './HSpacer'
import { VSpacer } from './VSpacer'
import { ShowProfile } from './ShowProfile'

export const EditProfile = ({setComponent, data}) => {

    const [newName, setNewName] = useState("")
    const [newDate, setNewDate] = useState("")
    const [newDegree, setNewDegree] = useState("")
    const [newPatients, setNewPatients] = useState("")
    const [newPlace, setNewPlace] = useState("")
    const [newStudies, setNewStudies] = useState("")
    const [newImage, setNewImage] = useState("")
    const [message, setMessage] = useState("")

    const innerWidth = 250
    const innerHeight = 25
    

    const previewImage = () => {}

    const confirmEdit = () => {
        if(newName || newDate || newDegree || newPatients || newPlace || newStudies || newImage){
            if(newName){ console.log(newName); data.setNombre(newName); console.log("Nombre", data.nombre) }
            if(newDate){ data.setFechaNacimiento(newDate); console.log("Fecha") }
            if(newDegree){ data.setEspecialidad(newDegree); console.log("Especialidad") }
            if(newPatients){ data.setNumeroPacientes(newPatients); console.log("Pacientes") }
            if(newPlace){ data.setLugarAtencion(newPlace); console.log("Lugar") }
            if(newStudies){ data.setEstudios(newStudies); console.log("Estudios") }
            if(newImage){ data.setImagen(newImage); console.log("Imagen") }

            setComponent(<ShowProfile setComponent={setComponent} data={data}/>)

        } else {
            setMessage("Rellene algun campo")
        }
    }

    const cancelEdit= () => {
        setComponent(<ShowProfile setComponent={setComponent} data={data}/>)
    }

    return (
        <div class="profile-info">
                <label for="nombre">Nombre: &emsp;</label>
                <input type="text"  placeholder='Nombre(s) Apellidos' value={newName} 
                    onChange={e => { setNewName(e.target.value) }} style={{width: innerWidth}}
                />
                <br/>

                <label for="fecha-nacimiento">Fecha de Nacimiento:&emsp;</label>
                <input type="date"  value={newDate} onChange={e => { setNewDate(e.target.value) }}/>
                <br/>
            
                <label for="doctorado">Doctorado: &emsp;</label>
                <input type="text" placeholder='Titulo' value={newDegree} 
                    onChange={e => { setNewDegree(e.target.value) }} style={{width: innerWidth}}
                />
                <br/>
            
                <label for="num-pacientes">Número de pacientes tratados: &emsp;</label>
                <input type="number" placeholder='Pacientes en tratamiento' 
                    value={newPatients} onChange={e => { setNewPatients(e.target.value) }}
                    style={{width: innerWidth}}
                />
                <br/>
            
                <label for="lugar-atencion">Lugar de atención: &emsp;</label>
                <input type="text" placeholder='Lugar de trabajo actual' 
                    value={newPlace} onChange={e => { setNewPlace(e.target.value) }}
                    style={{width: innerWidth}}
                />
                <br/>
            
                <label for="estudios">Estudios: &emsp;</label>
                <input type="text"
                    placeholder='Grado de estudios' 
                    value={newStudies} onChange={e => { setNewStudies(e.target.value) }}
                    style={{width: innerWidth}}
                />
                <br/>
            
                <label for="imagen-perfil">Foto de Perfil: &emsp;</label>
                <input type="file" accept="image/*" onChange={e => { setNewImage(e.target.value)}}/>
                <br/>
            
                <div class="profile-image-container">
                    <img class="profile-image" source={newImage} alt="Vista previa de la imagen"/>
                </div>

                <VSpacer height={innerHeight}/>

                <div className="d-flex justify-content-around">
                    <button onClick={confirmEdit}>Confirmar</button>
                    <HSpacer width={innerWidth}/>
                    <button onClick={cancelEdit}>Cancelar</button>
                </div>

                <VSpacer height={innerHeight}/>
                <p className='text-danger'>{message}</p>
        </div>
    )
}
