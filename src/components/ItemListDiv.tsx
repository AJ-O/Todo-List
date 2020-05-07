import * as React from 'react'

import TodoListItem from './mainTodoItems'

class ItemsList extends React.Component {
    render(){
        return(
            <div>
                <TodoListItem />
            </div>
        )
    }
}

export default ItemsList