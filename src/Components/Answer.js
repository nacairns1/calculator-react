import {React} from 'react'

const Answer = (props) => {

    console.log(props.answerToShow.length);

    return (
        <div className='answer-cont'>
            <section className='alt-nmb'>
                <h2>
                    {props.repeatValue}
                </h2>
            </section>
            <h3>
                {props.operator}
            </h3>
            <span>{props.answerToShow.length > 8 ? "test" : props.answerToShow}</span>
            <section className='main-nmb'>
                <h1>
                    {props.value}
                </h1>
            </section>


        </div>
    )
}

export default Answer