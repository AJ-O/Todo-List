import * as React from 'react'

import TodoTask from './TodoTask'
import {TodoIndividualItemInterface, TodoItemsInterface} from './../interfaces'

const TodoList = (props: TodoItemsInterface) => {
    return(
        <div className="todos">
            <ul>
                {props.todos.map((todo: TodoIndividualItemInterface) => (
                    <li key={todo.id}>
                        <TodoTask
                            todo={todo}
                            handleTodoComplete={props.handleTodoComplete}
                            handleTodoDelete={props.handleTodoDelete}
                            handleTodoUpdate={props.handleTodoUpdate}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList