import { useState, useEffect, useRef } from 'react'

function TaskInfo({ Data, deleteItem, dd }) {
    const [ts, setTs] = useState([]);
    const [read, setRead] = useState([])
    const textareaRef = useRef(null);

    useEffect(() => {
        setTs(Data)
        localStorage.setItem("info", JSON.stringify(Data))
        setRead(Data.map(() => true))
    }, [Data])


    const editOrSave = (ind) => {
        if (!ts[ind].task.trim()) return;
        setRead((pre) => {
            const c = [...pre];
            c[ind] = !c[ind];
            return c
        })
    }
    const handleValue = (ind, val) => {
        setTs((pre) => {
            const c = [...pre];
            c[ind].task = val;
            return c
        })
    }

    return (
        <>
            {ts.map((e, i) => (
                <div className='taskDetails' key={i}>
                    <span className='status' onClick={() => dd(e.id)}>{e.done ? <i className="fa-solid fa-circle-check check"></i> : <i className="fa-regular fa-circle uncheck"></i>}</span>
                    <textarea
                        id="addedTask"
                        rows={1}
                        ref={textareaRef}
                        style={{ color: e.done ? "#2BA563" : "#07091C" }}
                        onChange={(e) => {
                            const el = e.target;
                            el.style.height = "auto";
                            el.style.height = el.scrollHeight + "px";
                            if (e.done) {
                                el.style.color = "red"
                            }
                            if (!e.target.value) {
                                textareaRef.current.style.border = "1px solid red"
                            } else {
                                textareaRef.current.style.border = "none"
                            }
                            handleValue(i, e.target.value)
                        }}
                        value={e.task}
                        readOnly={read[i]}></textarea>
                    <button type="submit" id='edit' onClick={() => editOrSave(i)}>{read[i] ? <i className="fa-solid fa-pen-to-square"></i> : <i className="fa-solid fa-save"></i>}</button>
                    <button type="submit" id='delete' onClick={() => deleteItem(e.id)}><i className="fa-solid fa-trash"></i></button>
                </div>
            ))}
        </>
    )
}

export default TaskInfo