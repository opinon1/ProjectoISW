import React, { useEffect, useState } from 'react'
import { ShowProfile } from '../Components/ShowProfile'

export const Profile = () => {

    const [nombre, setNombre] = useState("Dr. Parecido")
    const [fechaNacimiento, setFechaNacimiento] = useState("1988-01-01")
    const [especialidad, setEspecialidad] = useState("Especialidad en...")
    const [numeroPacientes, setNumeroPacientes] = useState(200)
    const [lugarAtencion, setLugarAtencion] = useState("Hospital XYZ")
    const [estudios, setEstudios] = useState("Universidad ABC, Año de graduación")


    const [imagen, setImagen] = useState("https://media.licdn.com/dms/image/C4E03AQHN8xgseevCiA/profile-displayphoto-shrink_800_800/0/1516517482014?e=2147483647&v=beta&t=j98hf-SQssBnepwI5c5S7tFsnoleqeiJuycdDPcVGrc")
    const [shownComponent, setShownComponent] = useState(<></>)

    const cambiarNombre = (nuevoNombre) => {
        console.log(nombre, nuevoNombre)
        setNombre(nuevoNombre)
        console.log(nombre, nuevoNombre)
    }

    const init_func = () => {
        setShownComponent(<ShowProfile setComponent={setShownComponent}
            cambiarNombre={cambiarNombre}
            data={{nombre, fechaNacimiento, especialidad, numeroPacientes, lugarAtencion, estudios,
                imagen}}
        />) 
    }

    useEffect(()=>{ init_func() }, [])

    return (
        <div id="profile" class="content">
            <div class="main">
                <div class="row">
                    <div class="col-sm-12 text-left">
                        <h1>
                            <ion-icon name="person-circle-outline"/>
                            Doctor Profile
                        </h1>
                        <>{shownComponent}</>

                    </div>
                </div>
            </div>
        </div>
  )
}
