import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout 컴포넌트
 * - 모든 페이지에 공통으로 적용되는 레이아웃
 * - Header와 Footer 사이에 페이지 콘텐츠(Outlet)가 렌더링됨
 * - Outlet: react-router-dom의 컴포넌트로, 중첩된 라우트의 자식 컴포넌트가 렌더링되는 위치
 */
function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 - 모든 페이지 상단에 표시 */}
      <Header />

      {/* 메인 콘텐츠 영역 - 각 페이지의 실제 내용이 여기에 렌더링됨 */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* 푸터 - 모든 페이지 하단에 표시 */}
      <Footer />
    </div>
  );
}

export default Layout;
