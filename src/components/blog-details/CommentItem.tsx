import type { Comment } from '../../type/blog.types';

type CommentItemProps = {
  comment: Comment;
};

export const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex gap-4">
      {/* Avatar */}
      <img
        src={comment.createdBy.imageUrl}
        alt={comment.createdBy.name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />

      {/* Comment bubble */}
      <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-gray-800">
            {comment.createdBy.name}
          </p>
          {comment.createdAt && (
            <span className="text-sm text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
        <p className="mt-2 text-gray-700 leading-relaxed">{comment.content}</p>
      </div>
    </div>
  );
};
