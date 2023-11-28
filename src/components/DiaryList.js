import { useState } from "react";

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

  return (
    <div>
      <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
      {diaryList.map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

//정상적으로 프롭안될상황을 대비해서 디폴트 값 지정
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
