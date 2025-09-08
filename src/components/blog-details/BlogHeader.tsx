import type { BlogContent } from '../../type/blog.types';

type BlogHeaderProps = {
  blog: BlogContent;
};

export const BlogHeader = ({ blog }: BlogHeaderProps) => {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 bg-gray-800 text-white rounded-2xl shadow-lg p-6">
      <h1 className="text-3xl font-bold text-center">{blog.title}</h1>
      <img
        src={blog.coverImageUrl}
        alt="Blog cover"
        className="w-full h-80 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
      />

      {/* Author info */}
      <div className="flex items-center gap-3 mt-2">
        <img
          src={blog.createdBy.imageUrl}
          alt={blog.createdBy.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-lg">
          By <span className="font-semibold">{blog.createdBy.name}</span>
        </span>
      </div>
      <span className="text-sm text-gray-300">
        {new Date(blog.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};
