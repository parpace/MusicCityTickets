import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Body from './components/Body'
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";


function App() {

  return (
    <>
      <Header />
      <Body />
    </>
  )
}

export default App
