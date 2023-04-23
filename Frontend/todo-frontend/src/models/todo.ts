class Todo {
    task: string;
    description: string;
    Id: number;
    created_date: string;
    status: string;
    isLoggedIn: boolean;
    username: string;
    email: string;

    constructor(todoText: string, todoDesc: string, todoId: number, todoTime: string, todoStatus: string, isLoggedIn: boolean, username: string, email: string) {
        this.task = todoText;
        this.description = todoDesc;
        this.Id = todoId;
        this.created_date = todoTime;
        this.status = todoStatus;
        this.isLoggedIn = isLoggedIn;
        this.username = username;
        this.email = email
    }
}

export default Todo;