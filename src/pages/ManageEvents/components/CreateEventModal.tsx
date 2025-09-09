import { motion } from "framer-motion";
import { useState } from "react";
import ImageUploader from "../../../helpers/ImageUploader";
import { useUser } from "@civic/auth-web3/react";
import { serverTimestamp } from "firebase/firestore";
import { useEvents } from "../../../hooks/useEvents";

const CreateEventModal = ({ onClose }: any) => {
  const { user } = useUser();
  const { createEvent } = useEvents();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: null as File | null,
    imagePreview: "",
    title: "",
    venue: "",
    date: "",
    capacity: "",
    ticketType: "free",
    price: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: previewUrl,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      !formData.title ||
      !formData.venue ||
      !formData.date ||
      !formData.capacity
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (formData.ticketType === "paid" && !formData.price) {
      alert("Please enter a price for paid tickets.");
      return;
    }
    const payload = {
      ...formData,
      image: imageUrl,
      email: user?.email,
      creator: user?.name,
      userId: user?.id,
      createdAt: serverTimestamp(),
    };
    try {
      await createEvent(payload);
      onClose();
    } catch (error) {
      console.error("❌ Error creating event:", error);
    } finally {
      setIsLoading(false);
    }
    onClose();
    setIsLoading(false);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={() => onClose()}
    >
      <div
        className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="w-full text-2xl space-y-4 font-bold text-white"
          onSubmit={handleSubmit}
        >
          <ImageUploader
            cloudName="dbrekhrjl"
            uploadPreset="event_uploads"
            onUpload={(url) => setImageUrl(url)}
            onLoadingChange={(loading) => setUploading(loading)}
          />
          {/* Basic Info */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Event title"
              required
            />
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Venue"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Capacity"
              required
            />
            <select
              name="ticketType"
              value={formData.ticketType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="free">Free</option>
              <option value="paid">Paid (SOL)</option>
            </select>
          </div>

          {formData.ticketType === "paid" && (
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Price in SOL"
              required
            />
          )}

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-6 py-3 border border-white/20 rounded-xl text-gray-300 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!imageUrl || uploading}
              className={`px-6 py-3  rounded-xl text-white font-semibold ${
                !imageUrl || uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500"
              }`}
            >
              {isLoading ? "Loading..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateEventModal;
