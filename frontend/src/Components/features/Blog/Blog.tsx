import { useEffect, useState } from "react";
import { BlogType } from "../../../types/Types";
import { CLIENT_API } from "../../../utils/axios";
import Pagination from "../../common/Pagination";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../redux/Store";

const Blog = () => {
  const { data } = useAppSelector((state: RootState) => state.blog);

  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const articlesPerPage = 4;
  const navigate = useNavigate();


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
  }, [data]);


  useEffect(() => {
    if (selectedCategory) {
      const filtered = allBlogs.filter(
        (blog) => blog.category === selectedCategory
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(allBlogs); 
    }
  }, [selectedCategory, allBlogs]);

  const totalPages = Math.ceil(filteredBlogs.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentBlogs = filteredBlogs.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <>
      <div className="pb-10 pl-5 pt-6">
        <div className="flex justify-end pr-5">
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Art">Art</option>
            <option value="Support">Support</option>
            <option value="Business">Business</option>
            <option value="Tech">Tech</option>
          </select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="md:flex bg-background shadow-lg rounded-lg overflow-hidden"
                onClick={() =>
                  navigate(`/content/${blog._id}`, { state: { data: blog } })
                }
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
