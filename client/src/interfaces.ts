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
    handleTodoCreate: (todo: TodoIndividualItemInterface, todos?: TodoIndividualItemInterface[], id?: string) => void
}


export interface TodoFormInterface {
    title: string,
    id: string,
    todos: TodoIndividualItemInterface[],
    createTask: TodoIndividualItemInterface[],
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoDelete: (listId: string, todoId: string) => void;
    handleTodoComplete: (listId: string, todoId: string) => void;
    handleTitleSet: (title: string) => void;
    handleTodoCreate: (todo: TodoIndividualItemInterface) => void
}

export interface TodoItemTaskInterface {
    todo: TodoIndividualItemInterface,
    id: string;
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoDelete: (listId: string, todoId: string) => void;
    handleTodoComplete: (listId: string, todoId: string) => void;
}

export interface TodoItemsInterface {
    id: string;
    todos: TodoIndividualItemInterface[],
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoDelete: (listId: string, todoId: string) => void;
    handleTodoComplete: (listId: string, todoId: string) => void;
}

export interface individualListInterface{
    listNames: TodoFormInterface[];
    useremail: String;
    //Create new functions....
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoDelete: (listId: string, todoId: string) => void;
    handleTodoComplete: (listId: string, todoId: string) => void;
    handleTitleSet: (title: string) => void;
    handleTodoCreate: (todo: TodoIndividualItemInterface) => void
}

export interface userListsInterface {
    lists: individualListInterface[];
}