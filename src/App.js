import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // 01

//03 페이지 설정할 컴포넌트를 임포트 해준다.
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";
import RouterTest from "./components/RouterTest";

function App() {
  return (
    //02
    <BrowserRouter>
      <div>
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
        <RouterTest />
      </div>
    </BrowserRouter>
  );
}

export default App;

//01 처럼 임포트 해준다음, 02 브라우저 라우터를 전체 둘러싸준다.

//a태그를 사용할시 새로고침이 되므로, SPA 장점을 누리지 못한다.
//a태그는 외부url 사용시 이용  / SPA에서 링크 태그를 활용해준다(CSR방식)
