import React from 'react'
import './input.css'

const Input = (props) => {
    return (
        <input onChange={(event)=> props.setValue(event.target.value)}
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}
               className="input"    
        />
    )
}

export default Input
