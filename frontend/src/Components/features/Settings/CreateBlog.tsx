import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../../utils/cloudinary/ImageUpload";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { addArticle } from "../../../redux/action/Blog/BlogActions";
import { Blog } from "../../../types/Types";
import { RootState } from "../../../redux/Store";

const BlogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long."),
  tag: z.string().min(3, "Tag must be at least 3 characters long."),
  category: z.string().nonempty("Category is required."),
  content: z.string().min(20, "Content must be at least 20 words."),
  image: z.any().optional(),
});

type BlogType = z.infer<typeof BlogSchema>;

interface CreateBlogProps {
  onClose: () => void;
}

const CreateBlog: React.FC<CreateBlogProps> = ({ onClose }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  console.log("🚀 ~ file: CreateBlog.tsx:31 ~ user:", user.user._id);
  const [wordCount, setWordCount] = useState(0);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogType>({
    resolver: zodResolver(BlogSchema),
  });

  const onSubmit = async (data: BlogType) => {
    const blogData: Blog = {
      ...data,
      image: imgUrl,
      date: new Date().toISOString(),
      id: user.user._id,
      tags: data.tag.split(",").map((tag) => tag.trim()),
      description:data.description,
      category:data.category
    
    };

    await dispatch(addArticle(blogData));
    onClose();
  };

  const handleWordCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const words = e.target.value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const uploadedImgUrl = await ImageUpload(file);
      setImgUrl(uploadedImgUrl);
      console.log("Uploaded Image URL:", uploadedImgUrl);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="max-w-4xl w-full mx-4 my-10 p-8 bg-white shadow-md rounded-md relative"
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Your Blog
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Title</label>
              <input
                type="text"
                placeholder="Enter the title"
                {...register("title")}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium">Description</label>
              <textarea
                placeholder="Enter the description"
                {...register("description")}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium">Tag</label>
              <input
                type="text"
                placeholder="Enter a tag"
                {...register("tag")}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors.tag && (
                <p className="text-red-500 text-sm">{errors.tag.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border rounded-md"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Select Category</label>
              <select
                {...register("category")}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium">Content</label>
              <textarea
                placeholder="Enter your content (max 100 words)"
                {...register("content")}
                onChange={handleWordCount}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-sm text-gray-500">
                Word count: {wordCount}/100
              </p>
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
            >
              Submit Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
