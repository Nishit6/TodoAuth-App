import React, { Fragment, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import '../Todos/AddTodo.css'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addTodoActions, authActions } from '../../store/Store'
import { useDispatch } from 'react-redux'
import { useSessionStorageBoolean } from "react-use-window-sessionstorage";


const Login: React.FC<{ loginUserResponse: (loggedInUserDetails: any) => void }> = (props) => {





    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [value, setValue] = useSessionStorageBoolean("isLoggedIn", false);
    const dispatch = useDispatch()
    const navigate = useNavigate()







    // Input Handlers


    const inputEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value
        setEmail(emailValue)


    }

    const inputPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value
        setPassword(passwordValue)


    }




    // function for sending request to add Todo

    async function registerUser(email: string, password: string) {

        await axios.post('/login', { email: email, password: password })
            .then((response) => {
                if (response.status !== 200) {
                    toast.error("Something went wrong!")
                }
                if (response.data == "Invalid Email") {
                    toast.error("Something went wrong!")
                    return
                }
                if (response.data == "Wrong Email or Password!") {
                    toast.error(response.data)
                    return
                }
                console.log(" Login User Response ", response)
                props.loginUserResponse(response.data)
                setValue(true)

                console.log("Value", value)


                toast.success("Logged In successfully!")



            })

            .catch((error) => {

                toast.error(error)
            })


    }

    if (value) {
        console.log("Val ", value)
        dispatch(authActions.isLoggedIn(value))
        navigate('/todos', { replace: true })
    }

    // form submit Handler

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()



        if (email.length === 0 || password.length === 0) {
            return
        } else if (password.length < 6) {
            toast.error("Password too short!")
            return
        } else {
            registerUser(email, password)
        }

    }

    return (
        <Fragment>

            <h1 className='todo-heading'>Log In</h1>
            <div className='add-todo-form'>

                <Form onSubmit={submitHandler}>
                    <div className='form-grp'>

                        <Form>



                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required={true} onChange={inputEmailHandler} type="email" placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required={true} onChange={inputPasswordHandler} type="password" placeholder="Password" />
                            </Form.Group>


                        </Form>
                    </div>
                    <Button variant="success" className='addTodo-btn' type="submit">
                        Login
                    </Button>
                    <Link to="/register"><p>Not registered?</p></Link>

                </Form>
            </div>
        </Fragment>
    )
}

export default Login