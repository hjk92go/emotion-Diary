import { Link } from "react-router-dom";

//SPA방식 즉, CSR방식으로 페이지를 이동시키는 컴포넌트를 사용할 것

const RouterTest = () => {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <br />
      <Link to={"/diary"}>Diary</Link>
      <br />
      <Link to={"/new"}>New</Link>
      <br />
      <Link to={"/edit"}>Edit</Link>
    </>
  );
};

export default RouterTest;
