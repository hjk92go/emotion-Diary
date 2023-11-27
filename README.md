# Router ?

- 데이터의 경로를 실시간으로 지정해주는 역할을 하는 무언가

# Route + ing ?

- 경로를 정해주는 행위 자체와 그런 과정들을 다 포함하여 일컫는말
- 어떤 네트워크 내에서 통신 데이터를 보낼 경로를 선택하는 일련의 과정

# Page Routing ?

- 요청에 명시되어 있는 경로에 따라서 알맞은 페이지를 선택하게 하는 이 과정 자체를 페이지 라우팅이라고 한다.

# MPA(Multipage Application)

- 홈이라는 경로를 가지고 도착한 요청에는 해당경로에 맞는 html파일을 보내주는 식으로 웹서버가 동작하는데 이렇게
  여러 개의 페이지를 준비했다가 요청이 들어오면 경로에 따라 적절한 페이지를 보내주는 방식을 멀티페이지 어플리케이션 = MPA 방식이라고 부른다.

# SPA(Single Page Application)

- 단일 페이지 어플리케이션이라는 뜻으로, 페이지가 한개밖에 없는 웹어플리케이션을 뜻한다.

# CSR(Client Side Rendering)

- 싱글페이지 어플리케이션에서 클라이언트 측에서 알아서 페이지를 렌더링 하는 방식을 클라이언트 사이드 렌드링이라고 한다.

리액트는 단일페이지로 구성되는 SPA방식을 따르면서 CSR한다.

# React Router Dom의 유용한 기능

- React Router V6 : React에서 CSR기반의 페이지 라우팅을 할 수 있게 해주는 라이브러리
  - 1. Path Variable(useParams)
  - 2. Query String(useSearchParams)
    - Query : 웹페이지에 데이터를 전달하는 가장 간단한 방법
      - ex) /edit?id=10&mode=dark =>(?id=10&mode=dark부분을 Query String이라고 함)
  - 3. Page Moving(useNavigate)
