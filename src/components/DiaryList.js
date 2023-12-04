import { useEffect, useState } from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  {
    value: "all",
    name: "전 부다",
  },
  {
    value: "good",
    name: "좋은 감정만",
  },
  {
    value: "bad",
    name: "안 좋은 감정만",
  },
];

/**
 * value : 메뉴가 렌더링 하는 select가 어떤걸 선택하고있는지의 역할
 * onChange : select가 선택하는게 변화했을때 바뀔 기능
 * optionList : select태그안에 들어갈 옵션
 */
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

/**
 * 다이어리리스트는 프롭으로 받아서 맵으로 리스트를 렌더링 할예정
 */
const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("lastest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    //sort를 사용하면 배열을 직접적으로 만지기 때문에 복제해서 사용해야한다
    //JSON.stringify해주면 배열을 json화 시켜서 문자열로 바꾸고, 바꾼 문자열을 JSON.parse하면 배열을 복호화 시켜준다
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filterList = filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filterList.sort(compare);

    return sortedList;
  };
  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className="right_col">
          <MyButton type={"positive"} text={"새 일기쓰기"} onClick={() => navigate("/new")} />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

//정상적으로 프롭안될상황을 대비해서 디폴트 값 지정ㄹㄹ
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
