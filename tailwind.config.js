/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // dark mode를 클래스 기반으로 활성화
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 터미널 느낌의 커스텀 색상
      colors: {
        terminal: {
          bg: '#0a0e27',        // 진한 네이비 배경
          surface: '#151934',   // 약간 밝은 표면
          border: '#1e2749',    // 테두리
          green: '#00ff41',     // 터미널 초록
          cyan: '#00d9ff',      // 시안
          purple: '#bd93f9',    // 보라
          pink: '#ff79c6',      // 핑크
          yellow: '#f1fa8c',    // 노랑
          orange: '#ffb86c',    // 오렌지
          red: '#ff5555',       // 빨강
          comment: '#6272a4',   // 회색 (주석)
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        blink: {
          'from, to': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        typing: {
          'from': { width: 0 },
          'to': { width: '100%' },
        },
        glow: {
          'from': { textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41' },
          'to': { textShadow: '0 0 20px #00ff41, 0 0 30px #00ff41, 0 0 40px #00ff41' },
        },
      },
    },
  },
  plugins: [],
}
