import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlogDetails } from '../services/blogService';
import type { BlogDetailsModel } from '../type/blog.types';

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<BlogDetailsModel>();

  useEffect(() => {
    if (id == null) {
      return;
    }
    fetchBlogDetails(id).then((response) => {
      if (response.data != null) {
        setModel(response.data);
      } else {
        console.log(response.error);
      }
    });
  }, []);

  return (
    <div className="w-full pt-10">
      {/* Header section */}
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 bg-gray-800 text-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center">{model?.blog.title}</h1>
        <img
          src={model?.blog.coverImageUrl}
          alt="Blog cover"
          className="w-full h-80 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
        />

        {/* Author info */}
        <div className="flex items-center gap-3 mt-2">
          <img
            src={model?.blog.createdBy.imageUrl}
            alt={model?.blog.createdBy.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-lg">
            By{' '}
            <span className="font-semibold">{model?.blog.createdBy.name}</span>
          </span>
        </div>
        <span className="text-sm text-gray-300">
          {new Date(model?.blog.createdAt || '').toLocaleDateString()}
        </span>
      </div>

      {/* Body section */}
      <div className="w-full bg-gray-50 mt-6 px-6 md:px-12 py-10 text-gray-800 leading-relaxed shadow-inner">
        <p className="whitespace-pre-line">{model?.blog.body}</p>
      </div>

      {/* Separator */}
      <div className="border-t border-gray-300 my-6 mx-6 md:mx-12"></div>

      {/* Comment section */}
      <div className="w-full bg-gray-100 px-6 md:px-12 py-8 rounded-t-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Comments</h2>

        {(model?.comments.length ?? 0) === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          model?.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-3 mb-6 pb-4 border-b border-gray-200 last:border-none"
            >
              <img
                src={comment.createdBy.imageUrl}
                alt={comment.createdBy.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-gray-700">
                  {comment.createdBy.name}
                </p>
                <p className="text-gray-600">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
