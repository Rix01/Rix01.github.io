import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포를 위한 기본 경로 설정
  // username.github.io 레포지토리의 경우 '/'를 사용
  // 일반 레포지토리의 경우 '/repository-name/'을 사용
  base: '/',
})
