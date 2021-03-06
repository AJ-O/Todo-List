import * as React from 'react'

import Header from './Header'
import TodoList from './TodoList'
import TodoIndividualItem from './TodoIndividualItem'
import {TodoFormInterface} from './../interfaces'

const TodoForm = (props: TodoFormInterface) => {

    return (
        <div>
            <Header 
                listId={props.id}
                title={props.title}
                listType={props.listType}
                handleTitleSet={props.handleTitleSet}
            />
            <TodoList
                id={props.id}
                todos={props.todos}
                handleTodoComplete={props.handleTodoComplete}
                handleTodoDelete={props.handleTodoDelete}
                //handleTodoUpdate={props.handleTodoUpdate}
                updateValueInDatabase={props.updateValueInDatabase}
            />
            <TodoIndividualItem
                id={props.id}
                todo={props.todos}
                handleTodoCreate={props.handleTodoCreate}
            />
        </div>
    )
}

export default TodoForm