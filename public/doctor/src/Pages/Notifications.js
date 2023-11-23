import React, { useEffect, useState } from 'react'
import { Appointment, CollpaseSection, VSpacer } from '../Components';

export const Notifications = () => {
    
    const width = 800;
    const spacing = 25
    
    const[count, setCount] = useState(6)
    const [appointments, setAppointments] = useState([
        ["1","Roberto Martinez", "2023-11-01", "12:00", "Consultorio 20"],
        ["2","Marta Gonzales", "2023-08-13", "16:00", "Consultorio 1"],
        ["3","Marcela Mondragon", "2024-01-04", "20:00", "Radiografia"],
        ["4","Jose Carmona", "2024-03-03", "10:00", "Consultorio 5"],
        ["5","Armando Diaz", "2024-06-14", "15:00", "Traumatologia"]
    ])

    const getAppointments = async({ID, page}) =>{
        const query = `SELECT * FROM APPOINTMENTS WHERE ID='${ID}' LIMIT ${20*(page-1)}, 20;`
        console.log(query)
        setAppointments([])
    }

    const newAppointment = (idPaciente, fecha, lugar, hora, setID, setFecha, setLugar, setHora,setWarningMessage) => { 
        if(1){
            setAppointments([...appointments, [`${count}`, "Diego", fecha, hora, lugar]])
            setCount(count + 1)
            setWarningMessage("Cita registrada correctamente")
            setID("")
            setFecha("")
            setLugar("")
            setHora("")
        } else {
            setWarningMessage("No se pudo registrar la cita")
        }
    }

    const changeDateFormat = (date) => {
        return date.substring(8) + "-" + date.substring(5,7) + "-" + date.substring(0,4)
    }

    return (
        <div id="notifications" class="content">
            <div class="main">
                <div class="row">
                    <div class="col-sm-12 text-left">
                        
                        <VSpacer height={spacing}/>
                        <div class="d-flex justify-content-center">
                            <h1>Notificaciones</h1>
                        </div>
                        <VSpacer height={spacing}/>
                        <div class="d-flex justify-content-center">
                            <CollpaseSection width={width} addAppointment={newAppointment}/>
                        </div>
                        <VSpacer height={spacing}/>
                        <div class="d-flex justify-content-center">
                            <h5>Mis citas:</h5>
                        </div>
                        <>{appointments.map(([id, name, date, hour, place])=>{
                            return <Appointment appointmentID={id}
                            patient={name} date={changeDateFormat(date)} hour={hour}
                            place={place}   appointments={appointments}
                            setAppointments={setAppointments}
                            />
                        })}</>
                        <VSpacer height={spacing}/>

                    </div>
                </div>
            </div>
        </div>
  )
}
