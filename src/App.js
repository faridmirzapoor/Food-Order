import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';

import Navbar from './Components/Navbar';
import ThemeSelector from './Components/ThemeSelector'
import Create from './pages/Create/Create';
import Recipe from './pages/Recipe/Recipe';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import useTheme from './hooks/useTheme';



function App() {
  
  
  const { mode } = useTheme()
  return (
    <div className={`App ${mode}`}>
      <Router>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/create' element={<Create />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/recipes/:id' element={<Recipe />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
