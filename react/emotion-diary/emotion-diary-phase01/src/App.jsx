import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useReducer, useRef, createContext, useEffect } from 'react';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';
import { useState } from 'react';

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case 'INIT':
      return action.data;

    case 'CREATE': {
      nextState = [action.data, ...state];
      break;
    }

    case 'UPDATE': {
      nextState = state.map(item =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }

    case 'DELETE': {
      nextState = state.filter(item => String(item.id) !== String(action.id));
      break;
    }

    default:
      return state;
  }

  localStorage.setItem('diary', JSON.stringify(nextState));
  return nextState;
}
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem('diary');
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedDate = JSON.parse(storedData);
    if (!Array.isArray(parsedDate)) {
      setIsLoading(false);
      return;
    }

    const maxId = Math.max(...parsedDate.map(item => Number(item.id)), 0);
    idRef.current = maxId + 1;

    dispatch({
      type: 'INIT',
      data: parsedDate,
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = id => {
    dispatch({
      type: 'DELETE',
      id,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩 중입니다....</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/new" element={<New />}></Route>
            <Route path="/diary/:id" element={<Diary />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="*" element={<Notfound />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
