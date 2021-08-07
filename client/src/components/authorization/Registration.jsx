import React, {useState} from 'react'
import './authorization.css'
import Input from '../../utils/input/Input'
import {useDispatch} from 'react-redux'
import {registration} from '../../actions/user'

const Registration = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="authorization">
            <div className="authorization__header">Регистрация</div>
            <Input value={firstName} setValue={setFirstName} type="text" placeholder="Введите имя..."/>
            <Input value={lastName} setValue={setLastName} type="text" placeholder="Введите фамилию..."/>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorization__btn" onClick={() => dispatch(registration(firstName, lastName, email, password)) }>Зарегистрироваться</button>
        </div>
    )
}

export default Registration