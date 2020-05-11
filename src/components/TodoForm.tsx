import * as React from 'react'

import Header from './Header'
import TodoList from './TodoList'
import TodoIndividualItem from './TodoIndividualItem'
import {TodoFormInterface} from './../interfaces'

const TodoForm = (props: TodoFormInterface) => {
    return(
        <div>
            <Header 
                title={props.title}
            />
            <TodoList
                todos={props.subtasks}
                handleTodoComplete={props.handleTodoComplete}
                handleTodoDelete={props.handleTodoDelete}
                handleTodoUpdate={props.handleTodoUpdate}
            />
            <TodoIndividualItem
                todo={props.createTask}
                handleTodoCreate={props.handleTodoCreate}
            />
        </div>
    )
}

export default TodoForm