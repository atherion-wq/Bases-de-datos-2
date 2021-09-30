import React,{memo} from 'react'

export const Small = memo(({value}) => {
    console.log('Yo de nuevo ;(');
    return (
        <small>
            {value}
        </small>
    )
})
