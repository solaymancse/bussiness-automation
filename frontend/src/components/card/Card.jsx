import { Button, message, Popconfirm } from "antd";
import { Star } from "lucide-react";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdTrash } from "react-icons/io";
import axiosInstance from "../../utils/axiosConfig";

const Card = ({ hotel, refetch, setEditHotel, handleOpenModal }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/dashboard/hotel/${hotel?.id}`, { state: hotel });
  };

  const handleDelete = () => {
    axiosInstance
      .delete(`/hotel/${hotel?.id}`)
      .then(() => {
        message.success("Hotel deleted successfully");
        refetch();
      })
      .catch((error) => {
        console.error("Error deleting hotel:", error);
        message.error("Failed to delete hotel");
      });
  };

  return (
    <div className="max-w-sm cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-white p-4 relative group">
      {/* Hotel Card Content */}
      <div className="block">
        <img className="w-full h-48 object-cover rounded-lg" src={hotel.image} alt={hotel.name} />
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800">{hotel.name}</h2>
          <p className="text-sm text-gray-500">{hotel.address}</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold text-blue-600">${hotel.cost_per_night}/night</span>
            <span className="text-sm text-gray-600">Rooms: {hotel.available_rooms}</span>
          </div>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <Star key={index} className={`h-4 w-4 ${index < hotel.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 ">
        <div className="bg-black absolute w-full h-full bg-opacity-5 flex justify-center items-center opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
        <div className="hidden h-full w-full group-hover:items-center group-hover:justify-center transition-all duration-500 ease-in group-hover:flex absolute z-[100] space-x-4">

          <Button
            icon={<IoMdEye />}
            onClick={handleNavigate}
            className="text-white bg-blue-500 hover:bg-blue-600"
          />
          <Button
            icon={<TbEdit />}
            onClick={() => {
              setEditHotel(hotel);
              handleOpenModal();
            }}
            className="text-white bg-blue-500 hover:bg-blue-600"
          />
          <Popconfirm
            title="Are you sure you want to delete this hotel?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<IoMdTrash />}
              className="text-white bg-red-500 hover:bg-red-600"
            />
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

export default Card;
