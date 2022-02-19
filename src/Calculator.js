import React, { useEffect, useState } from 'react';
import Answer from './Components/Answer';
import NumberGrid from './Components/NumberGrid';
import OperatorGrid from './Components/OperatorGrid';


function Calculator() {
  
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [storedValue, setStoredValue] = useState(false);
  const [storedOperator, setStoredOperator] = useState('');
  const [equalsActive, setEqualsActive] = useState(false);
  const [answer, setAnswer] = useState('');
  const [repeatValue, setRepeatValue] = useState('');

  async function addValue1(value) {
    await setEqualsActive(false);
    await setValue1(value1.concat(value));
  }

  function addValue2(value) {
    setValue2(value2.concat(value));
  }

  async function getFinalAnswer() {
    await calculate(storedOperator)
      .then((answer) => {
        setAnswer(answer);
        // setValue2('');
        setValue1('');
        setEqualsActive(true)
        setStoredValue(false)
        return new Promise((resolve) => { resolve(answer) })
      }).then(
        () => { }
      ).catch(() => {
        setAnswer("Input a new number");
        // setValue2('');
        setValue1('');
        setEqualsActive(true)
        setStoredValue(false)
      });
  }

  useEffect(() => {
    setRepeatValue('');
  }, [storedOperator])
  async function calculate(operator) {
    let _answer = new Promise((resolve, reject) => {
      if (equalsActive) {

        console.log(value1);
        if (value1 === '') {
          setValue1(answer);
          resolve(answer);
        }
        setAnswer(value1);
        resolve(value1);

      }
    });


    switch (operator) {
      case "C":
        setValue1('');
        setValue2('');
        setAnswer('');
        setEqualsActive(false);
        setStoredValue(false);
        setStoredOperator('');
        break;

      case "+":
        setStoredOperator("+");
        _answer = new Promise((res, rej) => {

          let base = parseFloat(value1);
          let extra = (isNaN(parseFloat(value2)) ? 0 : parseFloat(value2));

          console.log(equalsActive);
          if (equalsActive) {
            console.log("...attempting repeat");
            console.log(
              `value1: ${value1} value2: ${value2} answer: ${answer} repeatValue: ${repeatValue}`
            );

            setValue1(answer);
            setValue2(parseFloat(repeatValue));
            base = answer;
            extra = parseFloat(repeatValue);

          } else {
            setValue1(base + extra);
          }
          if (!equalsActive) { setRepeatValue(extra); }
          res(base + extra);

        });

        _answer.then((res) => {
          setValue2('');
          setStoredValue(true);
          setEqualsActive(false);
          return new Promise((resolve) => { resolve(res) });
        });
        break;

      case "-":
        setStoredOperator("-");
        _answer = new Promise((res, rej) => {

          let base = parseFloat(value1);
          let extra = (isNaN(parseFloat(value2)) ? 0 : parseFloat(value2));

          console.log(equalsActive);
          if (equalsActive) {
            console.log("...attempting repeat");
            console.log(
              `value1: ${value1} value2: ${value2} answer: ${answer} repeatValue: ${repeatValue}`
            );

            setValue1(answer);
            setValue2(parseFloat(repeatValue));
            base = answer;
            extra = parseFloat(repeatValue);

          } else {
            setValue1(base - extra);
          }
          if (!equalsActive) { setRepeatValue(extra); }
          res(base - extra);

        });

        _answer.then((res) => {
          setValue2('');
          setStoredValue(true);
          setEqualsActive(false);
          return new Promise((resolve) => { resolve(res) });
        });
        break;

      case "X":
        setStoredOperator("X");
        _answer = new Promise((res, rej) => {

          let base = parseFloat(value1);
          let extra = (isNaN(parseFloat(value2)) ? 1 : parseFloat(value2));

          console.log(equalsActive);
          if (equalsActive) {
            console.log("...attempting repeat");


            setValue1(answer);
            setValue2(parseFloat(repeatValue));
            base = answer;
            extra = parseFloat(repeatValue);

          } else {
            setValue1(base * extra);
          }
          if (!equalsActive) { setRepeatValue(extra); }
          res(base * extra);

        });

        _answer.then((res) => {
          setValue2('');
          setStoredValue(true);
          setEqualsActive(false);
          return new Promise((resolve) => { resolve(res) });
        });
        break;

      case "/":
        setStoredOperator("/");
        _answer = new Promise((res, rej) => {

          let base = parseFloat(value1);
          let extra = (isNaN(parseFloat(value2)) ? 1 : parseFloat(value2));

          console.log(equalsActive);
          if (equalsActive) {
            setValue1(answer);
            setValue2(parseFloat(repeatValue));
            base = answer;
            extra = parseFloat(repeatValue);

          } else {
            setValue1(base / extra);
          }
          if (!equalsActive) { setRepeatValue(extra); }
          res(base / extra);

        });

        _answer.then((res) => {
          setValue2('');
          setStoredValue(true);
          setEqualsActive(false);
          return new Promise((resolve) => { resolve(res) });
        });
        break;

      case "sqrt":
        setStoredOperator("sqrt");
        _answer = new Promise((resolve, reject) => {

          if (equalsActive) {
            resolve(Math.sqrt(answer));
          }
          if (storedValue) {
            resolve(Math.sqrt(answer));
          }

          // if (isNaN(Math.sqrt(parseFloat(value1)))) {
          //   resolve(0);
          // }
          setEqualsActive(true);
          if (!isNaN(parseFloat(value1))) {
            resolve(Math.sqrt(parseFloat(value1)));
            setAnswer(Math.sqrt(parseFloat(value1)));
          } else {
            resolve(Math.sqrt(parseFloat(answer)));
            setAnswer(Math.sqrt(parseFloat(answer)));
          }

          setValue1('');
          setValue2('');

        }).then((response) => {
          return new Promise((resolve) => {
            console.log(response);
            resolve(response)
          })
        });
        break;
      default:
        break;

    }
    console.log(_answer.finally(() => { console.log('answer function finished') }));

    return _answer;
  }

  const valueToShow =
    equalsActive ? answer : value1 === '' ? 'Enter a Number' : value1

  const repeatValueToShow =
    equalsActive ?
      repeatValue.toString().length > 8 ?
        parseFloat(repeatValue).toExponential(3) : repeatValue
      : value2.toString().length > 8 ?
        parseFloat(value2).toExponential(3) : value2

  const answerToShow =
    equalsActive ? "Ans" : '';

  return (
    <div className="calc-outline" >
      <Answer value={
        valueToShow.toString().length > 8 && valueToShow != 'Enter a Number' ?
          parseFloat(Math.abs(valueToShow)) < 10000000 ? parseFloat(valueToShow).toFixed(5) :
          parseFloat(valueToShow).toExponential(3)
          : valueToShow} operator={storedOperator} repeatValue={repeatValueToShow} answerToShow={answerToShow} />
      <NumberGrid addValue={
        valueToShow.length > 8 && valueToShow !== 'Enter a Number' ? () => { } : !storedValue ? addValue1 :
          value2.length > 8 ? () => { } : addValue2
      } storedValue={storedValue} getFinalAnswer={getFinalAnswer} />
      <OperatorGrid chooseOperator={calculate} />
    </div>
  );
}

export default Calculator;
