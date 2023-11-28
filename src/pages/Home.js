import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  //위의 diaryList를 curDate state에 따라서 가공 -> 가공한 data를 state로 관리를 위해 만들어준다
  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  /*
   * 날짜가 이동하게 되면 다이어리 리스트에서 현재 연도와 월에 해당하는 일기들만 뽑아내야 되기 때문에
   * useEffect를 사용해서 뽑아낸다
   * useEffect으로curDate가 변하는 순간에 다이어리 리스트에서 연도와 월에 해당하는
   * 일기데이터들만 뽑아 올 예정
   */
  useEffect(() => {
    //빈배열일때 실행할 필요 없기때문
    if (diaryList.length >= 1) {
      //콘솔로 찍어보면 그달의 첫번째와 마지막 일자가 나오는걸 확인할 수 있다. / 이걸 이용해서 해당월에 작성된 일기를 추려낼 수 있음
      const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
      const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getTime();

      setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
    }
  }, [diaryList, curDate]);

  //콘솔확인 data변경시마다출력
  useEffect(() => {
    console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1), curDate.getDate() + 1);
  };
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1), curDate.getDate() + 1);
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
