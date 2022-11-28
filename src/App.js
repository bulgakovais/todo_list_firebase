
import React from 'react'
import { Header } from './component'
import { CreateTodo } from './component'
import { Todo } from './component'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import './App.less'

function App() {

  return (<div className='container'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Header />
        <CreateTodo />
        <Todo />
      </PersistGate>
    </Provider>
  </div>
  )
}

export default App;