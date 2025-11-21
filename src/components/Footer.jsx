/**
 * Footer 컴포넌트 - 터미널 스타일
 * - 사이트 하단에 표시되는 푸터
 * - 터미널 출력 스타일
 */
function Footer() {
  return (
    <footer className="bg-[#f8f8f6]/90 backdrop-blur-sm dark:bg-terminal-surface border-t border-gray-300 dark:border-terminal-border mt-auto transition-colors">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* 터미널 출력 스타일 */}
          <div className="text-sm font-mono">
            <div className="text-gray-600 dark:text-terminal-comment">
              <span className="text-blue-600 dark:text-terminal-cyan">→</span> Copyright © {new Date().getFullYear()} Rin
            </div>
            <div className="text-gray-600 dark:text-terminal-comment mt-1">
              <span className="text-blue-600 dark:text-terminal-cyan">→</span> Built with React + Vite + Tailwind
            </div>
          </div>

          {/* 소셜 링크 */}
          <div className="flex gap-4 text-sm font-mono">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-terminal-green hover:text-blue-600 dark:hover:text-terminal-cyan transition-colors flex items-center gap-1"
            >
              <span className="text-blue-600 dark:text-terminal-cyan">$</span> git remote
            </a>
          </div>
        </div>

        {/* 상태 표시줄 (터미널 스타일) */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-terminal-border">
          <div className="flex justify-between text-xs text-gray-500 dark:text-terminal-comment font-mono">
            <span>
              <span className="text-green-600 dark:text-terminal-green">●</span> Server running
            </span>
            <span>Press Ctrl+C to exit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
