import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './components/gameboard.jsx'
import './components/Cards.css'
import './components/Cards.jsx'

function App() {
  

  return (
    <>
     <div> 
      < GameBoard pairCount={8} />
     </div>
   
    </>
  )
}

export default App
