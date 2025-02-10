import { useLocation } from "react-router-dom";

const HotelDetails = () => {
    const hotels = useLocation();

    const hotel = hotels?.state || {};

    const socialLinks = (hotel) => ({
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
        instagram: `https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(hotel.name)}&summary=${encodeURIComponent(hotel.address)}&source=`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(hotel.name)} - ${encodeURIComponent(hotel.address)}`,
    });

    return (
        <div className="flex flex-col p-6 lg:flex-row h-screen bg-white">
            {/* Left Side: Hotel Image */}
            <div className="flex-1">
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-[400px] object-cover rounded-lg"
                />
            </div>

            {/* Right Side: Hotel Details */}
            <div className="flex-1 p-6 bg-white rounded-lg lg:ml-6 mt-6 lg:mt-0">
                <h2 className="text-4xl font-semibold text-gray-800">{hotel.name}</h2>
                <p className="text-lg text-gray-600 mt-2">{hotel.address}</p>

                {/* Rating */}
                <div className="mt-4 flex items-center">
                    <span className="text-xl text-yellow-500">⭐</span>
                    <p className="text-lg text-gray-700 ml-2">{hotel.rating} / 5</p>
                </div>

                {/* Cost per Night */}
                <div className="mt-4 flex items-center">
                    <span className="text-2xl font-semibold text-gray-800">${hotel.cost_per_night}</span>
                    <span className="text-lg text-gray-500 ml-2">per night</span>
                </div>

                {/* Available Rooms */}
                <div className="mt-4">
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">Available Rooms:</span> {hotel.available_rooms}
                    </p>
                </div>

                <div className="mt-6 flex space-x-4">
                        <a href={socialLinks(hotel).facebook} target="_blank" rel="noopener noreferrer">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-8 h-8" />
                        </a>
                        <a href={socialLinks(hotel).instagram} target="_blank" rel="noopener noreferrer">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-8 h-8" />
                        </a>
                        <a href={socialLinks(hotel).linkedin} target="_blank" rel="noopener noreferrer">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo_2023.svg" alt="LinkedIn" className="w-8 h-8" />
                        </a>
                        <a href={socialLinks(hotel).twitter} target="_blank" rel="noopener noreferrer">
                            <img src="https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_2021.svg" alt="Twitter" className="w-8 h-8" />
                        </a>
                    </div>
            </div>
        </div>
    );
};

export default HotelDetails;
