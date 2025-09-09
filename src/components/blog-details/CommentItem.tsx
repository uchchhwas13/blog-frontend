import { useAuth } from '../auth/useAuth';
import { useState } from 'react';
import type { Comment } from '../../type/blog.types';

type CommentItemProps = {
  comment: Comment;
  onUpdate: (commentId: string, content: string) => void;
};

export const CommentItem = ({ comment, onUpdate }: CommentItemProps) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(comment.content);

  const handleSave = () => {
    onUpdate(comment.id, draft);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <img
          src={comment.createdBy.imageUrl}
          alt={comment.createdBy.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />

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

          {isEditing ? (
            <div className="mt-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full border rounded-md p-2"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-gray-700 leading-relaxed">
              {comment.content}
            </p>
          )}
        </div>
      </div>
      <div className="mt-2 ml-14">
        {user.id === comment.createdBy.id && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 text-sm font-semibold hover:text-blue-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
