import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';

/**
 * App 컴포넌트
 * - 애플리케이션의 최상위 컴포넌트
 * - React Router를 사용한 클라이언트 사이드 라우팅 설정
 * - 모든 페이지는 Layout 컴포넌트로 감싸져 Header와 Footer를 공유함
 *
 * 라우트 구조:
 * - / : 홈 페이지 (랜딩 페이지)
 * - /blogs : 블로그 목록 페이지
 * - /blogs/:id : 블로그 상세 페이지 (동적 라우트)
 */
function App() {
  return (
    <Router>
      <Routes>
        {/*
          Layout을 루트 라우트로 설정하여 모든 하위 라우트가
          Layout 컴포넌트 안에서 렌더링되도록 함
        */}
        <Route path="/" element={<Layout />}>
          {/*
            index 라우트: 부모 경로(/)와 정확히 일치할 때 렌더링
          */}
          <Route index element={<Home />} />

          {/*
            블로그 목록 페이지
          */}
          <Route path="blogs" element={<BlogList />} />

          {/*
            블로그 상세 페이지 (동적 라우트)
            :slug 파라미터를 통해 특정 블로그의 slug를 받음
            예: /blogs/spring-boot-kotlin-blog 등
          */}
          <Route path="blogs/:slug" element={<BlogDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
