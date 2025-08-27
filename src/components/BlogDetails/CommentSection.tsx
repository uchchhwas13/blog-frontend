import type { Comment } from '../../type/blog.types';
import { CommentItem } from './CommentItem';

type CommentsSectionProps = {
  comments: Comment[];
};

export const CommentSection = ({ comments }: CommentsSectionProps) => {
  return (
    <div className="w-full bg-gray-100 px-6 md:px-12 py-8 rounded-t-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Comments</h2>

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet. Be the first!</p>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
};
