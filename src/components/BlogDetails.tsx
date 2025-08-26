import { useParams } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex items-center justify-center bg-gray-600 text-white text-3xl p-4">
      Blog: {id}
    </div>
  );
};

export default BlogDetails;
