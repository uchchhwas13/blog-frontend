import type { Comment } from '../../type/blog.types';
type CommentItemProps = {
  comment: Comment;
};

export const CommentItem = ({ comment }: CommentItemProps) => {
  return (
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
        <p className="font-semibold text-gray-700">{comment.createdBy.name}</p>
        <p className="text-gray-600">{comment.content}</p>
      </div>
    </div>
  );
};
