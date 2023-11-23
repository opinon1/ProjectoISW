import React from 'react'
import { HSpacer } from './HSpacer';

export const Appointment = ({appointmentID, patient, date, hour, place, appointments, setAppointments, width}) => {

  const height = 40;
  const contentWidth = 175;
  const innerSpace = 10

  const deleteAppointment = () => {
    //const query = `DELETE FROM appointment WHERE ID='${appointmentID}'`
    let aux = []
    appointments.map((element)=>{
      if(element[0] != appointmentID){
        aux.push(element)
      }
    })
    setAppointments(aux)
    
  }

  return (
    <>
    <div class="d-flex justify-content-center">
      <div class="p-2 mb-1 bg-secondary text-white" style={{width, height}}>
        <div class="d-flex justify-content-around">
          <h6 style={{width:contentWidth}}>{patient}</h6>
          <div class="vr"/> <HSpacer width={innerSpace}/>
          <h6 style={{width:contentWidth}}>{date}</h6>
          <div class="vr"/><HSpacer width={innerSpace}/>
          <h6 style={{width:contentWidth}}>{hour}</h6>
          <div class="vr"/><HSpacer width={innerSpace}/>
          <h6 style={{width:contentWidth}}>{place}</h6>
          <button class="btn btn-primary btn-sm" onClick={deleteAppointment}>Cancelar</button>
        </div>
      </div>
    </div>
    </>
  )
}