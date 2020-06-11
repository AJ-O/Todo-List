import * as React from 'react'
import {headerInterface} from './../interfaces'

const Header = (props: headerInterface) => {

    const [listTitle, setListTitle] = React.useState(props.title);
    
    function handleTitleUpdate(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            console.log("enter!");
        }
    }

    if(props.listType === "dbList") {
        return(
            <div className="list-title">
            <input
                type="text"
                value={listTitle}
                placeholder="Enter title...."
                onChange={event => setListTitle(event.target.value)}
                onKeyPress={event => {handleTitleUpdate(event)}} //create function with database
            />
        </div>
        )
    } else {
        return(
            <div className="list-title">
            <input
                type="text"
                value={props.title}
                placeholder="Enter title...."
                onChange={event => {props.handleTitleSet(event.target.value)}}
            />
        </div>
        )
    }

    // return(
    //     <div className="list-title">
    //         <input
    //             type="text"
    //             value={listTitle}
    //             placeholder="Enter title...."
    //             onChange={event => titleUpdate(event.target.value)}
    //             //onChange={event => {props.handleTitleSet(event.target.value)}}
    //             onKeyPress={event => {handleTitleUpdate(event)}} //create function with database
    //         />
    //     </div>
    // )
}

export default Header