import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { ProductosHome } from './components/ProductosHome'
import { Productos } from './components/Productos'
import { Provider } from 'react-redux'
import store from './redux/store'


function App() {

  return (
    <Provider store={store}>
        <Navbar />
      <Routes>
        <Route path='/' element={<ProductosHome />}/>
        <Route path='/productos' element={<Productos />}/>
      </Routes>
    </Provider>
  )
}

export default App
