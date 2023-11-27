import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  //useNavigate라는 Hook은 페이지를 이동시킬 수 있는 기능을 하는 함수를 반환해주는데
  //그함수의 이름을 Navigate로 받아준다음 Navigate의 인자로 이렇게 경로를 작서응ㄹ 해주면 이 Navigate함수를 호출해서 경로를 옮겨줄 수 있다.
  //보통 로그인값을 검사해서 로긴이 되지않았다면 로긴페이지로 강제로 보내기 이런 기능을 위해 존재
  //즉, 링크 태그를 클릭 안했을 떄도 의도적으로 페이지를 바꿔버릴수 있다고 생각하면 된다.
  const navigate = useNavigate();

  //Query String 꺼내서 사용하는 방법

  //대괄호 비구호 할당 / useState사용하듯이 첫번째요소는 searchParams, 두번쨰는 setSearchParams로 받아준다.
  const [searchParams, setSearchParams] = useSearchParams();

  //여기서 id를 꺼내야함
  const id = searchParams.get("id");
  const mode = searchParams.get("mode");

  console.log("id : ", id);
  console.log("mode : ", mode);

  return (
    <div>
      <h2>Edit</h2>
      <p>수정페이지</p>
      <button onClick={() => setSearchParams({ who: "hjk" })}>QS바꾸기</button>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
