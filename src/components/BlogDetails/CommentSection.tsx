import type { Comment } from '../../type/blog.types';
import { CommentItem } from './CommentItem';
import { useAuth } from '../auth/useAuth';
import { CommentBox } from './CommentBox';

type CommentSectionProps = {
  comments: Comment[];
  onAddComment: (content: string) => void;
};

export const CommentSection = ({
  comments,
  onAddComment,
}: CommentSectionProps) => {
  const { user } = useAuth();

  return (
    <section className="mt-10 bg-white px-6 md:px-12 py-8 rounded-b-xl shadow-md border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-gray-200 pb-3">
        Comments
      </h2>

      {comments.length === 0 ? (
        <p className="text-gray-500 italic">No comments yet. Be the first!</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {user.isLoggedIn && (
        <div className="mt-8">
          <CommentBox onSubmit={onAddComment} />
        </div>
      )}
    </section>
  );
};
