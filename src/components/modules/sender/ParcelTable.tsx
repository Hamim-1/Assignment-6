import { useCancleParcelMutation, useGetMyParcelsQuery } from "@/redux/api/baseApi";
import { IParcel } from "@/types/parcel.types";
import toast from "react-hot-toast";

const ParcelTable = () => {

    const { data, isLoading, isError } = useGetMyParcelsQuery(undefined);
    const [cancelParcel, { isLoading: isUpdating }] = useCancleParcelMutation();

    let parcels = [];
    if (data) {
        parcels = data.data;
    }
    const handleCancelParcel = async (id: string) => {
        console.log(id);

        try {
            await cancelParcel(id).unwrap();
            toast.success("Parcel Canceled Succesfully!");
        } catch (error) {
            const errMsg =
                (error as any)?.data?.message ||
                (error as any)?.message ||
                "Something went wrong!";
            toast.error(errMsg);
        }
    }

    return (
        <div className="bg-white shadow rounded p-4 sm:p-6 mt-4 sm:mt-6 w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">My Parcels</h2>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong</p>}
            {parcels &&
                <>

                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full border border-gray-300 border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Tracking ID</th>
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Receiver</th>
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Pickup</th>
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Delivery</th>
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Status</th>
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Last Update</th>
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parcels.map((parcel: IParcel) => {
                                    const lastEvent = parcel.trackingEvents[parcel.trackingEvents.length - 1];

                                    return (
                                        <tr key={parcel._id} className="hover:bg-gray-50">
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">{parcel.trackingId}</td>
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">{parcel.receiver}</td>
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">{parcel.pickupAddress}</td>
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">{parcel.deliveryAddress}</td>
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">
                                                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${parcel.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                    parcel.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                                                        parcel.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {parcel.status}
                                                </span>
                                            </td>
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">
                                                {lastEvent && new Date(lastEvent.timestamp).toLocaleString()}
                                            </td>
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">
                                                {parcel.status === "REQUESTED" ? (
                                                    <button onClick={() => handleCancelParcel(parcel._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition-colors">
                                                        Cancel
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-500">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>


                    <div className="md:hidden space-y-4">
                        {parcels.map((parcel: IParcel) => {
                            const lastEvent = parcel.trackingEvents[parcel.trackingEvents.length - 1];

                            return (
                                <div key={parcel._id} className="border border-gray-300 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Tracking ID</p>
                                            <p className="font-semibold text-sm">{parcel.trackingId}</p>
                                        </div>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${parcel.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                            parcel.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                                                parcel.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {parcel.status}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Receiver</p>
                                        <p className="text-sm">{parcel.receiver}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Pickup Address</p>
                                        <p className="text-sm">{parcel.pickupAddress}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Delivery Address</p>
                                        <p className="text-sm">{parcel.deliveryAddress}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Last Update</p>
                                        <p className="text-sm">{lastEvent && <span className="text-sm">{lastEvent && new Date(lastEvent.timestamp).toLocaleString()}</span>}</p>
                                    </div>

                                    {parcel.status === "REQUESTED" ? (
                                        <button onClick={() => handleCancelParcel(parcel._id)} className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm font-medium transition-colors">
                                            Cancel Parcel
                                        </button>
                                    ) : (
                                        <div className="text-center text-gray-400 text-sm py-2">No actions available</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            }
        </div>
    );
};

export default ParcelTable;
