// BlogDetailsShimmerPage.tsx
export const BlogDetailsShimmerPage = () => {
  return (
    <div className="w-full pt-10 animate-pulse">
      {/* Blog Header */}
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 bg-gray-800 text-white rounded-2xl shadow-lg p-6">
        <div className="shimmer h-8 w-3/4 rounded-md" /> {/* title */}
        <div className="shimmer w-full h-80 rounded-lg" /> {/* cover image */}
        {/* Author info */}
        <div className="flex items-center gap-3 mt-2 w-full justify-center">
          <div className="shimmer w-10 h-10 rounded-full" /> {/* avatar */}
          <div className="shimmer h-4 w-32 rounded-md" /> {/* author name */}
        </div>
        <div className="shimmer h-4 w-24 rounded-md" /> {/* createdAt */}
      </div>

      {/* Blog Body */}
      <div className="prose prose-lg max-w-none bg-white mt-8 md:mt-12 px-6 md:px-12 py-10 rounded-xl shadow-md border border-gray-100">
        <div className="space-y-4">
          <div className="shimmer h-4 w-full rounded-md" />
          <div className="shimmer h-4 w-5/6 rounded-md" />
          <div className="shimmer h-4 w-4/6 rounded-md" />
          <div className="shimmer h-4 w-2/3 rounded-md" />
        </div>
      </div>

      {/* Comment Section */}
      <section className="mt-10 bg-white px-6 md:px-12 py-8 rounded-b-xl shadow-md border-gray-100">
        <div className="shimmer h-6 w-40 mb-6 rounded-md" /> {/* heading */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="shimmer w-10 h-10 rounded-full" /> {/* avatar */}
              <div className="flex-1 space-y-3">
                <div className="shimmer h-4 w-32 rounded-md" /> {/* name */}
                <div className="shimmer h-4 w-5/6 rounded-md" /> {/* comment */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
