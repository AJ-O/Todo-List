import * as React from 'react'
import shortid from 'shortid'

import {TodoCreateIndividualItemInterface, TodoIndividualItemInterface} from './../interfaces'

const TodoIndividualItem = (props: TodoCreateIndividualItemInterface) => {
    
    const [formState, setFormState] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        setFormState(event.target.value)
    }

    function handleInputEnter(event: React.KeyboardEvent) {
        if(event.key === "Enter") {
            const newTodoItem: TodoIndividualItemInterface = {
                id: shortid.generate(),
                task: formState,
                isCompleted: false
            }

            props.handleTodoCreate(newTodoItem)
            
            console.log(inputRef, inputRef.current)

            if(inputRef && inputRef.current) {
                inputRef.current.value = ""
            }
        }
    }
    
    return(

        <div>
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter task"
                onChange={event => handleInputChange(event)}
                onKeyPress={event => handleInputEnter(event)}
            />
            <input
                type="date"
                placeholder="Enter date to do the task"
            />
        </div>
    
    )
}

export default TodoIndividualItem