import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './ShowTodo.css'
import axios from 'axios'
import TodoList from './TodoList'
import Todo from '../../models/todo'
import { RootState } from '../../store/Store'



const ShowTodo: React.FC<{ userData: Todo[], getViewTodos: (todo: Todo[]) => void }> = (props) => {

    const [fetchedTodos, setFetchedTodos] = useState<Todo[]>([])

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
    const createdBy = props.userData.map((item) => { return item.email })





    // Function to get all todos

    async function getTodos() {
        await axios.post('/getTodo', { createdBy: createdBy[0] })
            .then((response) => {
                console.log("Response ", response)
                setFetchedTodos(response.data)

            })
            .catch((error) => {
                console.log(error)
            })

    }


    useEffect(() => {

        getTodos()

    }, [])

    console.log(isLoggedIn)

    console.log("fetched todos ", fetchedTodos)



    const viewTodoHandler = (todos: Todo[]) => {

        props.getViewTodos(todos);
    }

    return (
        <Fragment>


            <TodoList items={fetchedTodos} loginUserData={props.userData} viewTodos={viewTodoHandler} />



        </Fragment>
    )
}
export default ShowTodo;