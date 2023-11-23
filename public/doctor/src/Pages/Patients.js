import React, { useEffect, useState } from 'react'
import { ContactContainer } from '../Components/ContactContainer'
import { VSpacer } from '../Components/VSpacer'
import { ChatWindow } from '../Components/ChatWindow'

export const Patients = () => {

    const internHeight = 25

    const chatHeight = 400

    const [contacts, setContacts] = useState([
        ["1", "Roberto", "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg", "Paciente de cancer"],
        ["2", "Jose", "https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg", "Cardiologo"],
        ["3", "Miranda", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww", "Cirujana"],
        ["4", "Carmela", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww", "Cirujana"],
        ["5", "Patricia", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww", "Cirujana"],
        ["6", "Anastasia", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww", "Cirujana"],
        ["7", "Olga", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww", "Cirujana"]
    ])
    const [actualContact, setActualContacts] = useState(undefined)
    const myID = "100"

    /*
    const getContacts = () => {
        setContacts([])
    }

    useEffect(()=>{getContacts()}, [])
    */

    return (
        <div id="patients" class="content">
            <div class="main">
                <div class="row">
                    <div class="col-sm-12 text-left">

                        <h3>Mis chats</h3>
                        <VSpacer height={internHeight}/>

                        <h6>Chateando con: {actualContact}</h6>
                        <VSpacer height={internHeight}/>

                        <div class="d-flex justify-content-start">
                            <div style={{height: chatHeight, overflowY:'scroll'}}>
                                <>{contacts.map(([id, name, image, description])=>{
                                    return <ContactContainer id={id} name={name} 
                                    image={image} description={description} setID={setActualContacts}/>
                                })}</>
                            </div>
                            <ChatWindow myID={myID} contactID={actualContact} height={chatHeight}/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
