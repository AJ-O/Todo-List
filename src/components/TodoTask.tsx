import * as React from 'react'

import {TodoItemTaskInterface} from './../interfaces'

const TodoTask = (props: TodoItemTaskInterface) => {
    return(
        <div className="individual-item">

            <div onClick={() => props.handleTodoComplete(props.todo.id)}>
                {props.todo.isCompleted ? (
                    <span className="todo-item-checked">&#10003;</span>
                ) : (
                    <span className="todo-item-unchecked" />
                )}
            </div>

            <div>
                <input
                    value={props.todo.task}
                    onChange={(event:React.ChangeEvent<HTMLInputElement>) => props.handleTodoUpdate(event, props.todo.id)} 
                />
            </div>

            <div className="setTimer">
                
            </div>

            <div className="item-remove" onClick={() => props.handleTodoDelete(props.todo.id)}>
                X
            </div>

        </div>
    )
}

export default TodoTask