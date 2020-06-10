import * as React from 'react'
import DateFnsUtils from "@date-io/date-fns";
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'

import {TodoItemTaskInterface} from './../interfaces'
import {FaTrashAlt} from 'react-icons/fa';

const TodoTask = (props: TodoItemTaskInterface) => {

    const [task, setTask] = React.useState(props.todo.task);
    const [time, setTime] = React.useState(props.todo.setTime);

    return(
        <div className="individual-item">

            <div onClick={() => props.handleTodoComplete(props.id, props.todo.id)}>
                {props.todo.isCompleted ? (
                    <span className="todo-item-checked">&#10003;</span>
                ) : (
                    <span className="todo-item-unchecked" />
                )}
            </div>

            <div className="user-task">
                <input
                    // value={props.todo.task}
                    // onChange={(event:React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo.id, "task")}
                    value={task}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setTask(event.target.value)}
                    onKeyPress={(event: React.KeyboardEvent) => props.updateValueInDatabase? props.updateValueInDatabase(event, props.id, props.todo.id, "task"): ""} 
                    //Empty because this will be triggered when create list calls the update function
                />
            </div>

            <div className="set-timer">
                <input
                    value={time}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => setTime(event.target.value)}
                    onKeyPress={(event: React.KeyboardEvent) => props.updateValueInDatabase? props.updateValueInDatabase(event, props.id, props.todo.id, "time"): ""}
                />
            </div>

            <div className="item-remove" onClick={() => props.handleTodoDelete(props.id, props.todo.id)}>
                <FaTrashAlt/>
            </div>
        </div>
    )
}

export default TodoTask