type BlogBodyProps = {
  body: string;
};

export const BlogBody = ({ body }: BlogBodyProps) => {
  return (
    <div className="w-full bg-gray-50 mt-6 px-6 md:px-12 py-10 text-gray-800 leading-relaxed shadow-inner">
      <p className="whitespace-pre-line">{body}</p>
    </div>
  );
};
