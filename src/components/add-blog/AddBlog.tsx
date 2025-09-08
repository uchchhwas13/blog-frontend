import { useState } from 'react';
import { createBlog } from '../../services/blogService';
import { useNavigate } from 'react-router-dom';

export const AddBlogPage = () => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string>('');
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (coverImage && title && body) {
      createBlog({ coverImage, title, body }).then((response) => {
        if (response.data && response.error == null) {
          navigate(`/blogs/${response.data.blog.id}`);
        } else {
          setToastMessage('Failed to create post. Please try again');
          setTimeout(() => setToastMessage(''), 2000);
        }
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          ✍️ Add New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-600
                hover:file:bg-indigo-100"
            />
            {coverImage && (
              <img
                src={URL.createObjectURL(coverImage)}
                alt="Preview"
                className="mt-4 h-40 w-full object-cover rounded-lg shadow-md"
              />
            )}
          </div>

          {/* Blog Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          {/* Blog Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Content <span className="text-red-500">*</span>
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your blog here..."
              rows={10}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Publish Blog 🚀
          </button>
        </form>

        {toastMessage && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
};
