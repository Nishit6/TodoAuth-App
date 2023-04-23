import React, { Fragment, useState } from 'react'
import ShowTodo from './Todos/ShowTodo'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AddTodo from './Todos/AddTodo'
import EditTodo from './Todos/EditTodo'
import Todo from '../models/todo'
import ViewTodos from './Todos/ViewTodos'
import SingUp from './Auth/SingUp'
import Login from './Auth/Login'
import { RootState } from '../store/Store'


export default function Main() {

    const [todoDetailItem, setTodoDetailItem] = useState<Todo[]>([])
    const [userData, setUserData] = useState<Todo[]>([])
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

    const getTodosDetail = (todoDetail: Todo[]) => {
        setTodoDetailItem(todoDetail)
    }


    const getLoginUserResponse = (data: Todo[]) => {
        setUserData(data)
    }
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                {isLoggedIn ? <Route path='/todos' element={<ShowTodo userData={userData} getViewTodos={getTodosDetail} />} /> : <Route path='/todos' element={<Navigate to="/login" />} />}
                {isLoggedIn ? <Route path='/addTodo' element={<AddTodo userData={userData} />} /> : <Route path='/addTodo' element={<Navigate to="/login" />} />}
                {isLoggedIn ? <Route path='/viewTodo/:id/edit' element={<EditTodo todoItem={todoDetailItem} />} /> : <Route path='/viewTodo/:id/edit' element={<Navigate to="/login" />} />}
                {isLoggedIn ? <Route path='/viewTodo/:id/' element={<ViewTodos todoItem={todoDetailItem} />} /> : <Route path='/viewTodo/:id/' element={<Navigate to="/login" />} />}
                <Route path='/register' element={<SingUp />} />
                <Route path='/login' element={<Login loginUserResponse={getLoginUserResponse} />} />


            </Routes>

        </Fragment>
    )
}
