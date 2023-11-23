import React from 'react'
import { EditProfile } from './EditProfile'

export const ShowProfile = ({setComponent, cambiarNombre, data}) => {


    const editProfile = () => {
        setComponent(<EditProfile setComponent={setComponent} data={data}/>)
    }

    const change = () => {
        cambiarNombre("Adios")
    }

    return (
        <>
            <div class="profile-info">
                <div class="profile-image-container">
                    <img class="profile-image" src={data.imagen} alt="Doctor Profile"/>
                </div>
                <div class="profile-details">
                    <p><strong>Nombre:</strong> {data.nombre} </p>
                    <p><strong>Fecha de Nacimiento:</strong> {data.fechaNacimiento}</p>
                    <p><strong>Doctorado:</strong> {data.especialidad}</p>
                    <p><strong>Número de pacientes tratados:</strong> {data.numeroPacientes}</p>
                    <p><strong>Lugar de atención:</strong> {data.lugarAtencion}</p>
                    <p><strong>Estudios:</strong> {data.estudios}</p>
              </div>
            </div>
            <button onClick={editProfile}>Editar Perfil</button>
            <button onClick={change}>Change</button>
        </>
    )
}
