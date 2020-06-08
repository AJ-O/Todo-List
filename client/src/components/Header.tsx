import * as React from 'react'

const Header = (props: any) => {

    const [title, setTitle] = React.useState(props.title);

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function handleTitleUpdate(event: React.KeyboardEvent) {
        let newTitle;
        if (event.key === "Enter") {
            newTitle = title;
        }

        props.handleTitleSet(newTitle);

    }

    return(
        <div className="list-title">
            <input
                type="text"
                value={title}
                placeholder="Enter title...."
                onChange={event => {handleTitleChange(event)}}
                onKeyPress={event => {handleTitleUpdate(event)}}
            />
        </div>
    )
}

export default Header