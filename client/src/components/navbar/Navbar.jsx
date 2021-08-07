import React, { useState } from 'react'
import './navbar.css'
import Logo from '../../assets/img/navbar-logo.svg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import avatarLogo from '../../assets/img/avatar.svg'
import { API_URL, URL } from '../../config'
import Profile from './profile/Profile'

const Navbar = () => {
    const [url, setUrl] = useState(window.location.href)
    const isAuth = useSelector(state => state.user.isAuth)
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
    const [visibilitiPopupAvatar, setVisibilitiPopupAvatar] = useState(false)
    
    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="MERN CLOUD" className="navbar__logo"/>
                <div className="navbar__header">MERN CLOUD</div>
                {!isAuth && (url === `${URL}/registration`? 
                        <div className="navbar__auth">
                            <NavLink 
                                to="/login" 
                                onClick={() => setUrl(`${URL}/login`)}
                            >
                                Войти
                            </NavLink>
                        </div> 
                        :
                        <div className="navbar__auth">
                            <NavLink 
                                to="/registration" 
                                onClick={() => setUrl(`${URL}/registration`)}
                            >
                                Регистрация
                            </NavLink>
                        </div>
                    )
                }
                {isAuth && 
                    <img 
                        className="navbar__avatar" 
                        src={avatar} alt="avatar" 
                        onClick={() => setVisibilitiPopupAvatar(!visibilitiPopupAvatar)}
                    />
                }
                {visibilitiPopupAvatar && <Profile click={() => setVisibilitiPopupAvatar(!visibilitiPopupAvatar)} avatar={avatar}/>} 
            </div>
        </div>
    )
}

export default Navbar
