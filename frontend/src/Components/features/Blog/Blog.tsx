import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../redux/Store";
import { BlogType } from "../../../types/Types";
import { CLIENT_API } from "../../../utils/axios";
import Pagination from "../../common/Pagination";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const userId = useAppSelector((state: RootState) => state.auth.user.user._id);
  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;
  const navigate=useNavigate()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await CLIENT_API.get("/api/all-articles");
        setAllBlogs(response.data.data);
      } catch (error: any) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticle();
  }, []);

  const totalPages = Math.ceil(allBlogs.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentBlogs = allBlogs.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="pb-10 pl-5 pt-6">
        <div className="flex justify-end pr-5">
          <select name="" id="" defaultValue={"."}>
            <option value="Tech">Tech</option>
            <option value="Business">Business</option>
            <option value="Trends">Trends</option>
            <option value="Oppertunity">Opportunity</option>
          </select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="md:flex bg-background shadow-lg rounded-lg overflow-hidden"
                onClick={()=>navigate(`/content/${blog._id}`,{state:{data:blog}})}
              >
                <div className="md:w-1/3">
                  <img
                    src={blog.image as string}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
                  <h3 className="font-bold text-xl mb-4 flex items-center">
                    <span className="text-sm">{blog.category}</span>
                  </h3>
                  <p className="mb-4">
                    <strong>Tags:</strong> {blog.tags}
                  </p>
                  <div className="flex justify-start items-center gap-4">
                    <p>Published:</p>
                    <p>•</p>
                    <p>Author: {blog.author}</p>
                  </div>
                </div>
               
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No blogs available</p>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Blog;
