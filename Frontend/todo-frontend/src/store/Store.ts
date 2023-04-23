import { createSlice, configureStore } from "@reduxjs/toolkit";
import Todo from "../models/todo";


export interface TodoState {
    task: string
    description: string
}

export interface AuthState {

    isLoggedIn: boolean
}

export interface TodoList {
    todoList: any
}

const initialState: TodoState = { task: '', description: '' }

const addTodoSlice = createSlice({
    name: 'add-todo',
    initialState: initialState,
    reducers: {
        addTask(state, action) {
            state.task = action.payload



        },
        addDescription(state, action) {
            state.description = action.payload



        }




    }
})

const editTodoSlice = createSlice({
    name: 'edit-todo',
    initialState: initialState,
    reducers: {
        addTask(state, action) {
            state.task = action.payload

            state.description = state.description


        },
        addDescription(state, action) {
            state.description = action.payload
            state.task = state.task



        }



    }
})

const todoListSlice = createSlice({
    name: 'todo-list',
    initialState: { todoList: [] },
    reducers: {
        storeTodos(state, action) {
            state.todoList = action.payload
        }


    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false },
    reducers: {


        isLoggedIn(state, action) {
            state.isLoggedIn = action.payload

        }

    }
})




const store = configureStore({
    reducer: { editState: editTodoSlice.reducer, addState: addTodoSlice.reducer, todoList: todoListSlice.reducer, auth: authSlice.reducer }
})
export type RootState = ReturnType<typeof store.getState>
export const addTodoActions = addTodoSlice.actions;
export const editTodoActions = editTodoSlice.actions;
export const todoListActions = todoListSlice.actions;
export const authActions = authSlice.actions;
export default store;