import React, { useEffect, useState } from 'react'
import { MessageContainer } from './MessageContainer'

export const ChatWindow = ({myID, contactID, height}) => {

    const chatWidth = 500
    const inputHeight = 40
    const buttonWidth  = 50

    const[text, setText] = useState("")
    const[messages, setMessages] = useState([])

    
    const sendMessage = () =>{
        if(text){
            setMessages([...messages, [myID, text]])
            setText("")
        }
    }

    useEffect(()=>{ setMessages([["200","Adios"]]) }, [contactID])

    return (
        <div className='border border-dark' style={{width:chatWidth, height}}>
            <div className="d-flex flex-column">
                <div style={{height: height-inputHeight, overflowY:'scroll'}}>
                    <>{
                        messages.map(([id, content])=>{
                            console.log(content)
                            return <MessageContainer myID={myID} sender={id} message={content}/>
                        })
                    }</>
                </div>
                <div  class="d-flex justify-content-center" style={{height: inputHeight}}>
                    <textarea class="form-control" value={text} aria-label="With textarea" onChange={(e)=>{setText(e.target.value)}}></textarea>            
                    <button style={{width: buttonWidth}} onClick={sendMessage}><ion-icon name="send-outline"/></button>
                </div>
            </div>
        </div>
    )
}