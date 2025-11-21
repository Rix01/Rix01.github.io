/**
 * API 서비스 모듈
 * - 백엔드 API와의 통신을 담당하는 함수들을 모아둔 파일
 * - 모든 API 호출은 이 파일을 통해 이루어짐
 * - 에러 처리와 응답 변환을 중앙화하여 관리
 */

// API 기본 URL
// 개발 환경에서는 localhost:8080을 사용 (Spring Boot 기본 포트)
// 프로덕션 환경에서는 실제 백엔드 URL로 변경 필요
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

/**
 * 포스트 목록을 가져오는 함수
 * @returns {Promise<Array>} 포스트 배열
 * @throws {Error} API 호출 실패 시 에러 발생
 */
export const getPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('포스트 목록 가져오기 실패:', error);
    throw error;
  }
};

/**
 * 특정 포스트의 상세 정보를 slug로 가져오는 함수
 * @param {string} slug - 포스트의 slug (예: "spring-boot-kotlin-blog")
 * @returns {Promise<Object>} 포스트 객체
 * @throws {Error} API 호출 실패 시 에러 발생
 */
export const getPostBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${slug}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('포스트를 찾을 수 없습니다.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`포스트 slug ${slug} 가져오기 실패:`, error);
    throw error;
  }
};

/**
 * 시리즈 포스트 목록을 가져오는 함수
 * @param {string} parentPageId - 시리즈 부모 페이지 ID
 * @returns {Promise<Array>} 시리즈 포스트 배열 (seriesOrder 순으로 정렬됨)
 * @throws {Error} API 호출 실패 시 에러 발생
 */
export const getSeriesPosts = async (parentPageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/series/${parentPageId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`시리즈 ${parentPageId} 가져오기 실패:`, error);
    throw error;
  }
};
