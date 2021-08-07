import React, { useEffect, useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {deleteAvatar, uploadAvatar} from '../../../actions/user'
import {logout} from '../../../reducers/userReducer'
import './profile.css'
import uploadavatar from '../../../assets/img/uploadavatar.svg'
import trashСan from '../../../assets/img/trashСan.svg'
import logouticon from '../../../assets/img/logouticon2.svg'
import avatarLogo from '../../../assets/img/avatar.svg'

const Profile = ({click, avatar, z}) => {
    const dispatch = useDispatch()
    const firstName = useSelector(state => state.user.currentUser.firstName)
    const lastName = useSelector(state => state.user.currentUser.lastName)

    const profileEl = useRef(null)

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }
    useEffect(() => {
        const onClick = e => profileEl.current?.contains(e.target) || click()
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
      }, [click])

    return (
        <div className="profile" >
            <div className="profile__container" div ref={profileEl}>
                <div className="profile__info">
                    <img className="profile__avatar" src={avatar} alt="avatar"/>
                    <h3 className="profile__firstName">{firstName}</h3>
                    <h3 className="profile__lastName">{lastName}</h3>
                </div>
                <div className="profile__btns">
                    <div className="profile__upload">
                        <label 
                            htmlFor="profile__upload-input" 
                            className="profile__upload-label"
                        >
                            <img src={uploadavatar} alt="uploadavatar"/> 
                            Загрузить аватар
                        </label>
                        <input 
                            id="profile__upload-input"
                            className="profile__upload-input"  
                            accept="image/*" 
                            onChange={e => changeHandler(e)} 
                            type="file" 
                            placeholder="Загрузить аватар"
                        />
                    </div>
                    {avatar !== avatarLogo && 
                        <div className="profile__delete">
                            <button 
                                className="profile__delete-btn" 
                                onClick={() => dispatch(deleteAvatar())}
                            >
                                <img src={trashСan} alt="deleteAvatar"/> 
                                Удалить аватар
                            </button>
                        </div>
                    }
                    <div className="profile__logout">
                        <button 
                            className="profile__logout-btn" 
                            onClick={() => dispatch(logout())}
                        >
                            <img src={logouticon} alt="logout"/> 
                            Выйти
                        </button> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
