import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button, notification, Spin } from "antd";
import axiosInstance from "../../utils/axiosConfig";

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required("Hotel name is required"),
    address: Yup.string().required("Address is required"),
    cost_per_night: Yup.number()
        .positive("Cost must be a positive number")
        .required("Cost per night is required"),
    available_rooms: Yup.number()
        .positive("Rooms must be a positive number")
        .integer("Rooms must be an integer")
        .required("Available rooms is required"),
    image: Yup.string().url("Invalid image URL").required("Image URL is required"),
    rating: Yup.number()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5")
        .required("Rating is required"),
});

const CreateUpdateHotel = ({ onCancel, refetch, editHotel }) => {
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            address: "",
            cost_per_night: "",
            available_rooms: "",
            image: "",
            rating: "",
        },
    });

    useEffect(() => {
        if (editHotel) {
            reset(editHotel); // Auto-fill form when editing a hotel
        }
    }, [editHotel, reset]);

    const onSubmit = (data) => {
        setLoading(true);
        const request = editHotel
            ? axiosInstance.put(`/hotel/${editHotel.id}`, data) // Update if editing
            : axiosInstance.post("/hotel", data); // Create if new

        request
            .then((response) => {
                if (response.status === 200) {
                    onCancel();
                    notification.success({
                        message: editHotel ? "Hotel updated successfully" : "Hotel added successfully",
                        description: `Hotel ${data.name} has been ${editHotel ? "updated" : "added"}!`,
                    });
                    refetch();
                }
            })
            .catch((error) => {
                notification.error({
                    message: `Error ${editHotel ? "updating" : "adding"} hotel`,
                    description: error.response?.data?.message || "An error occurred",
                });
            })
            .finally(() => {
                setLoading(false);
                reset(); // Clear form after submission
            });
    };

    return (
        <div className="max-w-lg mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-2" htmlFor="name">Hotel Name</label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <Input {...field} placeholder="Enter hotel name" />}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-2" htmlFor="address">Address</label>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => <Input {...field} placeholder="Enter hotel address" />}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-2" htmlFor="cost_per_night">Cost Per Night</label>
                    <Controller
                        name="cost_per_night"
                        control={control}
                        render={({ field }) => <Input {...field} type="number" placeholder="Enter cost per night" />}
                    />
                    {errors.cost_per_night && <p className="text-red-500 text-xs mt-1">{errors.cost_per_night.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-2" htmlFor="available_rooms">Available Rooms</label>
                    <Controller
                        name="available_rooms"
                        control={control}
                        render={({ field }) => <Input {...field} type="number" placeholder="Enter available rooms" />}
                    />
                    {errors.available_rooms && <p className="text-red-500 text-xs mt-1">{errors.available_rooms.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-2" htmlFor="image">Image URL</label>
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => <Input {...field} placeholder="Enter hotel image URL" />}
                    />
                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-2" htmlFor="rating">Rating</label>
                    <Controller
                        name="rating"
                        control={control}
                        render={({ field }) => <Input {...field} type="number" min={1} max={5} placeholder="Enter rating (1 to 5)" />}
                    />
                    {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>}
                </div>

                <Button type="primary" htmlType="submit" className="w-full mt-4 py-2" disabled={!isValid || loading}>
                    {loading ? <Spin /> : editHotel ? "Update Hotel" : "Add Hotel"}
                </Button>
            </form>
        </div>
    );
};

export default CreateUpdateHotel;
