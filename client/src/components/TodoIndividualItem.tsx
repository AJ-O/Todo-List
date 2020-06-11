import * as React from 'react'
import shortid from 'shortid'
import DateFnsUtils from "@date-io/date-fns";
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
//import DatePicker from 'react-datepicker'

import {TodoCreateIndividualItemInterface, TodoIndividualItemInterface} from './../interfaces'

const TodoIndividualItem = (props: TodoCreateIndividualItemInterface) => {
    
    const [timeState, setTime] = React.useState(Date);
    const [taskState, setTaskState] = React.useState("");
    const inputTaskRef = React.useRef<HTMLInputElement>(null);
    const inputDateRef = React.useRef<HTMLInputElement>(null);

    function handleInputChangeTask(event: React.ChangeEvent<HTMLInputElement>){
        setTaskState(event.target.value)
    }

    function handleInputChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
        setTime(event.target.value)
    }

    function handleData() {
        const newTodoItem: TodoIndividualItemInterface = {
            id: shortid.generate(),
            task: taskState,
            isCompleted: false,
            setTime: timeState
        }

        if(props.todo.length === 0){

            if(inputTaskRef.current?.value === "") {
                alert("Kindly enter a task before adding!");
            } else {
                props.handleTodoCreate(newTodoItem);
            }

        } else {

            if(taskState === "") {
                alert("Kindly enter a task before adding!");
            } else {
                props.handleTodoCreate(newTodoItem, props.id);
            }
        }

        if(inputTaskRef && inputTaskRef.current) {
            inputTaskRef.current.value = ""
        }

        if(inputDateRef && inputDateRef.current) {
            inputDateRef.current.value = ""
        }

    }

    // function handleDateChange(time: any) {
    //     setNewTimeState(time);
    // }
    
    return(

        <div className="input-form">
            <input
                id="taskId"
                ref={inputTaskRef}
                type="text"
                placeholder="Enter task"
                onChange={event => handleInputChangeTask(event)}
                required
            />
            <input
                ref={inputDateRef}
                id="timeId"
                type="time"
                step="1"
                placeholder="Enter date to do the task"
                onChange={event => handleInputChangeDate(event)}
                required
            />

            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    label="DateTimePicker"
                    inputVariant="outlined"
                    value={newTimeState}
                    onChange={(time) => {handleDateChange(time)}}
                />
            </MuiPickersUtilsProvider> */}
            <button 
            className="add-task"
            onClick={handleData}>+</button>
        </div>
    
    )
}

export default TodoIndividualItem