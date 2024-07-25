import { Link } from 'react-router-dom'
import Searchbar from './Searchbar'

import './Navbar.css'
import { useContext } from 'react'
import { ThemeProvider, ThemeContext } from '../context/ThemeContext'
import useTheme from '../hooks/useTheme'

export default function Navbar() {

  const { color, changeColor } = useTheme()

  return (
    <div className='navbar' style={{background: color}}>
        <nav>
            <Link to={'/'} className='brand'><h1>Food Ordering</h1></Link>
            <Searchbar />
            <Link to='/create'>Create Recipe</Link>
        </nav>
    </div>
  )
}
