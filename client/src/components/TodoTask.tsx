import * as React from 'react'

import {TodoItemTaskInterface} from './../interfaces'
import {FaTrashAlt} from 'react-icons/fa';

const TodoTask = (props: TodoItemTaskInterface) => {
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
                    value={props.todo.task}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo.id)} 
                />
            </div>

            <div className="setTimer">
                <input
                    value={props.todo.setTime}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate}
                />
            </div>

            <div className="item-remove" onClick={() => props.handleTodoDelete(props.id, props.todo.id)}>
                <FaTrashAlt/>
            </div>

        </div>
    )
}

export default TodoTask