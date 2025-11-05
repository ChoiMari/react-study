import './App.css';
import {useFectch} from './useFetch';

const baseUrl = "https://jsonplaceholder.typicode.com/";

function App() {
/* 코드가 반복적으로 많이 사용 된다면..
  const [data, setData] = useState(null);

  const fetchUrl = (type) =>{
      fetch(baseUrl + "/" + type)
      .then((res)=> res.json())
      .then((data)=>setData(data));
  };

  useEffect(() =>{
    fetchUrl('users')
  },[]); //한번만   [] 
  위 부분을 별도의 사용자 훅(커스텀 훅)으로 만듬
*/
  const {data, fetchUrl} = useFectch(baseUrl, 'users');
  console.log(data);
  return (
    <div className="App">
        <h3>Fetch Call</h3>
        <button onClick={()=> fetchUrl('users')}>users</button>
        <button onClick={()=> fetchUrl('posts')}>posts</button>
        <button onClick={()=> fetchUrl('todos')}>todos</button>
        <pre>{JSON.stringify(data,null,2)}</pre>
    </div>
  );
}

export default App;