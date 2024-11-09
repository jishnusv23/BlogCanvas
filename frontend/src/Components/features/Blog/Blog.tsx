import React from "react";

const Blog = () => {
  // Dummy data for blogs
  const allBlogs = [
    {
      _id: 1,
      title: "Building a Successful Career in Tech",
      Imgurl: "https://via.placeholder.com/400",
      response: "5 Responses",
      tag: "Career",
      author: "Jane Doe",
    },
    {
      _id: 2,
      title: "Opportunities in Data Science",
      Imgurl: "https://via.placeholder.com/400",
      response: "12 Responses",
      tag: "Data Science",
      author: "John Smith",
    },
    {
      _id: 3,
      title: "How to Grow Your Professional Network",
      Imgurl: "https://via.placeholder.com/400",
      response: "3 Responses",
      tag: "Networking",
      author: "Emily Johnson",
    },
    {
      _id: 4,
      title: "The Future of AI and Machine Learning",
      Imgurl: "https://via.placeholder.com/400",
      response: "8 Responses",
      tag: "AI",
      author: "Michael Lee",
    },
  ];

  return (
    <>
      <div className="pb-10 pl-5 pt-6">
        <div className="flex justify-end pr-5">
          <select name="" id="" defaultValue={"."}>
       
            <option value="Tech">Tech</option>
            <option value="Tech">Business</option>
            <option value="Tech">Trends</option>
            <option value="Tech">Oppertunity</option>
          </select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {allBlogs.length > 0 ? (
            allBlogs.map((blog) => (
              <div
                key={blog?._id}
                className="md:flex bg-background shadow-lg rounded-lg overflow-hidden"
              >
                <div className="md:w-1/3">
                  <img
                    src={blog.Imgurl}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="md:w-2/3 p-6">
                  <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
                  <h3 className="font-bold text-xl  mb-4 flex items-center">
                    <span className="text-sm">{blog.response}</span>
                  </h3>

                  <p className=" mb-4">
                    <strong>Category:</strong> {blog.tag}
                  </p>

                  <div className="flex justify-start items-center gap-4 ">
                    <p>Published: </p>
                    <p>•</p>
                    <p>Author: {blog.author}</p>
                  </div>
                  <div className="pt-3">
                    {/* Additional Content/Action Buttons (optional) */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No blogs available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
