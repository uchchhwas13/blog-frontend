import React from 'react';
import type { BlogModel } from '../type/types';
import { useState, useEffect } from 'react';
import { fetchBlogList } from '../services/blogService';

export const Home = (): React.JSX.Element => {
  const [blogs, setBlogs] = useState<BlogModel[]>([]);

  useEffect(() => {
    fetchBlogList().then((response) => {
      if (response.error) {
        // show error in UI
        console.error(response.error);
      } else {
        setBlogs(response.data?.blogs || []);
        console.log(response.data);
      }
    });
  }, []);

  return (
    <div className="pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div className="flex flex-col items-center my-3 gap-2" key={blog.id}>
            <img
              src={blog.coverImageUrl}
              alt="Blog cover"
              style={{ width: '300px', height: '200px', objectFit: 'cover' }}
            />
            <span>{blog.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
