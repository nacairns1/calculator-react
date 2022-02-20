import React from 'react'
import Button from './Button'

const NumberGrid = (props) => {
  return (
      <div className='number-cont'>
          <Button className="btn-nmb" value="1" execFunc={props.addValue}/>
          <Button className="btn-nmb" value="2" execFunc={props.addValue}/>
          <Button className="btn-nmb" value="3" execFunc={props.addValue}/>
          <Button className="btn-nmb" value="4" execFunc={props.addValue}/>
          <Button className="btn-nmb" value="5" execFunc={props.addValue}/>
          <Button className="btn-nmb" value="6" execFunc={props.addValue}/>
          <Button className="btn-nmb" value="7" execFunc={props.addValue}/>
          <Button className="btn-nmb" value="8" execFunc={props.addValue}/>
          <Button className="btn-nmb" value="9" execFunc={props.addValue}/>
          <Button className="btn-nmb" value="0" execFunc={props.addValue}/>
          <Button className="btn-nmb" value="." execFunc={props.addValue} />
          <Button className="answer-give" value="=" execFunc={props.getFinalAnswer}/>
    </div>
  )
}

export default NumberGrid