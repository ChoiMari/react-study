import { useState } from 'react'

import './App.css'
import Parent from './component/Parent'

function App() {

  return (
    <>
      <div className='App'>
        <h3>App 컴포넌트(memo) 실습</h3>
        <Parent />
      </div>
    </>
  )
}

export default App
