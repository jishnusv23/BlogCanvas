import { useEffect, useState } from "react";
import { BlogType } from "../../../types/Types";
import { CLIENT_API } from "../../../utils/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { useNavigate } from "react-router-dom";
import Pagination from "../../common/Pagination";

const LikedBlogs = () => {
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
  const [likedBlogs, setLikedBlogs] = useState<BlogType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 2;
  const currentUserId = useSelector(
    (state: RootState) => state.auth.user.user._id
  );

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await CLIENT_API.get("/api/all-articles");
        setAllBlogs(response.data.data);
      } catch (error: any) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      const liked = allBlogs.filter((blog) =>
        blog.likes.includes(currentUserId)
      );
      setLikedBlogs(liked);
    }
  }, [allBlogs, currentUserId]);

  
  const totalPages = Math.ceil(likedBlogs.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentBlogs = likedBlogs.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 rounded-md">
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <h2 className="text-xl font-semibold mb-4">Liked Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col rounded-lg shadow-md overflow-hidden"
              onClick={() =>
                navigate(`/content/${blog._id}`, { state: { data: blog } })
              }
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <div className="w-full">
                  <img
                    src={blog.image as string}
                    alt={blog.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
                <button className="mt-2 text-blue-500">Read</button>
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
