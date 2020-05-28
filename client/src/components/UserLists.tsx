import React from 'react'
import TodoForm from './TodoForm'
import {individualListInterface, TodoFormInterface, TodoIndividualItemInterface} from './../interfaces'
//Change type of props
//Create an interface which accepts a list of TodoLists
    //onclick function - to display the userlist, default display none
const UserList = (props: individualListInterface) => {

    const [todos, setTodos] = React.useState<TodoIndividualItemInterface[]>([]);

    function disp(list: any): void {
        console.log(list)
    }

    function handleTodoCreate() {
        const newTodoState: TodoIndividualItemInterface[] = [...todos];
    }

    function handleTodoComplete() {

    }

    function handleTodoDelete() {

    }

    function handleTodoUpdate() {

    }

    function handleTitleSet() {

    }

    return(
            <ul className="unordered-list-items">
                {props.listNames.map((list: TodoFormInterface) => (
                    <li key={list.id} className="ind-list" onClick={() => disp(list)}>
                        {list.title}
                        <TodoForm
                            id={list.id}
                            title={list.title}
                            todos={list.todos}
                            createTask={list.createTask}
                            handleTodoCreate={handleTodoCreate}
                            handleTodoComplete={handleTodoComplete}
                            handleTodoDelete={handleTodoDelete}
                            handleTodoUpdate={handleTodoUpdate}
                            handleTitleSet={handleTitleSet}
                        ></TodoForm>
                    </li>
                )
            )}
            </ul>
    )
}

export default UserList;