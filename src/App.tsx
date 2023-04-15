import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import NavBar from './components/NavBar/NavBar'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'
import CardSelect from './components/CardSelect/CardSelect'
import { RootState } from './redux/store'
import { useSelector } from 'react-redux'
import FavortiePage from './pages/FavoritePage/FavortiePage'
import CartPage from './pages/CartPage/CartPage'


function App() {
  const state = useSelector((state: RootState) => state.products)


  return (
    <div className="App">

      <div className="BackgroundR"></div>
      <div className="BackgroundW"></div>
      <NavBar />
      {state.page == '' || state.itemId ?

        state.itemId ?
          <CardSelect /> :
          <Main /> :

        state.page === 'favorite' ?

          <FavortiePage /> :

          state.page === 'cart' ?

            <CartPage /> : null




      }




      <Footer />


    </div>
  )
}

export default App
