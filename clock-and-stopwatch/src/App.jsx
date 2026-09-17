import { useState } from 'react'
import Stopwatch from './Stopwatch.jsx'
import DigitalClock from './DigitalClock.jsx'
import './App.css'

function App() {

  return (
    <div>
      <h1>Simple Apps</h1>

      <DigitalClock />
      <Stopwatch />
    </div>
  )
}

export default App
