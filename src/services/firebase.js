
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database"


const firebaseConfig = {
    apiKey: "AIzaSyDbE6ly-HAzUvlXUrxRf4SBbFKm_AhBij8",
    authDomain: "todolist-aaf18.firebaseapp.com",
    databaseURL: "https://todolist-aaf18-default-rtdb.firebaseio.com",
    projectId: "todolist-aaf18",
    storageBucket: "todolist-aaf18.appspot.com",
    messagingSenderId: "265159543978",
    appId: "1:265159543978:web:4e41c232734980e1fc14d3"
};

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)

export const todosRef = ref(db, 'todos')

export const getTodoRefById = (todoId) => ref(db, `todos/${todoId}`)


