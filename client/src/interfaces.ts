export interface TodoIndividualItemInterface {
    id: string,
    setTime? : string,
    isCompleted: boolean,
    references? : string[],
    task: string,
}

export interface TodoCreateIndividualItemInterface{
    todo: TodoIndividualItemInterface[],
    handleTodoCreate: (todo: TodoIndividualItemInterface) => void
}


export interface TodoFormInterface {
    title: string,
    id: string,
    subtasks: TodoIndividualItemInterface[],
    createTask: TodoIndividualItemInterface[],
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoDelete: (id: string) => void;
    handleTodoComplete: (id: string) => void;
    handleTitleSet: (title: string) => void;
    handleTodoCreate: (todo: TodoIndividualItemInterface) => void
}

export interface TodoItemTaskInterface {
    todo: TodoIndividualItemInterface,
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoDelete: (id: string) => void;
    handleTodoComplete: (id: string) => void;
}

export interface TodoItemsInterface {
    todos: TodoIndividualItemInterface[],
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoDelete: (id: string) => void;
    handleTodoComplete: (id: string) => void;
}
export interface individualListInterface{
    listNames: TodoFormInterface[]
}

export interface userListsInterface {
    lists: individualListInterface[]
}