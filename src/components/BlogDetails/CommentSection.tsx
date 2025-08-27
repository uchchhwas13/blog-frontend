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
    <div className="w-full bg-gray-100 px-6 md:px-12 py-8 rounded-t-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Comments</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet. Be the first!</p>
      ) : (
        comments.map((c) => <CommentItem key={c.id} comment={c} />)
      )}
      {user.isLoggedIn && <CommentBox onSubmit={onAddComment} />}
    </div>
  );
};
