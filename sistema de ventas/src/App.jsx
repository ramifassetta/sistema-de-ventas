import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { ProductosHome } from './components/ProductosHome'
import { Searchbar } from './components/Searchbar'
import { Productos } from './components/Productos'


function App() {

  return (
    <>
        <Navbar />
        <Searchbar />
      <Routes>
        <Route path='/' element={<ProductosHome />}/>
        <Route path='/productos' element={<Productos />}/>
      </Routes>
    </>
  )
}

export default App
