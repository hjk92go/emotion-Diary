const MyButton = ({ text, type, onClick }) => {
  //설정한 type 이외의 타입이 들어오면 디폴트로 반환한 타입을 className으로 넣어주기
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    /* 클래스네임은 문자열로 전달해야되서, 배열을join으로 띄어쓰기로 구분해서 합쳐줌
    mybutton과 동적으로 바뀌는 네임까지 2개의 클래스 네임을 갖게 됨 */
    <button className={["MyButton", `MyButton_${btnType}`].join(" ")} onClick={onClick}>
      {text}
    </button>
  );
};

//타입이 전달된게 없을시 디폴트값 설정
MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
