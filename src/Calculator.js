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
  const [numDecimal, setNumDecimal] = useState(0);

  async function addValue1(value) {
    if (value === '.') setNumDecimal(1);
    if (numDecimal !== 0 && value===".") return;
    await new Promise((resolve, reject) => {
      setStoredOperator('');
      setEqualsActive(false);
      setValue1(value1.concat(value));
      resolve('resolved');
    }).catch('fail');
    // await setEqualsActive(false);
    // await setValue1(value1.concat(value));
  }

  function addValue2(value) {
    if (value === '.') setNumDecimal(1);
    if (numDecimal !== 0 && value===".") return;
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
    setNumDecimal(0);
  }, [storedOperator])

  async function calculate(operator) {
    
    
    if (value1 === "" && answer === "" && value2 === "") {
      setValue1('');
      setValue2('');
      setAnswer('');
      setEqualsActive(false);
      setStoredValue(false);
      setStoredOperator('');
      return new Promise((resolve, reject) => {
        resolve('');
      })
    }
    let _answer = new Promise((resolve, reject) => {
      if (equalsActive) {
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
          if (equalsActive) {
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

          if (equalsActive) {


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

          if (equalsActive) {


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
            resolve(response)
          })
        });
        break;
      default:
        break;

    };
    return _answer;
  }

  const valueToShow =
    equalsActive ? answer : value1 === '' ? '. . .' : value1

  const repeatValueToShow =
    equalsActive ?
      repeatValue.toString().length > 9 ?
        parseFloat(repeatValue).toExponential(5) : repeatValue
      : value2.toString().length > 9 ?
        parseFloat(value2).toExponential(5) : value2

  const answerToShow =
    equalsActive ? "Ans" : '';
  
  const displayedNumber = (numberStr) => {
    console.log('slicing...')

    return numberStr.toString().slice(0, 9);
  }

  return (
    <div className="calc-outline" >
      <Answer value={
        parseFloat(Math.abs(valueToShow)) < .00001 && parseFloat(Math.abs(valueToShow)) !== 0 ?
          parseFloat(valueToShow).toExponential(5) :
        valueToShow.toString().length > 8 && valueToShow !== '. . .' ?
            parseFloat(Math.abs(valueToShow)) <= 999999999 ?
              parseFloat(Math.abs(valueToShow)) < .00001 ?
                parseFloat(valueToShow).toExponential(5) :
            displayedNumber(valueToShow) :
          parseFloat(valueToShow).toExponential(5)
            : parseFloat(valueToShow) > 99999999
              ? parseFloat(valueToShow).toExponential(5) : valueToShow} operator={storedOperator} repeatValue={repeatValueToShow} answerToShow={answerToShow} />
      <NumberGrid addValue={
        valueToShow.length > 8 && valueToShow !== '. . .' ? () => { } : !storedValue ? addValue1 :
          value2.length > 8 ? () => { } : addValue2
      } storedValue={storedValue} getFinalAnswer={getFinalAnswer} />
      <OperatorGrid chooseOperator={calculate} />
    </div>
  );
}

export default Calculator;
