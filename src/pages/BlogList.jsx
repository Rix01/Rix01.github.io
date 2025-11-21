import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';

/**
 * BlogList 페이지 컴포넌트 - 터미널 스타일
 * - 백엔드 API로부터 블로그 포스트 목록을 가져와서 표시
 * - 터미널 ls 명령어 출력 느낌의 디자인
 */
function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('포스트 목록 로딩 에러:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateValue) => {
    let date;

    // Firestore Timestamp 객체 처리
    if (dateValue && typeof dateValue === 'object') {
      // { _seconds, _nanoseconds } 또는 { seconds, nanoseconds } 형태 처리
      const seconds = dateValue._seconds || dateValue.seconds;
      if (seconds) {
        date = new Date(seconds * 1000);
      } else {
        date = new Date(dateValue);
      }
    } else if (typeof dateValue === 'string' || typeof dateValue === 'number') {
      date = new Date(dateValue);
    } else {
      return 'Invalid Date';
    }

    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).replace(/ /g, '-');
  };

  const parseTags = (tagsString) => {
    if (!tagsString) return [];
    return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
  };

  // 로딩 중
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="terminal-box">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-terminal-cyan dark:text-terminal-cyan text-blue-600">$</span>
            <span className="text-terminal-comment dark:text-terminal-comment text-gray-600">ls -la posts/</span>
          </div>
          <div className="flex items-center gap-2 text-terminal-comment dark:text-terminal-comment text-gray-600">
            <span className="animate-spin">⠋</span>
            <span>Loading posts...</span>
          </div>
        </div>
      </div>
    );
  }

  // 에러
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="terminal-box border-terminal-red">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-terminal-red">$</span>
            <span className="text-terminal-comment">cat error.log</span>
          </div>
          <div className="text-terminal-red mb-4">
            ⚠️ Error: {error}
          </div>
          <button
            onClick={fetchPosts}
            className="bg-terminal-green text-terminal-bg px-4 py-2 rounded font-bold hover:bg-terminal-cyan transition-colors"
          >
            $ retry
          </button>
        </div>
      </div>
    );
  }

  // 포스트 없음
  if (posts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="terminal-box">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-terminal-cyan">$</span>
            <span className="text-terminal-comment">ls -la posts/</span>
          </div>
          <div className="text-terminal-comment">
            total 0
            <br />
            drwxr-xr-x 2 rin dev 4096 Nov 20 17:00 .
            <br />
            drwxr-xr-x 8 rin dev 4096 Nov 20 17:00 ..
            <br />
            <br />
            <span className="text-gray-400">(no posts found)</span>
          </div>
        </div>
      </div>
    );
  }

  // 포스트 목록 표시
  return (
    <div className="max-w-4xl mx-auto font-mono">
      {/* 터미널 헤더 */}
      <div className="terminal-box mb-6">
        <div className="flex items-center gap-2">
          <span className="text-terminal-cyan dark:text-terminal-cyan text-blue-600">$</span>
          <span className="text-terminal-comment dark:text-terminal-comment text-gray-600">ls -la posts/</span>
        </div>
        <div className="text-terminal-comment dark:text-terminal-comment text-gray-600 text-sm mt-2">
          total {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </div>
      </div>

      {/* 포스트 목록 */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            to={`/posts/${post.slug}`}
            className="block terminal-box hover:border-terminal-cyan transition-all group"
          >
            {/* 파일 정보 스타일 */}
            <div className="flex items-start gap-4">
              {/* 파일 번호 */}
              <div className="text-terminal-comment dark:text-terminal-comment text-gray-500 text-sm min-w-[3rem]">
                {String(index + 1).padStart(3, '0')}
              </div>

              {/* 파일 내용 */}
              <div className="flex-1">
                {/* 파일명 (제목) */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-terminal-green dark:text-terminal-green text-gray-900 group-hover:text-terminal-cyan dark:group-hover:text-terminal-cyan group-hover:text-blue-600 transition-colors font-bold text-lg">
                    {post.title}
                  </span>
                  <span className="text-terminal-cyan dark:text-terminal-cyan text-blue-600">.md</span>
                </div>

                {/* 파일 메타데이터 */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-terminal-comment dark:text-terminal-comment text-gray-600 mb-2">
                  <span>
                    <span className="text-terminal-cyan dark:text-terminal-cyan text-blue-600">-rw-r--r--</span>
                  </span>
                  <span>
                    <span className="text-terminal-purple dark:text-terminal-purple text-purple-600">published:</span> {formatDate(post.publishedAt)}
                  </span>
                  {post.updatedAt && post.updatedAt !== post.publishedAt && (
                    <span>
                      <span className="text-terminal-yellow dark:text-terminal-yellow text-yellow-600">modified:</span> {formatDate(post.updatedAt)}
                    </span>
                  )}
                </div>

                {/* 태그 */}
                {post.tags && (
                  <div className="flex flex-wrap gap-2">
                    {parseTags(post.tags).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-terminal-surface dark:bg-terminal-surface bg-gray-100 border border-terminal-border dark:border-terminal-border border-gray-300 rounded text-terminal-cyan dark:text-terminal-cyan text-blue-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 화살표 */}
              <div className="text-terminal-cyan dark:text-terminal-cyan text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 푸터 정보 */}
      <div className="terminal-box mt-6">
        <div className="text-terminal-comment dark:text-terminal-comment text-gray-600 text-sm">
          <span className="text-terminal-cyan dark:text-terminal-cyan text-blue-600">$</span> Total: {posts.length} {posts.length === 1 ? 'file' : 'files'}
        </div>
      </div>
    </div>
  );
}

export default BlogList;
