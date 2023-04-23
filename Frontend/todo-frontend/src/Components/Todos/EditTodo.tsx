import React, { Fragment, useRef, useState } from "react"
import { Form, Button, InputGroup } from 'react-bootstrap'
import { RootState, editTodoActions } from '../../store/Store'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify"
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './AddTodo.css'
import Todo from "../../models/todo"


const EditTodo: React.FC<{ todoItem: Todo[] }> = (props) => {



    const dispatch = useDispatch()
    const navigate = useNavigate()
    const taskState = useSelector((state: RootState) => state.editState.task)
    const descriptionState = useSelector((state: RootState) => state.editState.description)
    const [statusState, setStatusState] = useState<string>('')




    // input Handlers

    const taskHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const taskValue = event.target.value
        dispatch(editTodoActions.addTask(taskValue))
    }

    const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const descValue = event.target.value
        dispatch(editTodoActions.addDescription(descValue))
    }

    const selectInputHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {


        if (event.target.value === 'pending') {
            setStatusState("pending")
        }
        if (event.target.value === 'complete') {
            setStatusState("complete")

        }
    }

    // Function to send request for editing todo

    async function addTasksToDb(task: string, desc: string, status: string, id: any) {

        await axios.patch(`/editTodo/${id}`, { task: task, description: desc, status: status })
            .then((response) => {
                console.log(" Add Todo Response ", response)
                navigate('/todos', { replace: true })
                toast.success("Todo Updated Successfully!")
            })
            .catch((error) => {
                console.log(error)
                toast.error(error)
            })
    }


    //Form Submit Handler

    const submitHandler = (id: any) => {


        console.log(taskState)
        console.log(descriptionState)
        console.log(statusState)


        if (taskState.length === 0 && descriptionState.length === 0 && statusState.length === 0) {
            toast.error("Please update something first!")
            return
        } else {

            addTasksToDb(taskState, descriptionState, statusState, id)
        }


    }

    return (
        <Fragment>
            <h1 className="todo-heading">Edit Todo</h1>
            {props.todoItem.map((item) => (
                <div className='add-todo-form'>

                    <Form >
                        <div className='form-grp'>
                            <Form.Group className="mb-3 " controlId="formBasicEmail">
                                <Form.Label>Task</Form.Label>
                                <Form.Control onChange={taskHandler} defaultValue={item.task} required={true} type="text" placeholder="Enter Task" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Task Description</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>Write here</InputGroup.Text>
                                    <Form.Control as="textarea" required={true} defaultValue={item.description} onChange={descriptionHandler} aria-label="With textarea" />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Set Status</Form.Label>
                                <Form.Select defaultValue={item.status} onChange={selectInputHandler} aria-label="Default select example">
                                    <option value="select">Select</option>
                                    <option value="pending">Pending</option>
                                    <option value="complete">Completed</option>

                                </Form.Select>
                            </Form.Group>
                        </div>
                        <Button variant="success" className='addTodo-btn' type="button" onClick={() => submitHandler(item.Id)}>
                            Edit
                        </Button>
                        <Link to="/"><Button variant="danger" className='addTodo-btn' type="button">
                            Cancel
                        </Button></Link>
                    </Form>
                </div>

            ))}

        </Fragment>
    )
}

export default EditTodo