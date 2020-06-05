import React from 'react'
import TodoForm from './TodoForm'
import {individualListInterface, TodoFormInterface, TodoIndividualItemInterface, TodoItemsInterface} from './../interfaces'

const UserList = (props: individualListInterface) => {

    const [todos, setTodos] = React.useState<TodoIndividualItemInterface[]>([]); 


//TRY using usestate...

    // React.useEffect(() => {
    //     const options = {
    //         method: "GET",
    //         headers: {
    //             "Content-type": "application/json"
    //         }
    //     }

    //     const getDetails = async () => {
    //         const response = await fetch(`/getLists/${props.useremail}`, options)
    //         const json = await response.json();
    //         setTodos(json["data"][0]["TodoLists"]);
    //     }
    //     getDetails();
    // }, []);

//create another handletodocreate with values of todos
    async function handleTodoCreate(todo: TodoIndividualItemInterface, id? : String) {
        //add to the list using post then get only that list again...

        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(todo)
        };

        const response = await fetch(`/addTodo/${props.useremail}/${id}`, options)
        const json = await response.json();

        if(json.code !== 200) {
            console.error(json.message);
        } else {
            const response = await fetch(`/getLists/${props.useremail}`)
            const json = await response.json();
            console.log(json);
            //setTodos(json["data"][0]["TodoLists"]); //to update state, either, reload or use state...
        }
    }

    async function handleTodoComplete(listId: string, todoId: string) {
        
        const options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({listId: listId, todoId: todoId})
        }

        const response = await fetch(`/completeTodo/${props.useremail}`, options);
        const json = await response.json();
        console.log(json);

    }

    async function handleTodoDelete(listId?: String, todoId? : String) {
        let options = {
            method: "DELETE"
        }

        const response = await fetch(`/deleteTodoItem/${props.useremail}/${listId}/${todoId}`, options);
        const json = await response.json();
        if(json.code === 200) {
            const response = await fetch(`/getLists/${props.useremail}`)
            const json = await response.json();
            console.log(json);
        }
    }

    function handleTodoUpdate() {
        
    }

    function handleTitleSet() {

    }

    return(
            <ul className="unordered-list-items">
                {props.listNames.map((list: TodoFormInterface, index: number) => (
                    <li key={list.id} className="ind-list">
                        <TodoForm
                            id={list.id}
                            title={list.title}
                            todos={list.todos} //need to give state variable, state variable need to initalised with list.todos
                            createTask={todos}
                            handleTodoCreate={handleTodoCreate}
                            handleTodoComplete={handleTodoComplete}
                            handleTodoDelete={handleTodoDelete}
                            handleTodoUpdate={handleTodoUpdate}
                            handleTitleSet={props.handleTitleSet}
                        />
                    </li>
                )
            )}
            </ul>
    )
}

export default UserList;