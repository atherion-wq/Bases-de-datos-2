import React, { Fragment } from 'react'
import { TodoListItem } from './TodoListItem'

export const TodoList = ({ todos, handleDelete, handleToggle }) => {
    return (
        <Fragment>
            <ul className='list-group list-grouo-flush'>
                {
                    todos.map((todo, i) => (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            i={i}
                            handleDelete={handleDelete}
                            handleToggle={handleToggle}

                        />
                    ))
                }
            </ul>
        </Fragment>
    )
}
