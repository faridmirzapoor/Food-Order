import useTheme from '../hooks/useTheme.js'

import './ThemeSelector.css' 
import ModeIcon from './svgs/ModeIcon.js'

const themeColors = ["#58249c", "#249c6b", "#b70223"]

export default function ThemeSelector() {
    
    const { changeColor, changeMode, mode } = useTheme()
    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }

  return (
    <div className='theme-selector'>
        <div onClick={toggleMode} className="mode-toggle">
            {/* <ModeIcon /> */}
            <svg style={{filter: mode === "dark" ? "invert(100%)" : "invert(20%)"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-28 346-160H160v-186L28-480l132-134v-186h186l134-132 134 132h186v186l132 134-132 134v186H614L480-28Zm0-252q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680v400Zm0 140 100-100h140v-140l100-100-100-100v-140H580L480-820 380-720H240v140L140-480l100 100v140h140l100 100Zm0-340Z"/></svg>
        </div>
        <div className="theme-buttons">
            {themeColors.map(color => {
                return <div key={color} onClick={() => changeColor(color)} style={{background: color}}></div>
            })}
        </div>
    </div>
  )
}
