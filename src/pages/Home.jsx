import { Link } from "react-router-dom";

/**
 * Home 페이지 컴포넌트 - 터미널 스타일
 * - 블로그의 메인 랜딩 페이지
 * - 터미널 출력 느낌의 디자인
 */
function Home() {
  const asciiArtStyle = {
    fontFamily: "'Courier New', monospace",
    lineHeight: 1,
    whiteSpace: "pre",
    textRendering: "optimizeSpeed",
    WebkitFontSmoothing: "none",
    MozOsxFontSmoothing: "unset",
  };

  return (
    <div className="max-w-5xl mx-auto font-mono">
      {/* 터미널 헤더 */}
      <div className="terminal-box mb-8">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-terminal-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
          </div>
          <span className="text-terminal-comment text-sm ml-2">
            rin@dev: ~/blog
          </span>
        </div>

        {/* ASCII 아트 배너 */}
        <div className="overflow-x-auto mb-6">
          <pre style={asciiArtStyle} className="text-terminal-green text-sm">
            {`
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║   ████████╗███████╗ ██████╗██╗  ██╗    ██████╗ ██╗      ██████╗  ██████╗   ║
║   ╚══██╔══╝██╔════╝██╔════╝██║  ██║    ██╔══██╗██║     ██╔═══██╗██╔════╝   ║
║      ██║   █████╗  ██║     ███████║    ██████╔╝██║     ██║   ██║██║  ███╗  ║
║      ██║   ██╔══╝  ██║     ██╔══██║    ██╔══██╗██║     ██║   ██║██║   ██║  ║
║      ██║   ███████╗╚██████╗██║  ██║    ██████╔╝███████╗╚██████╔╝╚██████╔╝  ║
║      ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝    ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝   ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
`}
          </pre>
        </div>

        {/* 터미널 출력 메시지 */}
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-terminal-cyan">$</span>
            <span className="text-terminal-comment">cat welcome.txt</span>
          </div>
          <div className="ml-4 text-gray-300">
            <p className="mb-2">개발 경험과 기술에 대한 이야기를 공유합니다.</p>
            <p className="text-terminal-comment">
              Building something awesome, one commit at a time...
            </p>
          </div>

          <div className="flex items-start gap-2 mt-4">
            <span className="text-terminal-cyan">$</span>
            <span className="text-terminal-comment">./explore.sh</span>
          </div>
          <div className="ml-4">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 bg-terminal-green text-terminal-bg px-6 py-2 rounded font-bold hover:bg-terminal-cyan transition-all hover:shadow-lg"
              style={{ boxShadow: "0 0 20px rgba(0, 255, 65, 0.3)" }}
            >
              <span>→</span>
              <span>블로그 둘러보기</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 기능 섹션 - 터미널 출력 스타일 */}
      <div className="space-y-2 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-terminal-cyan">$</span>
          <span className="text-terminal-comment">ls -la features/</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* 특징 1 */}
        <div className="terminal-box hover:shadow-xl transition-shadow">
          <div className="text-terminal-cyan mb-3 flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <span className="font-bold">dev_notes</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            실제 프로젝트에서 겪은 문제와 해결 방법을 기록합니다
          </p>
        </div>

        {/* 특징 2 */}
        <div className="terminal-box hover:shadow-xl transition-shadow">
          <div className="text-terminal-purple mb-3 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <span className="font-bold">tech_share</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            새로운 기술과 도구에 대한 학습 내용을 공유합니다
          </p>
        </div>

        {/* 특징 3 */}
        <div className="terminal-box hover:shadow-xl transition-shadow">
          <div className="text-terminal-yellow mb-3 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="font-bold">growth</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            개발자로서의 성장 과정을 기록합니다
          </p>
        </div>
      </div>

      {/* 시스템 정보 */}
      <div className="terminal-box mt-8">
        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-terminal-cyan">$</span>
            <span className="text-terminal-comment">cat /chaerin/skills</span>
          </div>
          <div className="ml-4 text-terminal-comment space-y-1">
            <div>
              <span className="text-terminal-green">●</span> Backend: Java,
              Kotlin, Spring, Python, Flask, JavaScript, Node.js
            </div>
            <div>
              <span className="text-terminal-green">●</span> Frontend: React,
              Flutter, HTML, CSS
            </div>
            <div>
              <span className="text-terminal-green">●</span> DevOps: Docker,
              GitHub Actions, Jenkins, AWS, GCP
            </div>
            <div>
              <span className="text-terminal-green">●</span> DB: MySQL, MongoDB,
              Redis
            </div>
            <div>
              <span className="text-terminal-green">●</span> Collaboration:
              GitHub, Notion, Slack, Jira, Confluence, Discord, Figma
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
