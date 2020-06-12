export interface TodoIndividualItemInterface {
    id: string,
    setTime? : string,
    isCompleted: boolean,
    references? : string[],
    task: string,
}

export interface TodoCreateIndividualItemInterface{
    id?: string;
    todo: TodoIndividualItemInterface[],
    handleTodoCreate: (todo: TodoIndividualItemInterface, listId?: string) => void
}


export interface TodoFormInterface {
    title: string,
    id: string,
    todos: TodoIndividualItemInterface[],
    createTask: TodoIndividualItemInterface[],
    listType: string,
    handleTodoDelete: (listId: string, todoId: string) => void;
    handleTodoComplete: (listId: string, todoId: string) => void;
    handleTitleSet: (title: string, listId? :string) => void;
    handleTodoCreate: (todo: TodoIndividualItemInterface) => void;
    updateValueInDatabase?: (event: React.KeyboardEvent, listId: string, todoId: string, type: string) => void;
}

export interface TodoItemTaskInterface {
    todo: TodoIndividualItemInterface,
    id: string;
    handleTodoDelete: (listId: string, todoId: string) => void;
    handleTodoComplete: (listId: string, todoId: string) => void;
    updateValueInDatabase?: (event: React.KeyboardEvent, listId: string, todoId: string, type: string) => void;
}

export interface TodoItemsInterface {
    id: string;
    todos: TodoIndividualItemInterface[],
    handleTodoDelete: (listId: string, todoId: string) => void;
    handleTodoComplete: (listId: string, todoId: string) => void;
    updateValueInDatabase?: (event: React.KeyboardEvent, listId: string, todoId: string, type: string) => void;
}

export interface individualListInterface{
    lists: TodoFormInterface[];
    useremail: String;
    handleTitleSet: (title: string) => void;
}

export interface headerInterface {
    title: string,
    listType: string,
    listId: string
    handleTitleSet:(newTitle: string, listId?: string) => void
}