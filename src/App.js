import "./App.css";
import React, { useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // 01

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";

//리듀서 함수
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    //newItem은 spread연산자로 action.data를 뿌림
    case "CREATE": {
      const newItem = {
        ...action.data,
      };

      // newState = [newItem, ...state]; 아래와 같이 작성해줘도 무방
      newState = [action.data, ...state];

      //default까지 자동 수행 / return을 하지 않을거면 break를 걸어줘야함
      break;
    }
    //state.filter에 직접 id가 action.targetId로 전달안된것만 필터하고 브레이크
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    //it.id가 action.data.id와 일치하는 경우
    case "EDIT": {
      newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
      break;
    }
    default:
      return state;
  }
  return newState;
};

//data state를 컴포넌트 전역에 공급하기 위한 context API를 만들고,
//트리의 전체를 DiaryStateContext.Provider 으로 감싸주고, 전할값을 전해준다.
export const DiaryStateContext = React.createContext();

//dispatch함수를 공급할 새로운 컨텍스트, 마찬가지로 아래에 감싸준다.
export const DiaryDispatchContext = React.createContext();

//dummy data
const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1701154637162,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1701154637165,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1701154637170,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1701154637175,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1701154637180,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);

  // DISPATCH함수 만들기
  // CREATE _ 언제 작성된 일기인지 알수 있도록 date값도 받아준다.
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    //커런트 아이디값을 +1시켜줌
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  /*
   * DiaryStateContext.Provider에 전달하는 Props가 변경되면 그 아래의 컴포넌트들은 리렌더가 발생
   * 그렇기 때문에 불 필요한 리렌더가 발생하지 않도록 React.memo 등을 이용해 컴포넌트들을 메모이제이션해야함
   * 그런데 data와 onCreate, onUpdate, onDelete 함수를 하나의 객체로 묶어 하나의 Context를 통해 공급하면
   * 결국 data의 값이 바뀔 때 마다 이 객체 자체가 새롭게 생성된다.
   *
   * 반면 값과 업데이트 함수들을 두개의 Context로 분리(DiaryStateContext, DiaryDispatchContext)하면
   * 값(data)과 상태변화 함수(onCreate, onUpdate, onDelete)를 각각 다른 객체로 묶어주기 때문에
   * 값의 변화에도 상태변화 함수를 묶는 객체가 다시 생성되지는 않는다(useMemo 적용시)
   */

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={(onCreate, onEdit, onRemove)}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
