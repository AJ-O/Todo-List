export interface TodoForm {
    title: string,
    subtasks: TodoItemsCard[],
    id: string
}

export interface TodoItemsCard {
    setTime? : Date,
    isCompleted: boolean,
    references? : string[],
    task: string,
    handleTodoUpdate: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    handleTodoDelete: (id: string) => void;
    handleTodoComplete: (id: string) => void;
}