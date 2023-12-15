import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

import { emotionList } from "../util/emotion";
import { getStringDate } from "../util/date";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();

  //id와 일치 하는 상세 페이지에서 보여줘야하는 데이터를 찾아서 일기가 존재 할때 state에 할당
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

      if (targetDiary) {
        //일기가 존재할 때
        setData(targetDiary);
      } else {
        //일기 존재X
        alert("없는 일기 입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  //not data
  if (!data) {
    return <div className="DiaryPage">로딩중입니다.......</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))}의 기록`}
          leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
          rightChild={<MyButton text={"수정하기"} onclick={() => navigate(`/edit/${data.id}`)} />}
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">{curEmotionData.emotion_descript}</div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
