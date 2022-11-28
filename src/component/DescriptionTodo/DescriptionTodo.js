import { useEffect, useState } from "react"
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import * as dayjs from 'dayjs'


export function DescriprionTodo({ el }) {
    // console.log(el)
    const [valid, setValid] = useState(true)

    /** Записывает сегодняшнее число в формате 'YYYY-MM-DD'
     * @param {string} today
     */
    const today = dayjs().format().substring(0, 10)


    /** Проверяет валидность даты todo относительно today
     * записывает булевое значение в state переменную valid
     * @param {boolean} truthDate 
     */
    function handlerValidDate(date) {
        dayjs.extend(isSameOrBefore)
        const truthDate = dayjs(today).isSameOrBefore(date)
        setValid(truthDate)
    }

    useEffect(() => {
        handlerValidDate(el.date)
    }, [])

    return (
        <div className='todoItem_description'>
            {el.description ? (
                <div><span className='todoItem_description_text'>Описание: </span> {el.description}</div>
            ) : (<p></p>)}

            {el.file ? (
                <div><span className='todoItem_description_text'>Прикрепленные файлы: </span>{el.file}</div>
            ) : (<p></p>)}

            {el.date ? (
                !valid && !el.status ?
                    (<div> <span className='todoItem_description_text unvalid_data'>Дата завершения: </span>{el.date}</div>)
                    : (<div><span className='todoItem_description_text'>Дата завершения: </span>{el.date}</div>))
                : (<p></p>)}

        </div>
    )
}