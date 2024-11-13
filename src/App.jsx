import { useReducer, useRef, createContext, useEffect, useState } from 'react';
import './App.css';
import New from './pages/New'; 
import Diary from './pages/Diary';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
  
  
import { setDiary, getDiary, deleteDiary } from './util/firebase';


function reducer(state, action){

  let nextState;

  switch (action.type){
    case 'INIT' : 
      return action.data;

    case 'CREATE': {

      nextState = [action.data, ...state];
      setDiary(action.data);
      return nextState;
    }

    case 'UPDATE': {
      nextState = state.map(
        (item) => String(item.id) === String(action.data.id) 
                  ? action.data 
                  : item
      );
      setDiary(action.data);
      return nextState; 
    }

    case 'DELETE':{
      nextState = state.filter((item)=> String(item.id) !== String(action.id));
      deleteDiary(action.id);
      return nextState;
    }

    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch]= useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(()=>{

    const fetchData = async () => {
      const storedData = await getDiary();
      
      let maxId = 0;
      storedData.forEach((item)=>{
        if(Number(item.id) > maxId){
          maxId = Number(item.id);
        }
      });
  
      idRef.current = maxId +1;
  
      dispatch({
        type: 'INIT',
        data: storedData,
      })
    }
    fetchData();
    
    setIsLoading(false);

  }, []);



  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) =>{
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      }
    });
  }

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      }
    });
  }

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    })
  }

  if(isLoading){
    return <div>데이터 로딩중입니다. ...</div>;
  }
  
  return (
    <>
      <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate,onUpdate,onDelete}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
