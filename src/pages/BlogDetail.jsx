import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { getPostBySlug, getSeriesPosts } from '../services/api';

/**
 * BlogDetail 페이지 컴포넌트 - 터미널 스타일
 * - 특정 블로그 포스트의 상세 내용을 표시
 * - 터미널 cat 명령어 출력 느낌의 디자인
 */
function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [seriesPosts, setSeriesPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await getPostBySlug(slug);
      setPost(data);
      setError(null);

      // 시리즈 포스트 가져오기 (부모 글에만 표시)
      if (data.isSeriesParent) {
        // 부모 글이면 자식 글들 가져오기
        const series = await getSeriesPosts(data.notionPageId);
        setSeriesPosts(series);
      }
    } catch (err) {
      setError(err.message);
      console.error('포스트 로딩 에러:', err);
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
            <span className="text-terminal-cyan">$</span>
            <span className="text-terminal-comment">cat posts/{slug}.md</span>
          </div>
          <div className="flex items-center gap-2 text-terminal-comment">
            <span className="animate-spin">⠋</span>
            <span>Loading...</span>
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
            <span className="text-terminal-comment">cat posts/{slug}.md</span>
          </div>
          <div className="text-terminal-red mb-4">
            ⚠️ Error: {error}
          </div>
          <button
            onClick={() => navigate('/blogs')}
            className="bg-terminal-green text-terminal-bg px-4 py-2 rounded font-bold hover:bg-terminal-cyan transition-colors"
          >
            $ cd ../
          </button>
        </div>
      </div>
    );
  }

  // 포스트 없음
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="terminal-box">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-terminal-red">$</span>
            <span className="text-terminal-comment">cat posts/{slug}.md</span>
          </div>
          <div className="text-terminal-red">
            cat: posts/{slug}.md: No such file or directory
          </div>
        </div>
      </div>
    );
  }

  // 포스트 상세 내용
  return (
    <article className="max-w-4xl mx-auto font-mono">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate('/blogs')}
        className="mb-6 text-terminal-cyan dark:text-terminal-cyan text-blue-600 hover:text-terminal-green dark:hover:text-terminal-green hover:text-blue-700 transition-colors flex items-center gap-2 text-sm"
      >
        <span>$</span>
        <span>cd ..</span>
      </button>

      {/* 파일 정보 헤더 */}
      <div className="terminal-box mb-6">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-terminal-border dark:border-terminal-border border-gray-200">
          <span className="text-terminal-cyan dark:text-terminal-cyan text-blue-600">$</span>
          <span className="text-terminal-comment dark:text-terminal-comment text-gray-600">cat posts/{slug}.md</span>
        </div>

        {/* 파일 메타데이터 */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-terminal-comment dark:text-terminal-comment text-gray-600">File:</span>
            <span className="text-terminal-green dark:text-terminal-green text-gray-900">{post.title}.md</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-terminal-comment dark:text-terminal-comment text-gray-600">
            <span>
              <span className="text-terminal-purple dark:text-terminal-purple text-purple-600">Published:</span> {formatDate(post.publishedAt)}
            </span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span>
                <span className="text-terminal-yellow dark:text-terminal-yellow text-yellow-600">Modified:</span> {formatDate(post.updatedAt)}
              </span>
            )}
          </div>

          {/* 태그 */}
          {post.tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-terminal-comment dark:text-terminal-comment text-gray-600">Tags:</span>
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
      </div>

      {/* 시리즈 네비게이션 */}
      {seriesPosts.length > 0 && (
        <div className="terminal-box mb-6">
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-terminal-border dark:border-terminal-border border-gray-200">
            <span className="text-terminal-cyan dark:text-terminal-cyan text-blue-600">📚</span>
            <span className="text-terminal-green dark:text-terminal-green text-gray-900 font-bold">
              시리즈
            </span>
          </div>
          <div className="space-y-2">
            {seriesPosts.map((seriesPost, idx) => {
              const isCurrent = seriesPost.slug === post.slug;
              return (
                <Link
                  key={seriesPost.id}
                  to={`/blogs/${seriesPost.slug}`}
                  className={`flex items-center gap-3 p-2 rounded transition-colors ${
                    isCurrent
                      ? 'bg-terminal-surface dark:bg-terminal-surface bg-blue-50 border-l-4 border-terminal-cyan dark:border-terminal-cyan border-blue-600'
                      : 'hover:bg-terminal-surface dark:hover:bg-terminal-surface hover:bg-gray-100'
                  }`}
                >
                  <span className="text-terminal-comment dark:text-terminal-comment text-gray-500 text-sm min-w-[2rem]">
                    {idx + 1}.
                  </span>
                  <span className={`flex-1 text-sm ${
                    isCurrent
                      ? 'text-terminal-cyan dark:text-terminal-cyan text-blue-600 font-bold'
                      : 'text-terminal-green dark:text-terminal-green text-gray-700'
                  }`}>
                    {seriesPost.title}
                  </span>
                  {isCurrent && (
                    <span className="text-terminal-cyan dark:text-terminal-cyan text-blue-600 text-xs">
                      ◀ 현재
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* 마크다운 콘텐츠 */}
      <div className="terminal-box">
        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
              // 이미지 렌더링 커스터마이징
              img: ({node, ...props}) => (
                <img
                  {...props}
                  className="max-w-full h-auto rounded-lg border border-terminal-border my-4"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
                    e.target.alt = '이미지를 불러올 수 없습니다';
                  }}
                />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* 네비게이션 */}
      <div className="terminal-box mt-6">
        <div className="flex items-center justify-between text-sm">
          <button
            onClick={() => navigate('/blogs')}
            className="text-terminal-cyan dark:text-terminal-cyan text-blue-600 hover:text-terminal-green dark:hover:text-terminal-green hover:text-blue-700 transition-colors flex items-center gap-2"
          >
            <span>$</span>
            <span>cd ../posts</span>
          </button>
          <div className="text-terminal-comment dark:text-terminal-comment text-gray-600">
            <span className="text-terminal-green dark:text-terminal-green text-green-600">●</span> EOF
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogDetail;
