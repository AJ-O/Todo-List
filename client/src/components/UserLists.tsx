import React from 'react'
import TodoForm from './TodoForm'
import {userListsInterface, individualListInterface, TodoFormInterface} from './../interfaces'
//Change type of props
//Create an interface which accepts a list of TodoLists
    //onclick function - to display the userlist, default display none
const UserList = (props: individualListInterface) => {

    function dispOnClick(list: TodoFormInterface) {
        console.log(list);
    }

    return(
            <ul className="unordered-list-items">
                {props.listNames.map((list) => (
                    <li key={list.id} className="ind-list" onClick={() => dispOnClick(list)}>
                        {list.title}
                    </li>
                )
            )}
            </ul>
    )
}

export default UserList;