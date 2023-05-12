import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import Main from './pages/Main'
import NotFound from './pages/NotFound'

const App = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
])

export default App

