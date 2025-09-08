type BlogBodyProps = {
  body: string;
};

export const BlogBody = ({ body }: BlogBodyProps) => {
  return (
    <article className="prose prose-lg max-w-none bg-white mt-8 md:mt-12 px-6 md:px-12 py-10 rounded-xl shadow-md border border-gray-100">
      <p className="whitespace-pre-line text-gray-700 leading-relaxed">
        {body}
      </p>
    </article>
  );
};
