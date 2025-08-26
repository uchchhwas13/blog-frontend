import React from 'react';
import type { BlogModel } from '../../type/types';
import { Link } from 'react-router-dom';

type BlogItemProps = {
  blog: BlogModel;
};

export const BlogItem = ({ blog }: BlogItemProps): React.JSX.Element => {
  return (
    <Link
      to={`/blogs/${blog.id}`}
      className="flex flex-col items-center my-3 gap-10 bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div className="overflow-hidden rounded-lg w-[300px] h-[200px]">
        <img
          src={blog.coverImageUrl}
          alt="Blog cover"
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
      </div>
      <span className="text-lg font-semibold text-center mt-2">
        {blog.title}
      </span>
    </Link>
  );
};
