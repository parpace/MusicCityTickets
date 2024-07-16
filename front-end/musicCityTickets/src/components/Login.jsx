import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Login () {
  const loggedInUser = localStorage.getItem('loggedInUser')

  const initialState = {
    username: '',
    password: '',
    error: ''
  }

  const [formState, setFormState] = useState(initialState)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (loggedInUser) {
        navigate(`/`)
    }

    const getUsers = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/`)
        setUsers(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Could not find users', error)
      }
    }
    getUsers()
  }, [loggedInUser, navigate])

  const loginUser = async (userId) => {
      localStorage.setItem('loggedInUser', userId)
      navigate(`/`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = users.find(user => user.user_name === formState.username)
    
    // Checks if user exists
    if (!user) {
      setFormState({
        ...formState,
        error: 'Username does not exist'
      })
      return
    }
    // Checks Password
    if (user.password !== formState.password) {
      setFormState({
        ...formState,
        error: 'Incorrect Password'
      })
      return
    }
    loginUser(user.id)
  }
  const handleChange = (e) => {
    setFormState({...formState,
      [e.target.id] : e.target.value,
      error:''
    })
  }
  return (
    <div className="welcomeContainer">

      <form className="loginContainer" onSubmit={handleSubmit}>
        <div className="usernameLogin">
        <input type="text" id="username" placeholder="User Name" onChange={handleChange} value={formState.username} />
        </div>

        <div className="passwordLogin">
          <input type="password" id="password" placeholder="Enter your password" onChange={handleChange} value={formState.password} />
        </div>

        {formState.error && <p style={{ color: 'red' }}>{formState.error}</p>}

        <div className="submitBtnContainer">
          <button className="submitBtn" type="submit">Log in</button>
        </div>
      </form>
    </div>
  )
}