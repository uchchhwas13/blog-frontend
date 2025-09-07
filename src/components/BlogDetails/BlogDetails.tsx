import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createComment, fetchBlogDetails } from '../../services/blogService';
import type { BlogDetailsModel } from '../../type/blog.types';
import { BlogHeader } from './BlogHeader';
import { BlogBody } from './BlogBody';
import { CommentSection } from './CommentSection';
import { BlogDetailsShimmerPage } from './BlogDetailsShimmerPage';
import { LikeSection } from './LikeSection';

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<BlogDetailsModel>();
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

  const handleAddComment = async (content: string) => {
    if (!id) return;

    createComment(id, content).then((response) => {
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

  const handleToggleLike = async () => {
    if (!id || !model) return;

    setModel((prev) =>
      prev
        ? {
            ...prev,
            blog: {
              ...prev.blog,
              likedByUser: !prev.blog.likedByUser,
              totalLikes: prev.blog.likedByUser
                ? prev.blog.totalLikes - 1
                : prev.blog.totalLikes + 1,
            },
          }
        : prev
    );
    // Here you would typically also make an API call to update the like status on the server
  };

  if (!model) {
    return <BlogDetailsShimmerPage />;
  }

  return (
    <div className="w-full pt-10">
      <BlogHeader blog={model.blog} />
      <BlogBody body={model.blog.body} />
      <LikeSection
        likedByUser={model.blog.likedByUser}
        totalLikes={model.blog.totalLikes}
        onToggle={handleToggleLike}
      />
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
