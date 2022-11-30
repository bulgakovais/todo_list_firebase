import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTodoRefById } from '../../services/firebase'
import { onValue, update, remove } from "firebase/database"
import { getTodoList } from "../../store/todo/selector"
import { setTodos } from "../../store/todo/actions"
import { todosRef } from '../../services/firebase'
import '../../App.less'
import { CreateTodo } from "../CreateTodo/CreateTodo"
import { DescriprionTodo } from "../DescriptionTodo/DescriptionTodo"




export function Todo() {

    const [seeTodo, setSeeTodo] = useState(false)
    const [todoId, setTodoId] = useState('')
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const todos = useSelector(getTodoList)

    /**
     * При загрузке страницы подгружает список todo из БД,
     * записывает его в store
     */
    useEffect(() => {

        const unsubscribe = onValue(todosRef, (snapShots) => {
            const newTodos = []

            snapShots.forEach(snapshot => {
                newTodos.push(snapshot.val())
            })
            dispatch(setTodos(newTodos))
        })

        return unsubscribe
    }, [])

    /** 
    * Создает todo с обновленным статусом
    * @param {object} el - измененный todo
    * @param {boolean} status - статус todo
    * @return {object} updateTodo
    */
    function getUpdateTodo(el) {
        const updateTodo = {
            status: !el.status
        }
        return updateTodo
    }

    /** 
     * Отправляет обновленный todo в БД
     * @params {object} el измененный todo
     */
    const handleChangeStatus = (el) => {
        const updateTodo = getUpdateTodo(el)
        update(getTodoRefById(el.id), updateTodo)
    }

    /** 
    * Меняет булевое значение параметра seeTodo
    * @param {string} id - id выбранного todo
    */
    const handlerSeeTodo = (id) => {
        if (id === todoId) {
            setSeeTodo(!seeTodo)
        }
        else if (id !== todoId) {
            setSeeTodo(true)
        }
    }

    /** 
    * Удаляет из БД todo по id
    * @param {object} el - выбранный todo
    */
    function deleteTodo(el) {
        remove(getTodoRefById(el.id))
    }


    return (<>
        <h3 className='todoHeader'>Имеющиеся задачи</h3>
        <div>{todos?.map((el) => (
            <div id={el.id} className='todoItem' key={el.id}>
                <div className='todoItem_flex'>

                    <button id='check' className='btn_todo' onClick={() => {
                        handleChangeStatus(el)
                    }}>
                        {
                            el.status ? (
                                <i className="fa fa-check-circle" aria-hidden="true"></i>
                            ) : <i className="fa fa-circle-o" aria-hidden="true"></i>
                        }
                    </button>

                    <h4 className='todoItem_title'>{el.title}</h4>
                    <div className='params_check_todo'>

                        <button id='see' className='btn_todo' onClick={() => {
                            setTodoId(el.id)
                            handlerSeeTodo(el.id)
                        }}><i className="fa fa-eye" aria-hidden="true"></i>
                        </button>

                        <button id='edit' className='btn_todo' onClick={() => {
                            setTodoId(el.id)
                            setEdit(!edit)
                        }}><i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>

                        <button id='delete' className='btn_todo btn_todo_delete' onClick={
                            () => {
                                deleteTodo(el)
                            }}><i className="fa fa-times" aria-hidden="true"></i>
                        </button>

                    </div>
                </div>

                {todoId === el.id && seeTodo && !edit ? (
                    <DescriprionTodo el={el} ></DescriprionTodo>
                )
                    : (<p></p>)}

                {todoId === el.id && edit ?
                    (<div className='updateTodoFlex'>
                        <CreateTodo
                            title={el.title}
                            descr={el.description}
                            file={el.file}
                            status={el.status}
                            id={el.id}
                            date={el.date}>
                        </CreateTodo>
                    </div>
                    ) :
                    (<p></p>)}
            </div>

        ))}</div>

    </>)

}