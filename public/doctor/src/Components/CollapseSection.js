import React from 'react'
import { CollapseRow } from './CollapseRow'
import { ExpandButton } from './ExpandButton'
import { OpenController } from '../Hooks/OpenController';

export const CollpaseSection = ({width, addAppointment}) => {

    const {open, toggle} = OpenController(false);

    return (
        <div> 
            <div className='d-flex justify-content-center'>
                <div className='p-1 mb-0 bg-dark text-white'>

                    <div className='d-flex justify-content-between' style={{width}}>
                        <div className='d-flex justify-content-start p-2'><i>Nueva cita</i></div> 
                        <div className='d-flex justify-content-end'>
                            <ExpandButton isOpen={open} toggle={toggle}/>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                {open && <CollapseRow
                width={width} addAppointment={addAppointment}
                            />}
            </div>
            <div style={{height: 10}}/>
        </div>
    )
}