import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile } from '../../actions/file'

const DropDownCreate = ({onClick, visibilityCreate, setVisibilityCreate}) => {
    const dropDownCreateEl = useRef(null)
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    useEffect(() => {
        const onClick = e => dropDownCreateEl.current?.contains(e.target) || setVisibilityCreate(false)
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
      }, [visibilityCreate])

    function fileUploadHandler(event) {
      const files = [...event.target.files]
      files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }
    
    return (
        <div className="drop-down-create">
            <div className="drop-down-create__container" ref={dropDownCreateEl}>
                <div className="drop-down-create__header">Создать</div>
                <div className="drop-down-create__btns">
                    <div className="drop-down-create__create-dir-container">
                        <button className="drop-down-create__create-dir" onClick={onClick}>Создать папку</button>
                    </div>
                    <div className="drop-down-create__upload">
                        <label htmlFor="drop-down-create__upload-input" 
                            className="drop-down-create__upload-label"
                        >
                            Загрузить файл
                        </label>
                        <input multiple={true} 
                            onChange={(event) => fileUploadHandler(event)} 
                            type="file" 
                            id="drop-down-create__upload-input" 
                            className="drop-down-create__upload-input"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DropDownCreate
