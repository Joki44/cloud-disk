import React from 'react'
import UploadFile from './UploadFile'
import './uploader.css'
import { useDispatch, useSelector } from 'react-redux'
import { hideUploader, closeUploader, openUploader } from '../../../reducers/uploadReducer'
import arrowGrey from '../../../assets/img/arrowGrey.svg'
import crossGrey from '../../../assets/img/crossGrey.svg'


const Uploader = () => {
    const files = useSelector(state => state.upload.files)
    const isVisible = useSelector(state => state.upload.isVisible)
    const isOpen = useSelector(state => state.upload.isOpen)
    const dispatch = useDispatch()

    return ( isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Загрузка</div>
                <div className="uploader__btns">
                    <button className={`uploader__close ${!isOpen && "reverse"}`} onClick={() => isOpen ? dispatch(closeUploader()) : dispatch(openUploader())}>
                        <img src={arrowGrey} alt="arrow" height="17"/>
                    </button>
                    <button className="uploader__hide" onClick={() => dispatch(hideUploader())}>
                        <img src={crossGrey} alt="arrow" height="14"/>
                    </button>
                </div>
            </div>
            {isOpen && 
                <div className="uploader__body">
                    {files.map(file =>
                        <UploadFile key={file.id} file={file}/>
                    )}
                </div>
            }
        </div>
    )
}

export default Uploader
