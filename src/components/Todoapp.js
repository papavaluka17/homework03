import { useEffect, useRef, useState } from "react";
import Button from "./Button";

const todoapp = [
    {
        id: 1, text: 'text 1', completed: false
    },
    {
        id: 2, text: 'text 2', completed: false
    },
    {
        id: 3, text: 'text 3', completed: true
    }
];

export default function Todoapp() {

    const [inputvalue, setinputvalue] = useState('');
    const [newinputValue, setnewinputValue] = useState(todoapp)

    const input = useRef();

    useEffect(() => {
      input.current.focus()
    }, [newinputValue])

    function handleSubmit(e) {
        e.preventDefault();
        var todoitem = {
            id: Date.now(), text: inputvalue, completed: false
        }

        if (inputvalue) {
            setnewinputValue([...newinputValue, todoitem])
        } else {
            alert('The value is not defined')
        }
        setinputvalue('');
    }

    function chekedInput(id) {
        const chekedArr = newinputValue.map(item => {
            if (item.id === id) {
                item.completed = !item.completed
            }
            return item
        })
        setnewinputValue(chekedArr);
    }

    function deleteList(index) {
        const newtodo = newinputValue
        newtodo.splice(index, 1)
        setnewinputValue([...newtodo])
    }

    return (
        <div className="todoapp-box">
            <form action="#" className="form" onSubmit={handleSubmit}>
                <input ref={input} type="text" value={inputvalue} onChange={(e) => setinputvalue(e.target.value)} />
                <Button text="add" />
            </form>
            <ul>
                {
                    newinputValue.map((item, index) => {
                        return (
                            <li key={index} className="li">
                                <input type="checkbox" checked={item.completed} onChange={() => chekedInput(item.id)} />
                                <span> {item.text} </span>
                                <Button text="delete" onClick={() => deleteList(index)} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}