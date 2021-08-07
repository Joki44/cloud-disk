import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFiles, uploadFile, searchFiles} from '../../actions/file'
import {showLoader} from '../../reducers/appReducer'
import {setCurrentDir, setFileView, setPopupDisplay} from '../../reducers/fileReducer'

import FileList from './fileList/FileList'
import CreateDirPopup from './CreateDirPopup'
import DropDownSelect from './DropDownSelect'
import DropDownCreate from './DropDownCreate'
import Uploader from './uploader/Uploader'

import back from '../../assets/img/back.svg'
import arrowBlue from '../../assets/img/arrowBlue.svg'
import loupe from '../../assets/img/loupe.svg'

import './disk.css'

const Disk = () => {
    const searchEl = useRef(null)
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)
    const loader = useSelector(state => state.app.loader)
    const dirStack = useSelector(state => state.files.dirStack)
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')
    const [visibilitySort, setVisibilitySort] = useState(false)
    const [visibilityCreate, setVisibilityCreate] = useState(false)
    const [selectSort, setSelectSort] = useState('По типу')

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value))
            }, 500, e.target.value))
        } 
        else {
            dispatch(getFiles(currentDir))
        }
    }

    if(loader) {
        return (
            <div className="loader">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    return ( !dragEnter ?
            <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <div className="disk__row">
                    <div className="disk__search">
                        <div className="loupe"
                            onClick={() => searchEl.current.focus()}
                        >
                            <div className="icon__container"/>
                            <img className="icon" src={loupe} height="12"/>
                        </div>
                        <input
                            value={searchName}
                            ref={searchEl}
                            onChange={e => searchChangeHandler(e)}
                            className='disk__search-input'
                            type="text"
                            placeholder="Поиск"
                        />
                    </div>
                    <div className='disk__select'>
                        <span className={visibilitySort? 'line' : '' }
                            onClick={() => setVisibilitySort(!visibilitySort)}
                        > 
                            {selectSort} <img src={arrowBlue} height={8}/>
                        </span>
                        {visibilitySort && 
                            <DropDownSelect click={() => setVisibilitySort(!visibilitySort)} 
                                visibilitySort={visibilitySort} 
                                setSort={setSort} 
                                setSelectSort={setSelectSort}
                            />   
                        }
                    </div>
                    {fileView === 'plate'? 
                        <button className="disk__list" onClick={() => dispatch(setFileView('list'))}/>
                        :
                        <button className="disk__plate" onClick={() => dispatch(setFileView('plate'))}/>
                    }
                </div>
                <div className="disk__btns">
                    <div className="disk__back-container">
                        <button className="disk__back" onClick={() => backClickHandler()}><img src={back} alt="back"/></button> 
                    </div>
                    <div className="disk__create-container">
                        <button className="disk__create" onClick={() => setVisibilityCreate(!visibilityCreate)}>Создать</button>
                        <div className="disk__create-menu">
                            {visibilityCreate && 
                                <DropDownCreate 
                                    onClick={() => showPopupHandler()} 
                                    visibilityCreate={visibilityCreate} 
                                    setVisibilityCreate={setVisibilityCreate}
                                />
                            }
                        </div>
                    </div>
                </div>
                <FileList/>
                <CreateDirPopup/>
                <Uploader/>
            </div>
            :
            <div className="drop-area" 
                onDrop={dropHandler} 
                onDragEnter={dragEnterHandler} 
                onDragLeave={dragLeaveHandler} 
                onDragOver={dragEnterHandler}
            >
                Перетащите файлы сюда
            </div>
    )
}

export default Disk
