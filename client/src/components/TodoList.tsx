import * as React from 'react'

import TodoTask from './TodoTask'
import {TodoItemsInterface} from '../interfaces'

const TodoList = (props: TodoItemsInterface) => {
    return(
        <div className="todos">
            <ul>
                {props.todos.map((todo) => (
                    <li key={todo.id}>
                        <TodoTask
                            id={props.id}
                            todo={todo}
                            handleTodoComplete={props.handleTodoComplete}
                            handleTodoDelete={props.handleTodoDelete}
                            updateValueInDatabase={props.updateValueInDatabase}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList