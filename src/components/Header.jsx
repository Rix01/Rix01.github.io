import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/**
 * Header 컴포넌트 - 터미널 스타일
 * - 사이트의 상단 네비게이션 바
 * - 터미널 프롬프트 느낌의 디자인
 */
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-[#f8f8f6]/90 backdrop-blur-sm dark:bg-terminal-surface border-b border-gray-300 dark:border-terminal-border transition-colors">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* 로고/사이트 제목 - 터미널 프롬프트 스타일 */}
          <Link
            to="/"
            className="text-xl font-bold text-blue-600 dark:text-terminal-green hover:text-blue-700 dark:hover:text-terminal-cyan transition-colors flex items-center gap-2"
          >
            <span className="text-blue-600 dark:text-terminal-cyan">rin@dev</span>
            <span className="text-gray-400 dark:text-terminal-comment">:</span>
            <span className="text-purple-600 dark:text-terminal-purple">~/blog</span>
            <span className="text-blue-600 dark:text-terminal-green">$</span>
            <span className="cursor"></span>
          </Link>

          {/* 네비게이션 메뉴 */}
          <div className="flex gap-6 items-center font-mono text-sm">
            <Link
              to="/"
              className="text-gray-700 dark:text-terminal-green hover:text-blue-600 dark:hover:text-terminal-cyan transition-colors prompt"
            >
              ls home
            </Link>
            <Link
              to="/blogs"
              className="text-gray-700 dark:text-terminal-green hover:text-blue-600 dark:hover:text-terminal-cyan transition-colors prompt"
            >
              cat posts
            </Link>

            {/* 테마 토글 버튼 */}
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-terminal-cyan hover:text-blue-600 dark:hover:text-terminal-purple transition-colors px-3 py-1 border border-gray-300 dark:border-terminal-border rounded"
              title={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
