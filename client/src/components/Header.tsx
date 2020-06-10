import * as React from 'react'
import {headerInterface} from './../interfaces'

const Header = (props: headerInterface) => {

    function handleTitleUpdate(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            console.log("enter!");
            //setTitle(title);
        }
        
        //props.handleTitleSet(title);

    }

    return(
        <div className="list-title">
            <input
                type="text"
                value={props.title}
                placeholder="Enter title...."
                onChange={event => {props.handleTitleSet(event.target.value)}}
                onKeyPress={event => {handleTitleUpdate(event)}} //create function with database
            />
        </div>
    )
}

export default Header