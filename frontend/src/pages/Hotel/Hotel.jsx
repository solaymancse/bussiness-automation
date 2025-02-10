import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import axiosInstance from "../../utils/axiosConfig";
import { message, Modal, Spin } from "antd";
import CreateUpdateHotel from "../../components/hotel/CreateUpdateHotel";

const Hotel = () => {
    const [loading, setLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [editHotel, setEditHotel] = useState();

    const fetchHotels = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/hotel");
            setHotels(response.data.data);
        } catch (error) {
            console.error("Error fetching hotels:", error);
            message.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchHotels()
    }, []);

    const handleOpenModal = () => {
        setIsOpenModal(true);
    }

    const refetch = () => {
        setLoading(true);
        fetchHotels();
    }


    return (
        <>
            {loading ? <div className="flex justify-center  w-full h-full items-center"><Spin size="large" /></div> : <>
                <div className="flex mb-4 justify-end"><button onClick={handleOpenModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Hotel</button></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {hotels.map((hotel, index) => (
                        <Card handleOpenModal={handleOpenModal} setEditHotel={setEditHotel} key={index} hotel={hotel} refetch={refetch} />
                    ))}
                </div>
                <Modal title="Add Hotel" footer={null} open={isOpenModal} onCancel={() => setIsOpenModal(false)}>
                    <CreateUpdateHotel editHotel={editHotel} onCancel={() => setIsOpenModal(false)} refetch={refetch} />
                </Modal>
            </>}
        </>

    );
};

export default Hotel;