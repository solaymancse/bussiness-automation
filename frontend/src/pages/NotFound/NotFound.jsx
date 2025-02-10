import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-9xl font-bold text-blue-800">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page not found</h2>
      <p className="text-lg text-gray-600 mt-2">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/dashboard/hotel"
        className="mt-6 px-6 py-3 bg-blue-800 text-white rounded-lg text-lg font-medium shadow-md hover:bg-white hover:text-blue-800 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
