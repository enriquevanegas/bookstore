import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CreateBook } from './pages/CreateBook'
import { DeleteBook } from './pages/DeleteBook'
import { EditBook } from './pages/EditBook'
import { Home } from './pages/home'
import { ShowBook } from './pages/ShowBook'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/new' element={ <CreateBook /> } />
      <Route path='/books/edit/:id' element={ <EditBook /> } />
      <Route path='/books/details/:id' element={ <ShowBook /> } />
      <Route path='/books/delete/:id' element={ <DeleteBook /> } />
    </Routes>
  )
}

export default App
