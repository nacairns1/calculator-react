
import Button from './Button'


const OperatorGrid = (props) => {

    
    return (
        <div className="operator-cont">
            <Button className="button answer-give" value="C" execFunc={props.chooseOperator} />
            <Button className="button answer-give" value="sqrt" execFunc={props.chooseOperator}/>
            <Button className="button" value="+" execFunc={props.chooseOperator} />
            <Button className="button" value="-" execFunc={props.chooseOperator}/>
            <Button className="button" value="/" execFunc={props.chooseOperator}/>
            <Button className="button" value="X" execFunc={props.chooseOperator}/>
            
    </div>
  )
}

export default OperatorGrid