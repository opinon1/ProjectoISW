import React from 'react'


export const ExpandButton = ({isOpen, toggle}) => {

    return (
      <button onClick={toggle}>
        <span
          className="material-icons"
          style={{
            transform: `rotate(${isOpen ? 180 : 0}deg)`,
            transition: "all 0.25s",
          }}>
            expand_more
        </span> 
      </button>
    );



}