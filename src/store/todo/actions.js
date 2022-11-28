export const CREATE_TODO = 'CREATE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const SET_TODOS = 'SET_TODOS'

export const createTodo = (todo) => ({
    type: CREATE_TODO,
    payload: todo,
})

export const deleteTodo = (todo) => ({
    type: DELETE_TODO,
    payload: todo,
})

export const setTodos = (todos) => ({
    type: SET_TODOS,
    payload: todos
})

export const updateTodo = (todo) => ({
    type: UPDATE_TODO,
    payload: todo
})