import React from 'react'
import { VSpacer } from './VSpacer'
import { HSpacer } from './HSpacer'

export const MessageContainer = ({sender, message, myID}) => {

    const alignment = (myID === sender) ? 'd-flex justify-content-end' : 'd-flex justify-content-start'
    const style = (myID ===sender) ? "bg-primary text-white d-flex justify-content-center" :  "bg-secondary text-white d-flex justify-content-center"

    const height = 5
    const innerWidth = 10

    const content = (myID === sender) ? <>
        <div className={style}>
            <HSpacer width={innerWidth}/>
            {message}
            <HSpacer width={innerWidth}/>
        </div>
        <HSpacer width={innerWidth}/>
    </> : <>
        <HSpacer width={innerWidth}/>
        <div className={style}>
            <HSpacer width={innerWidth}/>
            {message}
            <HSpacer width={innerWidth}/>
        </div>
    </>

    return (
        <>
            <div className={alignment}>
                {content}
            </div>
            <VSpacer height={height}/>
        </>
    )
}
