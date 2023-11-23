import React from 'react'
import { HSpacer } from './HSpacer'
import { VSpacer } from './VSpacer'
import { EditPatient } from './EditPatient'

export const PatientContainer = ({nombre, edad, padecimiento, estatus, width, setComponent}) => {

    const innerWidth = 45
    const innerHeight = 15

    const imageCircunference = 150
    const circunference = `${imageCircunference}px`
    const imageStyle = {
        width: circunference,
        height: circunference,
        borderRadius: '50%',
        objectFit: 'cover',
    };

    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKt2zPIQMYk5DJjRRt_bgBphsKEzC9Pi2fA&usqp=CAU"

    const onClickFunc = () => {
        setComponent(<EditPatient width={width} setComponent={setComponent} 
            data={{nombre, edad, padecimiento}}/>)
    }

    return (
        <div class="border border-dark" style={{width}}>
            <div className='p-2 mb-0 bg-dark text-white'>
                <h4>{nombre}</h4>
            </div>
            <VSpacer height={innerHeight/3}/>
            <div className="d-flex justify-content-start">
                <HSpacer width={innerWidth/3}/>
                <img src={image} alt="Profile" style={imageStyle} />
                <HSpacer width={innerHeight/3}/>
                <div class="d-flex justify-content-start">
                    <HSpacer width={innerWidth}/>
                    <div>
                        <VSpacer height={innerHeight}/>
                        <ul>
                            <li>Edad: {edad}</li>
                            <li>Padecimiento: {padecimiento}</li>
                            <li>Estatus: {estatus}</li>
                        </ul>
                        <VSpacer height={innerHeight}/>
                        <button className='btn btn-primary btn-sm' onClick={onClickFunc}>Actualizar estatus</button>
                    </div>
                </div>
            </div>
            <VSpacer height={10}/>
        </div>
    )
}
