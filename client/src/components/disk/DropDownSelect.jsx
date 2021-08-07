import React, { useEffect, useRef } from 'react'

const DropDownSelect = ({click, visibilitySort, setSort, setSelectSort}) => {
    const selectEl = useRef(null)

    useEffect(() => {
        const onClick = e => selectEl.current?.contains(e.target) || click()
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
      }, [visibilitySort])

    return (
        <ul ref={selectEl}>
            <li onClick={() => {setSort("name"); setSelectSort("По имени")}}>По имени</li>
            <li onClick={() => {setSort("type"); setSelectSort("По типу")}}>По типу</li>
            <li onClick={() => {setSort("date"); setSelectSort("По дате")}}>По дате</li>
        </ul>
    )
}

export default DropDownSelect
