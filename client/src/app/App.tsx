import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { GameProvider } from './GameProvider'
import '../App.css'

function App() {
  return (
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  )
}

export default App
