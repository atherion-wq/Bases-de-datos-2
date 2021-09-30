
//Se debe utilizar de forma que no mute el valor, si no que lo haga desde el reducer.

const initialState=[{
    id:1,
    todo: 'Comprar agua',
    done:false
}];

const todoReducer=(state=initialState,action)=>{
    if(action?.type==='agregar'){
        return [...state,action.payload]
    }
    return state;
}

let todos=todoReducer();

const newTodo={
    id:2,
    todo: 'Comprar sopas',
    done:false
}

const agregarTodoAction={
    type: 'agregar',           //estandar
    payload:newTodo
}
todos=todoReducer(todos,agregarTodoAction);

console.log(todos);