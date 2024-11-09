import React from "react";

const LikedBlogs = () => {
  const allBlogs = [
    {
      _id: 1,
      title: "Building a Successful Career in Tech",
      Imgurl: "https://via.placeholder.com/400",
    },
    {
      _id: 2,
      title: "Opportunities in Data Science",
      Imgurl: "https://via.placeholder.com/400",
    },
    {
      _id: 3,
      title: "How to Grow Your Professional Network",
      Imgurl: "https://via.placeholder.com/400",
    },
    {
      _id: 4,
      title: "The Future of AI and Machine Learning",
      Imgurl: "https://via.placeholder.com/400",
    },
  ];

  return (
    <div className=" p-6   rounded-md">
      <h2 className="text-xl font-semibold mb-4">Liked Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allBlogs.length > 0 ? (
          allBlogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <div className="w-full">
                  <img
                    src={blog.Imgurl}
                    alt={blog.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No liked blogs available</p>
        )}
      </div>
    </div>
  );
};

export default LikedBlogs;
