import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Button, Modal, OverlayTrigger, Tooltip, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { MdDoneOutline } from 'react-icons/md'
import Todo from '../../models/todo'
import './ShowTodo.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RootState, authActions } from '../../store/Store'
import { useClearSessionStorage } from "react-use-window-sessionstorage";
import { useSessionStorageBoolean } from "react-use-window-sessionstorage";
import { toast } from 'react-toastify'





const TodoList: React.FC<{ loginUserData: Todo[], items: Todo[], viewTodos: (todo: Todo[]) => void }> = (props) => {

    const [markComplete, setMarkComplete] = useState<any>(false)
    const [todoList, setTodoList] = useState<Todo[]>([])
    const [filter, setFilter] = useState(false)
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
    const [value, setValue] = useSessionStorageBoolean("isLoggedIn", false);
    const clearSession = useClearSessionStorage()

    const dispatch = useDispatch()
    const navigate = useNavigate()


    // Handlers

    const viewTodoHandler = (id: any) => {
        const filteredItem = props.items.filter((item => item.Id.toString() == id))
        props.viewTodos(filteredItem)
    }


    const taskCompletionHandler = (id: any) => {
        let filteredItem = props.items.filter((item => item.Id.toString() == id))
        let filteredStatus = filteredItem.map((item) => { return item.status })
        let status: string = filteredStatus.join()


        if (status === "complete") {
            setMarkComplete({ ...markComplete, [id]: !markComplete[id] })
        }



    }

    useEffect(() => {
        if (props.loginUserData.length === 0) {
            setValue(false)
            clearSession()
            sessionStorage.clear()
            dispatch(authActions.isLoggedIn(value))
            navigate('/login', { replace: true })
        }
    })


    async function logoutUser() {

        await axios.get('/logout')
            .then((response) => {
                if (response.status !== 200) {
                    toast.error("Something went wrong!")
                }

                console.log(" Logout  Response ", response)

                setValue(false)
                clearSession()
                sessionStorage.clear()
                dispatch(authActions.isLoggedIn(value))
                navigate('/login', { replace: true })

                toast.success("Logged out successfully!")



            })
            .catch((error) => {

                toast.error(error)
                dispatch(authActions.isLoggedIn(false))
            })




    }


    const logoutHandler = () => {
        logoutUser()
    }

    //Applying Filter Logic

    const switchButtonHandler = (event: ChangeEvent<HTMLSelectElement>) => {

        setFilter(true)
        if (event.target.value === "completed") {

            setTodoList(props.items.filter((item => { return item.status === "complete" })))

            console.log("todoist ", todoList)
        }
        if (event.target.value === "pending") {

            setTodoList(props.items.filter((item => { return item.status === "pending" })))

            console.log("todoist ", todoList)
        }
        if (event.target.value === "all") {

            setTodoList(props.items.filter((item => { return item })))

            console.log("todoist ", todoList)
        }
    }



    return (
        <Fragment>
            <h1 className='todo-heading'>Todo List</h1>


            {props.loginUserData.map((item) => { return <h3 className='todo-welcome'>{` Welcome ${item.username} !`}</h3> })}

            <div className='filter-container'>

                <Form.Select onChange={switchButtonHandler} aria-label="Default select example">
                    <option>Filter</option>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </Form.Select>



            </div>


            {props.items.length === 0 && <h1 className='nodata' >Add Your First Todo!</h1>}

            {

                filter ? todoList.map((item) => (



                    < div key={item.Id}
                        className="modal show "
                        style={{ display: 'block', position: 'initial' }}
                    >

                        <Modal.Dialog className='todo-modal'>
                            <Modal.Header className='modal-header'  >

                                <Modal.Title className={item.status === "complete" ? 'modal-header-completed' : 'todo-task'} >{item.task}</Modal.Title>
                                <div>
                                    <Link to={`/viewTodo/${item.Id}`} className='me-2'>   <Button className='button-view' onClick={() => viewTodoHandler(item.Id)}  >View</Button></Link>
                                    <OverlayTrigger
                                        key={item.Id}
                                        placement="right"

                                        overlay={
                                            <Tooltip style={item.status === "complete" ? { "backgroundColor": "lightgreen" } : { "backgroundColor": "maroon" }} id={`tooltip-${item.status}`}>
                                                <strong>{item.status}</strong>.
                                            </Tooltip>
                                        }
                                    >
                                        {item.status === "complete" ? <Button className='button-completed' variant="success" onClick={() => taskCompletionHandler(item.Id)} ><MdDoneOutline /></Button> :



                                            <Button className='button-status' title='hello' variant={markComplete[item.Id] ? "success" : "secondary"} onClick={() => taskCompletionHandler(item.Id)} ><MdDoneOutline /></Button>}
                                    </OverlayTrigger>
                                </div>

                            </Modal.Header>





                        </Modal.Dialog>


                    </div>

                )

                )

                    : props.items.map((item) => (



                        < div key={item.Id}
                            className="modal show "
                            style={{ display: 'block', position: 'initial' }}
                        >

                            <Modal.Dialog className='todo-modal'>
                                <Modal.Header className='modal-header'  >

                                    <Modal.Title className={item.status === "complete" ? 'modal-header-completed' : 'todo-task'} >{item.task}</Modal.Title>
                                    <div>
                                        <Link to={`/viewTodo/${item.Id}`} className='me-2'>   <Button className='button-view' onClick={() => viewTodoHandler(item.Id)}  >View</Button></Link>
                                        <OverlayTrigger
                                            key={item.Id}
                                            placement="right"

                                            overlay={
                                                <Tooltip style={item.status === "complete" ? { "backgroundColor": "lightgreen" } : { "backgroundColor": "maroon" }} id={`tooltip-${item.status}`}>
                                                    <strong>{item.status}</strong>.
                                                </Tooltip>
                                            }
                                        >
                                            {item.status === "complete" ? <Button className='button-completed' variant="success" onClick={() => taskCompletionHandler(item.Id)} ><MdDoneOutline /></Button> :



                                                <Button className='button-status' title='hello' variant={markComplete[item.Id] ? "success" : "secondary"} onClick={() => taskCompletionHandler(item.Id)} ><MdDoneOutline /></Button>}
                                        </OverlayTrigger>
                                    </div>

                                </Modal.Header>




                            </Modal.Dialog>


                        </div>

                    )

                    )}
            <div className='todoList-btns'>
                <Link to="/addTodo" className='.link-btn'> <Button className='add-todo-btn me-2' variant='info' type='button' >Add Todo</Button></Link>
                {isLoggedIn && <div><Button className='add-todo-btn' onClick={logoutHandler} variant='danger' type='button' >Logout</Button></div>}
            </div>
        </Fragment >

    )
}

export default TodoList