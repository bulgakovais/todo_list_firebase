import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { createTodo } from "../../store/todo/actions";
import { getTodoRefById } from "../../services/firebase";
import { set, update } from "firebase/database";
import "../../App.less";

export function CreateTodo({ ...el }) {
  const dispatch = useDispatch();
  const [titleTodo, setTitleTodo] = useState(el.title ? el.title : "");
  const [descriptionTodo, setDescriptionTodo] = useState(
    el.descr ? el.descr : ""
  );
  const [dateTodo, setDateTodo] = useState(el.date ? el.date : "");
  const [fileTodo, setFileTodo] = useState(el.file ? el.file : "");
  const buttonFile = useRef(null);

  /**
   * Создает todo с одинаковыми ключами для нового/отредактированного todo
   * @param {string} title - заголовок todo
   * @param {string} description - описание todo
   * @param {object} file - прикрепленный файл todo
   * @param {boolean} status - статус todo
   * @param {string} date - дата завершения todo
   * @return {object} newTodo
   */
  function getNewTodo() {
    if (titleTodo === "") {
      alert("Введите название ToDo");
      return;
    }
    const newTodo = {
      title: titleTodo.trim(),
      description: descriptionTodo.trim(),
      file: fileTodo,
      status: false,
      date: dateTodo,
    };

    return newTodo;
  }

  /**
   * Создает новый todo
   * @param {object} newTodo - объект, с новыми данными
   * @param {string} newTodoId - id нового todo (nanoid())
   * @return {object} newTodoCreate
   */
  function getCreateTodo() {
    const newTodo = getNewTodo();
    if (newTodo === undefined) {
      return;
    }
    const newTodoId = `${nanoid()}`;
    const newTodoCreate = { ...newTodo, id: newTodoId };

    return newTodoCreate;
  }

  /**
   * Создает отредактированный todo
   * @param {boolean} status - статус todo
   * @param {object} newTodo - объект, с отредактированными данными
   * @param {object} updateTodo - объект newTodo с добавленным статусом из БД
   * @return {object} updateTodo
   */
  function getUpdateTodo() {
    const newTodo = getNewTodo();
    const updateTodo = { ...newTodo, status: el.status };

    return updateTodo;
  }

  /**
   * Запускает создание нового todo,
   * передает todo в редьюсер для создания его в сторе
   * записывает todo в БД
   * обнуляет поля формы создания todo
   * @param {object} newTodo - созданный todo
   */
  const handleCreateTodo = async (event) => {
    event.preventDefault();
    const newTodo = getCreateTodo();
    if (typeof newTodo !== "object") {
      console.log("Error: newTodo is not object");
      return;
    }
    dispatch(createTodo(newTodo));
    await set(getTodoRefById(newTodo.id), newTodo);
    getDefaultInputValue();
  };

  /**
   * Запускает создание отредактированного todo,
   * обновляет todo в БД по id
   * @param {object} newTodo - созданный todo
   */
  const handleUpdateTodo = () => {
    const updateTodo = getUpdateTodo();
    update(getTodoRefById(el.id), updateTodo);
  };

  /** Записывают новые значение в state при обновлении форм
   */
  const setTitle = (e) => {
    setTitleTodo(e.target.value);
  };
  const setDescription = (e) => {
    setDescriptionTodo(e.target.value);
  };
  const setDate = (e) => {
    setDateTodo(e.target.value);
  };

  const handleChangeFile = (e) => {
    setFileTodo(e.target.files[0].name);
  };

  /** Слушает Click на элементе с ref buttonFile
   */
  const handlePickFile = () => {
    buttonFile.current.click();
  };

  /** Очищает поля формы
   */
  function getDefaultInputValue() {
    setTitleTodo("");
    setDescriptionTodo("");
    setDateTodo("");
    setFileTodo("");
  }

  return (
    <>
      <form
        className="form"
        onSubmit={el.id ? handleUpdateTodo : handleCreateTodo}
      >
        <label htmlFor="title">Название заметки</label>
        <input
          className="input_main"
          type="text"
          id="title"
          value={titleTodo}
          onChange={setTitle}
        />

        <label htmlFor="descr">Описание</label>
        <textarea
          className="input_main textarea"
          id="descr"
          value={descriptionTodo}
          onChange={setDescription}
        />
        <div className="file_block">
          <div onClick={handlePickFile}>
            <i className="btn_file">Выбрать файл</i>
          </div>
          <input
            ref={buttonFile}
            className="hidden"
            type="file"
            id="file"
            onChange={handleChangeFile}
            multiple
          />

          {fileTodo && (
            <div className="selected_file">
              <span>Выбранный файл: {fileTodo}</span>
            </div>
          )}
        </div>
        <label className="date" htmlFor="date ">
          Дата окончания
        </label>
        <input
          className="input_date"
          type="date"
          id="date"
          value={dateTodo}
          onChange={setDate}
        />
        <button className="input_main btn_create btn" type="submit">
          {el.title ? <span>Обновить</span> : <span>Создать</span>}
        </button>
      </form>
    </>
  );
}
