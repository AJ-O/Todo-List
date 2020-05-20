import * as React from 'react'

const Header = (props: any) => {

    const [title, setTitle] = React.useState('');

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    return(
        <div className="list-title">
            <input
                type="text"
                placeholder="Enter title...."
                onChange={event => {handleTitleChange(event)}}
            />
        </div>
    )
}

export default Header