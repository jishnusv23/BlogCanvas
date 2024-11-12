import React, { useEffect, useState } from "react";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BlogType } from "../../../types/Types";
import { SlLike, SlDislike } from "react-icons/sl";
import { CLIENT_API } from "../../../utils/axios";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../redux/Store";
import toast from "react-hot-toast";
const DetailsView = () => {
  const navigate = useNavigate();
  const currentUserId = useAppSelector(
    (state: RootState) => state.auth.user.user._id
  );
  const { id } = useParams();
  const { state } = useLocation(); // This will allow you to access the data passed from the previous page
  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(
    state?.data || null
  ); // Initialize with passed data

  // Debugging
  console.log("🚀 ~ file: DetailsView.tsx:7 ~ DetailsView ~ id:", id);
  console.log("🚀 ~ file: DetailsView.tsx:7 ~ DetailsView ~ state:", state);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!selectedBlog) {
        // Fetch the article if it's not already passed as state
        try {
          const response = await fetch(`/api/article/${id}`);
          const data = await response.json();
          setSelectedBlog(data);
        } catch (error) {
          console.error("Something went wrong in DetailsView", error);
        }
      }
    };

    fetchArticle();
  }, [id, selectedBlog]);

  const handleLike = async () => {
    try {
      const response = await CLIENT_API.post(
        `/api/like-article/${selectedBlog?._id}`,
        {
          userId: currentUserId,
        }
      );
      console.log(
        "🚀 ~ file: DetailsView.tsx:45 ~ handleLike ~ response:",
        response
      );
      setSelectedBlog(response.data.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("soemthing wrong in error", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await CLIENT_API.post(
        `/api/dislike-article/${selectedBlog?._id}`,
        {
          userId: currentUserId,
        }
      );
      console.log(
        "🚀 ~ file: DetailsView.tsx:45 ~ handleLike ~ response:",
        response
      );
      setSelectedBlog(response.data.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("something wrong", error);
    }
  };
  const isLiked = selectedBlog?.likes.includes(currentUserId);
  const isDisliked = selectedBlog?.dislikes.includes(currentUserId);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <span className="text-4xl cursor-pointer" onClick={() => navigate(-1)}>
        <IoMdArrowDropleftCircle />
      </span>
      {selectedBlog ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{selectedBlog.title}</h1>
          <p className="text-gray-600 text-lg mb-4">
            {selectedBlog.description}
          </p>
          <img
            src={selectedBlog.image as string}
            alt="Article"
            className="w-full h-96 object-cover rounded-md mb-6"
          />
          <div className="space-y-4">
            <p className="text-gray-800">{selectedBlog.content}</p>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Tags:</h2>
              <ul className="list-disc ml-6 text-gray-700">
                {selectedBlog.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Author:</h2>
              <p className="text-gray-700">{selectedBlog.author}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}

      <div className="flex justify-between items-center mt-6">
        <div className="flex space-x-4">
          <button
            onClick={handleLike}
            disabled={isLiked}
            className={`px-4 py-2 ${
              isLiked ? "bg-green-500" : "bg-green-200"
            } text-white rounded-md hover:bg-green-300`}
          >
            <SlLike />
          </button>
          <button
            onClick={handleDislike}
            disabled={isDisliked}
            className={`px-4 py-2 ${
              isDisliked ? "bg-red-700" : "bg-red-600"
            } text-white rounded-md hover:bg-red-700`}
          >
            <SlDislike />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsView;
