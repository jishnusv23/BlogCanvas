import React, { useEffect, useState } from "react";
import { BlogType } from "../../../types/Types";
import { CLIENT_API } from "../../../utils/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import CreateBlog from "./CreateBlog";
import Pagination from "../../common/Pagination";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useAppDispatch } from "../../../hooks/hooks";
import EditBlogs from "./EditBlogs";

const MyBlogs = () => {
  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
  const userId = useSelector((state: RootState) => state.auth.user.user._id);
  const dispatch = useAppDispatch();
  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const articlesPerPage = 4;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await CLIENT_API.get("/api/articles", {
          params: { userId },
        });
        setAllBlogs(response.data.data);
        console.log(
          "🚀 ~ file: MyBlogs.tsx:37 ~ fetchArticle ~ response:",
          response
        );
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    };
    fetchArticle();
  }, [userId, dispatch, isOpenModal]);

  const totalPages = Math.ceil(allBlogs.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentBlogs = allBlogs.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteBlogId(id);
    setIsDelete(true);
  };

  const handleDeleteCancel = () => {
    setDeleteBlogId(null);
    setIsDelete(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteBlogId) return;
    setIsLoading(true);
    try {
      await CLIENT_API.delete(`/api/articles/${deleteBlogId}`);
      setAllBlogs(allBlogs.filter((blog) => blog._id !== deleteBlogId));
      setIsDelete(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditClick = (blog: BlogType) => {
    setSelectedBlog(blog);
    setIsOpenModal(true);
  };

  return (
    <>
      <div className="pb-10 pl-5 pt-6">
        {/* <div className="flex justify-end pr-5">
          <select name="" id="" defaultValue={"."}>
            <option value="Tech">Tech</option>
            <option value="Business">Business</option>
            <option value="Trends">Trends</option>
            <option value="Opportunity">Opportunity</option>
          </select>
        </div> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="md:flex bg-background shadow-lg rounded-lg overflow-hidden"
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
                    <span className="text-sm">{blog.tags}</span>
                  </h3>
                  <p className="mb-4">
                    <strong>Category:</strong> {blog.category}
                  </p>
                  <div className="flex justify-start items-center gap-4">
                    <p>Published:</p>
                    <p>•</p>
                    <p>Author: {blog.author}</p>
                  </div>
                  <div className="pt-3 flex justify-between">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => handleEditClick(blog)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={() => handleDeleteClick(blog._id)}
                    >
                      Delete
                    </button>
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
      {isOpenModal && (
        <EditBlogs
          onClose={() => setIsOpenModal(false)}
          selectedBlog={selectedBlog}
        />
      )}
      {isDelete && (
        <ConfirmationModal
          message="Are you sure you want to delete this blog?"
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          isDelete={isLoading}
          showModal={isDelete}
        />
      )}
    </>
  );
};

export default MyBlogs;
