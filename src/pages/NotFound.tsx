import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function NotFound() {
    const naviage = useNavigate();
    const handleGoHome = () => {
        naviage("/")
    };

    const handleGoBack = () => {
        naviage(-1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">


                {/* 404 Text */}
                <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-gray-900 mb-4">
                    4<span className="text-blue-600">0</span>4
                </h1>

                {/* Error Message */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    Oops! Page Not Found
                </h2>

                <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    The page you're looking for seems to have been lost in transit.
                    Don't worry, we'll help you find your way back!
                </p>


                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <button
                        onClick={handleGoHome}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 w-full sm:w-auto"
                    >
                        <Home className="w-5 h-5" />
                        Go to Homepage
                    </button>

                    <button
                        onClick={handleGoBack}
                        className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium border-2 border-gray-200 shadow-md hover:shadow-lg transform hover:scale-105 duration-200 w-full sm:w-auto"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>



                <div className="mt-12 text-sm text-gray-500">
                    Error Code: 404 | Page Not Found
                </div>
            </div>
        </div>
    );
}