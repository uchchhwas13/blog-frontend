import { useState } from 'react';

type CommentBoxProps = {
  onSubmit: (content: string) => void;
};

export function CommentBox({ onSubmit }: CommentBoxProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length === 0) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 pt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <button
        type="submit"
        className="self-end px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Post Comment
      </button>
    </form>
  );
}
