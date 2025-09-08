const HomePageShimmer = () => {
  return (
    <div className="p-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="w-[400px] h-[300px] rounded-md shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageShimmer;
