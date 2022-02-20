import {React, useState, useEffect} from 'react'

const Button = (props) => {

  const [className, setclassName] = useState(props.className);
  const [clickClass, setclickClass] = useState(props.clickClass);
  const [hoverClass, sethoverClass] = useState(props.hoverClass);
  const [mouseOver, setMouseOver] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = (width <= 768);


  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    switch (props.className) {
      case "answer-give":
        setclickClass('answer-give-clicked')
        sethoverClass('answer-give-hover');
        break;
      case "btn":
        setclickClass('btn-clicked');
        sethoverClass('btn-hover');
        break;
      case "btn-nmb":
        setclickClass('btn-nmb-clicked');
        sethoverClass('btn-nmb-hover');
        break;
      default:
        break;
    }
    
    window.addEventListener('resize', handleWindowSizeChange);


    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [props.className]);
  
  const onClick = () => {
    props.execFunc(props.value)
    setclassName(clickClass);
  }
    
  const onMouseEnter = () => {
    setMouseOver(true)
    setclassName(hoverClass);
  }


  const onMouseLeave = () => {
    setMouseOver(false);
    setclassName(props.className);
  }
  const onMouseUp = () => {
    console.log('triggered');
  }

  const onTransitionEnd = () => {
    className === clickClass && isMobile ? setclassName(props.className)
      : mouseOver && isMobile ? setclassName(hoverClass) :
        mouseOver ? setclassName(hoverClass): setclassName(props.className)}

    return (
      <button className={className} onClick={onClick} onTransitionEnd={onTransitionEnd}
      onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseUp={onMouseUp}
      >{props.value === "sqrt" ? <>&#8730;</> : props.value}</button>
  )
}

export default Button