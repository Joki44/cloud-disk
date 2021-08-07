import React from 'react'
import './file.css'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import {useDispatch, useSelector} from 'react-redux'
import {pushToStack, setCurrentDir} from '../../../../reducers/fileReducer'
import {deleteFile, downloadFile} from '../../../../actions/file'
import sizeFormat from '../../../../utils/sizeFormat'
import download from '../../../../assets/img/download.svg'
import trashСan from '../../../../assets/img/trashСan.svg'


const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)

    function openDirHandler(file) {
        if(file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    if (fileView === 'list') {
        return (
            <div className="file" >
                <img src={file.type === 'dir' ? dirLogo : fileLogo}
                    alt={file.type} 
                    className="file__img" 
                    onClick={() => openDirHandler(file)} 
                />
                <div className="file__name" >
                    <span onClick={() => openDirHandler(file)}>
                        {file.name}
                    </span>
                </div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {file.type !== 'dir' &&
                    <button 
                        onClick={(e) => downloadClickHandler(e)} 
                        className="file__btn file__download"
                    >
                        <img src={download} alt="download"/>
                    </button>
                }
                <button 
                    onClick={(e) => deleteClickHandler(e)} 
                    className="file__btn file__delete"
                >
                    <img src={trashСan} alt="delete"/>
                </button>
            </div>
        )
    }
    if (fileView === 'plate') {
        return (
            <div className="file-plate" >
                <img 
                    className="file-plate__img" 
                    onClick={() => openDirHandler(file)}
                    src={file.type === 'dir' ? dirLogo : fileLogo} 
                    alt={file.type} 
                />
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                        <button 
                            onClick={(e) => downloadClickHandler(e)} 
                            className="file-plate__btn file-plate__download"
                        >
                            <img src={download} alt="download"/>
                        </button>}
                    <button 
                        onClick={(e) => deleteClickHandler(e)} 
                        className="file-plate__btn file-plate__delete"
                    >
                        <img src={trashСan} alt="delete"/>
                    </button>
                </div>
            </div>
        )
    }
}

export default File