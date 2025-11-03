import { useState } from 'react'
import './App.css'
import Greeting from './component/Greeting';
import List from './component/List';
import User from './component/User';

function App() {
  const username = "king";
  const constData=100;

  const user = {
    name: "kim",
    age:30,
    email:'kim@naver.com'
  };

  const todus = ["AAA", "BBB", "CCC"];
  return (
    <div className='App'>
      <Greeting name={username} uname="world" count={constData} />
      <List items={todus} />
      <User user={user} />
    </div>
  )
}

export default App
