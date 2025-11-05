
import './App.css';
import {useInput} from './useInput';

function displayData(message){
  alert(message);
}

function App() {
  const [inputValue, handleChange, handleSubmit] = useInput("앗농", displayData);
 /*
 const [id, onId, submitId] = useInput('',displayData);
 const [pw, onpw, submitpw] = useInput('',displayData);
 */
 
  return (
    <div>
      <h3>useInput</h3>
      <input type={inputValue} onChange={handleChange} />
    
      <button onClick={handleSubmit}>클릭</button>
    </div>
  )
}

export default App
