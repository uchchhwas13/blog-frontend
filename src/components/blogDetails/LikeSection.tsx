import { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { useAuth } from '../auth/useAuth';

type LikeButtonProps = {
  likedByUser: boolean;
  totalLikes: number;
  onToggle: () => void;
  //onShowLikes: () => void;
};

export const LikeSection = ({
  likedByUser,
  totalLikes,
  onToggle,
}: //onShowLikes,
LikeButtonProps) => {
  const handleLikeButtonClick = () => {
    setIsLiked(!isLiked);
    onToggle();
  };
  const [isLiked, setIsLiked] = useState(likedByUser);
  const { user } = useAuth();
  return (
    <div className="flex items-center gap-3 my-4 px-12 py-5">
      {user.isLoggedIn ? (
        <button
          onClick={handleLikeButtonClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition border ${
            isLiked
              ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          <ThumbsUp
            size={18}
            className={isLiked ? 'fill-white text-white' : 'text-gray-600'}
          />
        </button>
      ) : (
        <span className="text-gray-500">Please log in to like this post</span>
      )}

      <button
        //onClick={onShowLikes}
        className="font-medium text-gray-700 hover:underline"
      >
        {totalLikes} {totalLikes === 1 ? 'Like' : 'Likes'}
      </button>
    </div>
  );
};
