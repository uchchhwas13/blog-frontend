export const ContactPage = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-lg text-gray-700 mb-4">
        Have questions, feedback, or suggestions? We’d love to hear from you!
      </p>
      <p className="text-md text-gray-600">
        📧 Email:{' '}
        <a
          href="mailto:support@myblog.com"
          className="text-blue-600 hover:underline"
        >
          support@myblog.com
        </a>
      </p>
    </div>
  );
};
