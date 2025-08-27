import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBlogDetails } from '../../services/blogService';
import type { BlogDetailsModel } from '../../type/blog.types';
import { BlogHeader } from './BlogHeader';
import { BlogBody } from './BlogBody';
import { CommentSection } from './CommentSection';

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [model, setModel] = useState<BlogDetailsModel>();

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

    //const newComment = await postComment(id, content);
    // if (newComment) {
    //   setModel((prev) =>
    //     prev ? { ...prev, comments: [...prev.comments, newComment] } : prev
    //   );
    // }
  };

  return (
    <div className="w-full pt-10">
      <BlogHeader blog={model.blog} />
      <BlogBody body={model.blog.body} />
      <CommentSection
        comments={model.comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default BlogDetails;
