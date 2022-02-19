import React from 'react'

const Button = (props) => {
    return (
        <button className={props.className} onClick={() => props.execFunc(props.value)}>{props.value === "sqrt" ? <>&#8730;</> : props.value}</button>
  )
}

export default Button