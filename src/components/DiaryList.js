import { useEffect, useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

/**
 * value : 메뉴가 렌더링 하는 select가 어떤걸 선택하고있는지의 역할
 * onChange : select가 선택하는게 변화했을때 바뀔 기능
 * optionList : select태그안에 들어갈 옵션
 */
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
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
  const [sortType, setSortType] = useState("lastest");

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "lastest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    //sort를 사용하면 배열을 직접적으로 만지기 때문에 복제해서 사용해야한다
    //JSON.stringify해주면 배열을 json화 시켜서 문자열로 바꾸고, 바꾼 문자열을 JSON.parse하면 배열을 복호화 시켜준다
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const sortedList = copyList.sort(compare);

    return sortedList;
  };
  return (
    <div>
      <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

//정상적으로 프롭안될상황을 대비해서 디폴트 값 지정ㄹㄹ
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
