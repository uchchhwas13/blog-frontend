import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createComment, fetchBlogDetails } from '../../services/blogService';
import type { BlogDetailsModel } from '../../type/blog.types';
import { BlogHeader } from './BlogHeader';
import { BlogBody } from './BlogBody';
import { CommentSection } from './CommentSection';
import { useAuth } from '../auth/useAuth';

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<BlogDetailsModel>();
  const { user } = useAuth();
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    if (!id) return;
    fetchBlogDetails(id).then((response) => {
      if (response.data) {
        setModel(response.data);
      } else {
        console.log(response.error);
      }
    });
  }, []);

  if (!model) {
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  }

  const handleAddComment = async (content: string) => {
    if (!id) return;

    createComment(id, content, user.accessToken).then((response) => {
      if (response.data?.comment != null) {
        const newComment = response.data?.comment;
        setModel((prev) =>
          prev
            ? {
                ...prev,
                comments: [...prev.comments, newComment],
              }
            : prev
        );
      } else {
        setToastMessage('Failed to post comment');
        setTimeout(() => setToastMessage(''), 2000);
      }
    });
  };

  return (
    <div className="w-full pt-10">
      <BlogHeader blog={model.blog} />
      <BlogBody body={model.blog.body} />
      <CommentSection
        comments={model.comments}
        onAddComment={handleAddComment}
      />
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
