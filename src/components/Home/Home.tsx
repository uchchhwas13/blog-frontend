import React, { useState, useEffect } from 'react';
import type { BlogModel } from '../../type/blog.types';
import { fetchBlogList } from '../../services/blogService';
import { BlogItem } from './BlogItem';
import HomePageShimmer from './HomePageShimmer';
import { useAuth } from '../auth/useAuth';

export const Home = (): React.JSX.Element => {
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isInitializing } = useAuth();

  useEffect(() => {
    if (isInitializing) return;
    fetchBlogList().then((response) => {
      setIsLoading(false);
      if (response.error) {
        console.error(response.error); // show error in UI later
      } else {
        setBlogs(response.data?.blogs || []);
      }
    });
  }, [isInitializing]);

  if (isInitializing || isLoading) {
    return <HomePageShimmer />;
  }
  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Home;
