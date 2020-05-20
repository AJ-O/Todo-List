import React from 'react'
import {userListsInterface, individualListInterface, TodoFormInterface} from './../interfaces'
//Change type of props
//Create an interface which accepts a list of TodoLists
    //onclick function - to display the userlist, default display none
const UserList = (props: individualListInterface) => {
    return(
        <div className="user-lists">
            <ul>
                {props.listNames.map((list) => (
                    <li key={list.id}>
                        {list.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList;