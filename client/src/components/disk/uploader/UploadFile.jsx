import React from 'react'
import './uploader.css'
import checkmark from '../../../assets/img/checkmark.svg'

const UploadFile = ({file}) => {
    return (
        <div className="upload-file">
            <div className="upload-file__header">
                <div className="upload-file__name">{file.name}</div>
                { file.progress === 100 ?
                    <div className="upload-file__checkmark">
                        <img src={checkmark} alt="checkmark" height="17"/>
                    </div>
                    :
                    <div class="upload-file__container">
                        <div class="upload-file__speeding-wheel"/>
                    </div>
                }
            </div>
        </div>
    )
}

export default UploadFile
