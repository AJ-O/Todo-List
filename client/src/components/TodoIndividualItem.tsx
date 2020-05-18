import * as React from 'react'
import shortid from 'shortid'
//import DatePicker from 'react-datepicker'

import {TodoCreateIndividualItemInterface, TodoIndividualItemInterface} from './../interfaces'

const TodoIndividualItem = (props: TodoCreateIndividualItemInterface) => {
    
    const [timeState, setTime] = React.useState(Date)
    const [formState, setFormState] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    function handleInputChangeTask(event: React.ChangeEvent<HTMLInputElement>){
        setFormState(event.target.value)
    }

    function handleInputChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
        setTime(event.target.value)
    }

    function handleData() {
        
        const newTodoItem: TodoIndividualItemInterface = {
            id: shortid.generate(), //To use or not -- coz mongodb will generate an id too...
            task: formState,
            isCompleted: false,
            setTime: timeState
        }
        props.handleTodoCreate(newTodoItem)

        if(inputRef && inputRef.current) {
            inputRef.current.value = ""
        }
    }
    
    return(

        <div className="input-form">
            <input
                id="taskId"
                ref={inputRef}
                type="text"
                placeholder="Enter task"
                onChange={event => handleInputChangeTask(event)}
                required
            />
            <input
                ref={inputRef}
                id="timeId"
                type="time"
                step="1"
                placeholder="Enter date to do the task"
                onChange={event => handleInputChangeDate(event)}
                required
            />
            <button 
            className="add-task"
            onClick={handleData}>+</button>
        </div>
    
    )
}

export default TodoIndividualItem