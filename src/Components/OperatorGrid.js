
import Button from './Button'


const OperatorGrid = (props) => {

    
    return (
        <div className="operator-cont">
            <Button className="answer-give" value="C" execFunc={props.chooseOperator} />
            <Button className="answer-give" value="sqrt" execFunc={props.chooseOperator}/>
            <Button className="btn" value="+" execFunc={props.chooseOperator} />
            <Button className="btn" value="-" execFunc={props.chooseOperator}/>
            <Button className="btn" value="/" execFunc={props.chooseOperator}/>
            <Button className="btn" value="X" execFunc={props.chooseOperator}/>
            
    </div>
  )
}

export default OperatorGrid