import { useParams } from "react-router-dom";

const Diary = () => {
  //const id는 useParams라는 React Router dom 이 제공하는 함수를 사용할 것
  //useParams를 이용을 하면 이렇게 전달받아서 들어오게 되는 path variable들을 모아서 객체로 갖다 주게 되는데
  //우리는 이 variable을 id라고 부르기로 App.js에서 선언함
  //앞에서 선언한 path variable을 다이어리 컴포넌트에서 id로 꺼내와야한다.

  const { id } = useParams();

  return (
    <div>
      <h2>Diary</h2>
      <p>상세 페이지</p>
    </div>
  );
};

export default Diary;
