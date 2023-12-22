import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { ProductosHome } from './components/ProductosHome'
import { Productos } from './components/Productos'


function App() {

  return (
    <>
        <Navbar />
      <Routes>
        <Route path='/' element={<ProductosHome />}/>
        <Route path='/productos' element={<Productos />}/>
      </Routes>
    </>
  )
}

export default App
