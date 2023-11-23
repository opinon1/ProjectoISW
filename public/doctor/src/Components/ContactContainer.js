import React from 'react'
import { HSpacer } from './HSpacer';
import { VSpacer } from './VSpacer';

export const ContactContainer = ({id, name, image, description, setID}) => {

    const imageCircunference = 75
    const circunference = `${imageCircunference}px`
    const width = 250
    const spacer = 30
    const innerSpace = 5

    const imageStyle = {
        width: circunference,
        height: circunference,
        borderRadius: '50%',
        objectFit: 'cover',
    };

    const setThisID = () => {
        setID(id)
        console.log(id)
    }
    
    return (
        <div class="border border-dark" style={{width}} onClick={setThisID}>
            <VSpacer height={innerSpace}/>
            <div className="d-flex justify-content-start">
                <HSpacer width={5}/>
                <img src={image} alt="Profile" style={imageStyle} />
                <HSpacer width={spacer}/>
                <div class="d-flex justify-content-start">
                    <div>
                        <h6>{name}</h6>
                        <p><small>{description}</small></p>
                    </div>
                </div>
            </div>
            <VSpacer height={innerSpace}/>
        </div>
      );

}