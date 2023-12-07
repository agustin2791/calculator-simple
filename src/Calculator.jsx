import { useState } from 'react';


const Calculator = () => {
    const [operation, setOperation] = useState([])
    const [operationHistory, setOperationHistory] = useState([])

    const handleButtonPressed = (value) => {
        let current_operation = operation + value
        setOperation(current_operation)
    }

    const clear = () => {
        setOperation([])
    }

    const calc_simple = {
        '/': (a, b) => {return a / b},
        '*': (a, b) => {return a * b},
        '+': (a, b) => {return a + b},
        '-': (a, b) => {return a - b},
    }

    const calculateOperation = () => {
        let calc_operation = operation
        let deconstruct = {}
        let final_result
        if (calc_operation.includes('(') && calc_operation.includes(')')) {
            let finished_reading = false
            let set_group = 1
            while (!finished_reading) {
                let group_start = calc_operation.indexOf('(')
                let group_end = calc_operation.indexOf(')')
                let group = calc_operation.substring(group_start + 1, group_end)
                deconstruct[`group_${set_group}`] = group
                calc_operation = calc_operation.substring(group_end + 1)
                if (calc_operation.includes('(') && calc_operation.includes(')')){
                    deconstruct[`operation_${set_group}`] = calc_operation[0]
                    calc_operation = calc_operation.substring(1)
                    set_group += 1
                } else {
                    finished_reading = true
                }
            }
            let results = {}
            for (let i = 1; i <= set_group; i++) {
                let curr_operation = '+'
                if (deconstruct[`group_${i}`].includes('/')) curr_operation = '/'
                if (deconstruct[`group_${i}`].includes('*')) curr_operation = '*'
                if (deconstruct[`group_${i}`].includes('+')) curr_operation = '+'
                if (deconstruct[`group_${i}`].includes('-')) curr_operation = '-'
                let [a, b] = deconstruct[`group_${i}`].split(curr_operation)
                results[`group_${i}`] = calc_simple[curr_operation](parseInt(a), parseInt(b))
            }

            final_result = results['group_1']
            for (let i = 1; i < set_group; i++) {
                if (!Object.keys(results).includes(`group_${i + 1}`)) continue
                let curr_operation = '+'
                if (deconstruct[`operation_${i}`].includes('/')) curr_operation = '/'
                if (deconstruct[`operation_${i}`].includes('*')) curr_operation = '*'
                if (deconstruct[`operation_${i}`].includes('+')) curr_operation = '+'
                if (deconstruct[`operation_${i}`].includes('-')) curr_operation = '-'
                
                final_result = calc_simple[curr_operation](final_result, results[`group_${i + 1}`])
            } 
            
        } else if (calc_operation.includes('/') ||
                   calc_operation.includes('*') ||
                   calc_operation.includes('+') ||
                   calc_operation.includes('-')) {
            let curr_operation = '+'
            if (calc_operation.includes('/')) curr_operation = '/'
            if (calc_operation.includes('*')) curr_operation = '*'
            if (calc_operation.includes('+')) curr_operation = '+'
            if (calc_operation.includes('-')) curr_operation = '-'
            let [a, b] = calc_operation.split(curr_operation)
            console.log(a, b)
            final_result = calc_simple[curr_operation](parseInt(a), parseInt(b))
        } else {
            final_result = calc_operation
        }
        setOperationHistory([`${operation} = ${final_result}`, ...operationHistory])
        setOperation('')
    }
    return (
        <div className="calc-container">
            <div className="calc-operation"></div>
            <div className="calc-display">
                {operation}
            </div>
            <div className="row">
                <div className="clear-button"><button className="display" onClick={() => clear()}>Clear</button></div>

                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed("(")}>{"("}</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed(")")}>{")"}</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed("/")}>/</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed("*")}>*</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed("+")}>+</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed("-")}>-</button></div>


                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed('1')}>1</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed('2')}>2</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed('3')}>3</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed('4')}>4</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed('5')}>5</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed('6')}>6</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed('7')}>7</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed('8')}>8</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed('9')}>9</button></div>
                <div className="calc-button"><button className="display" onClick={() => handleButtonPressed('0')}>0</button></div>

                <div className="sub-button"><button className="display" onClick={() => {calculateOperation()}}>Submit</button></div>
                <div className="calc-history">
                {operationHistory.length > 0 && operationHistory.map(h => {
                    return (
                        <div>{h}</div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default Calculator