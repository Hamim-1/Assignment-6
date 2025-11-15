import { useGetMyParcelsQuery } from "@/redux/api/baseApi";
import { CheckCircle, Clock, MapPin, Package, XCircle } from "lucide-react";

const Stats = () => {
    const { data, isLoading, isError } = useGetMyParcelsQuery(undefined);

    // Calculate stats from the parcels data
    const stats = {
        total: data?.data?.length || 0,
        requested: data?.data?.filter((p: any) => p.status === "REQUESTED").length || 0,
        picked: data?.data?.filter((p: any) => p.status === "PICKED").length || 0,
        inTransit: data?.data?.filter((p: any) => p.status === "IN_TRANSIT").length || 0,
        delivered: data?.data?.filter((p: any) => p.status === "DELIVERED").length || 0,
        canceled: data?.data?.filter((p: any) => p.status === "CANCELED").length || 0,
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow p-4 sm:p-6 animate-pulse">
                        <div className="h-16"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600 text-sm">Failed to load statistics</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs sm:text-sm text-gray-600">Total Parcels</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                    </div>
                    <Package className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs sm:text-sm text-gray-600">Requested</p>
                        <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-1">{stats.requested}</p>
                    </div>
                    <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs sm:text-sm text-gray-600">Picked</p>
                        <p className="text-2xl sm:text-3xl font-bold text-yellow-600 mt-1">{stats.picked}</p>
                    </div>
                    <Package className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-500" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs sm:text-sm text-gray-600">In Transit</p>
                        <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1">{stats.inTransit}</p>
                    </div>
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs sm:text-sm text-gray-600">Delivered</p>
                        <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">{stats.delivered}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
                </div>
            </div>

            {stats.canceled > 0 && (
                <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs sm:text-sm text-gray-600">Canceled</p>
                            <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-1">{stats.canceled}</p>
                        </div>
                        <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stats;