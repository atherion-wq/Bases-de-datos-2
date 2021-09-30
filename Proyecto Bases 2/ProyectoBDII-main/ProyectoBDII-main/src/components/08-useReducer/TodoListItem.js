import React, { Fragment } from 'react'

export const TodoListItem = ({ todo, i, handleDelete, handleToggle }) => {
    return (
        <Fragment>
            <li
                key={todo.id}
                className='list-group-item'
            ><p
                className={`${(todo.done && 'complete') || 'incompleto'}`}
                onClick={() => handleToggle(todo.id)}
            >
                    {i + 1}.{todo.desc}
                </p>
                <button
                    className="btn btn-danger mr-3"
                    onClick={() => handleDelete(todo.id)}
                >
                    Borrar
                                </button>
            </li>
        </Fragment>
    )
}
