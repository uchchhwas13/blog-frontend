import React, { useState, useEffect } from 'react';
import type { BlogModel } from '../../type/blog.types';
import { fetchBlogList } from '../../services/blogService';
import { BlogItem } from './BlogItem';
import HomePageShimmer from './HomePageShimmer';
import { useAuth } from '../auth/useAuth';

export const Home = (): React.JSX.Element => {
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const { isInitializing } = useAuth();

  const loadBlogs = async (pageNum: number) => {
    setIsLoading(true);
    const response = await fetchBlogList(pageNum);
    setIsLoading(false);

    if (response.error) {
      console.error(response.error);
      return;
    }

    const newBlogs = response.data?.blogs || [];
    const pagination = response.data?.pagination;

    setHasNext(pagination?.hasNext || false);

    if (pageNum > 1) {
      setBlogs((prev) => [...prev, ...newBlogs]);
    } else {
      setBlogs(newBlogs);
    }
  };

  useEffect(() => {
    if (!isInitializing) loadBlogs(1);
  }, [isInitializing]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadBlogs(nextPage);
  };

  if (isInitializing || (isLoading && page === 1)) {
    return <HomePageShimmer />;
  }

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>

      {hasNext && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
