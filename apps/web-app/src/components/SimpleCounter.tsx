import React, { ChangeEvent, useState } from 'react';

function SimpleCounter( props:{ startingNumber:number }){

    // const [ startingValue ] = useState(props.startingNumber);
    const [ currentValue, setCurrentValue ] = useState(props.startingNumber);
    const [ incrementValue, setIncrementValue ] = useState(1);

    function onClickAdd(){
        setCurrentValue( currentValue + incrementValue );
    }

    function onClickSubtract(){
        setCurrentValue( currentValue - incrementValue );
    }

    function onChangeIncrementBy( event:ChangeEvent<HTMLInputElement> ){
        setIncrementValue( Number( event.target.value ));
    }

    return (
        <div>
            Starting Number: {props.startingNumber}<br/>
            Current Number: {currentValue}<br/><br/>

            Increment / Decrement by:<br/>
            <input type="number" defaultValue={1} value={incrementValue} onChange={onChangeIncrementBy} /><br/>
            <button onClick={onClickAdd}>Add 1</button> | <button onClick={onClickSubtract}>Subtract 1</button>
        </div>
    )

}

export default SimpleCounter;