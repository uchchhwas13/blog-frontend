import { useEffect, useState } from 'react';
import { fetchLikers } from '../../services/blogService';
import type { Liker } from '../../type/blog.types';

type LikesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  blogId: string;
};

export const LikesModal = ({ isOpen, onClose, blogId }: LikesModalProps) => {
  const [likers, setLikers] = useState<Liker[]>([]);

  useEffect(() => {
    fetchLikers(blogId).then((response) => {
      console.log(response);
      if (response.data) {
        setLikers(response.data.users);
      } else {
        console.log(response.error);
      }
    });
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="text-lg font-semibold">Likes</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        {/* List of likers */}
        <ul className="divide-y">
          {likers.map((user) => (
            <li key={user.id} className="flex items-center gap-3 px-4 py-2">
              <img
                src={user.imageUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
