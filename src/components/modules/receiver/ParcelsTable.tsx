
import { useState } from "react";
import { Inbox, History } from "lucide-react";
import { useConfirmParcelMutation, useGetIncomingParcelsQuery } from "@/redux/api/baseApi";
import toast from "react-hot-toast";

interface IParcel {
    _id: string;
    trackingId: string;
    sender: string;
    senderContact: string;
    pickupAddress: string;
    deliveryAddress: string;
    status: string;
    fee: number;
    createdAt: string;
    trackingEvents: Array<{
        status: string;
        timestamp: string;
        location: string;
        description: string;
    }>;
}

const ReceiverParcels = () => {
    const { data, isLoading } = useGetIncomingParcelsQuery(undefined);
    const [selectedParcel, setSelectedParcel] = useState<IParcel | null>(null);
    const [activeTab, setActiveTab] = useState<'incoming' | 'history'>('incoming');
    const [confirmParcel, { isLoading: isUpdating }] = useConfirmParcelMutation();
    const allParcels = data?.data || [];

    const incomingParcels = allParcels.filter((p: IParcel) =>
        p.status !== 'DELIVERED' && p.status !== 'CANCELED'
    );

    const deliveryHistory = allParcels.filter((p: IParcel) =>
        p.status === 'DELIVERED' || p.status === 'CANCELED'
    );

    const currentParcels = activeTab === 'incoming' ? incomingParcels : deliveryHistory;

    const handleConfirmDelivery = async (parcelId: string) => {
        try {
            await confirmParcel(parcelId).unwrap();
            toast.success("Parcel Confirmed Succesfully!");
        } catch (error) {
            const errMsg =
                (error as any)?.data?.message ||
                (error as any)?.message ||
                "Something went wrong!";
            toast.error(errMsg);
        }
        setSelectedParcel(null);
    };

    if (isLoading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div className="bg-white shadow rounded p-4 sm:p-6 mt-4 sm:mt-6">

            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('incoming')}
                        className={`pb-3 px-1 text-sm sm:text-base font-medium transition-colors relative ${activeTab === 'incoming'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <Inbox className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                        Incoming Parcels ({incomingParcels.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`pb-3 px-1 text-sm sm:text-base font-medium transition-colors relative ${activeTab === 'history'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <History className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                        Delivery History ({deliveryHistory.length})
                    </button>
                </div>
            </div>


            {currentParcels.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        {activeTab === 'incoming' ? <Inbox className="w-16 h-16 mx-auto" /> : <History className="w-16 h-16 mx-auto" />}
                    </div>
                    <p className="text-gray-500 text-lg">
                        {activeTab === 'incoming' ? 'No incoming parcels' : 'No delivery history'}
                    </p>
                </div>
            )}


            {currentParcels.length > 0 && (
                <>
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full border border-gray-300 border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Tracking ID</th>
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Sender</th>
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">From</th>
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">To</th>
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Status</th>
                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Last Update</th>
                                    {activeTab === 'incoming' && (
                                        <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Actions</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {currentParcels.map((parcel: IParcel) => {
                                    const lastEvent = parcel.trackingEvents[parcel.trackingEvents.length - 1];

                                    return (
                                        <tr key={parcel._id} className="hover:bg-gray-50">
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">{parcel.trackingId}</td>
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">
                                                <div>
                                                    <p className="font-semibold">{parcel.sender}</p>
                                                    <p className="text-xs text-gray-500">{parcel.senderContact}</p>
                                                </div>
                                            </td>
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">{parcel.pickupAddress}</td>
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">{parcel.deliveryAddress}</td>
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">
                                                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${parcel.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                    parcel.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                                                        parcel.status === 'PICKED' ? 'bg-purple-100 text-purple-800' :
                                                            parcel.status === 'REQUESTED' ? 'bg-yellow-100 text-yellow-800' :
                                                                parcel.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {parcel.status}
                                                </span>
                                            </td>
                                            <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">
                                                {lastEvent && new Date(lastEvent.timestamp).toLocaleString()}
                                            </td>
                                            {activeTab === 'incoming' && (
                                                <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">
                                                    {parcel.status === "IN_TRANSIT" ? (
                                                        <button
                                                            onClick={() => handleConfirmDelivery(parcel._id)}
                                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm transition-colors"
                                                        >
                                                            Confirm
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-500">—</span>
                                                    )}
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                        {currentParcels.map((parcel: IParcel) => {
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
                                                parcel.status === 'PICKED' ? 'bg-purple-100 text-purple-800' :
                                                    parcel.status === 'REQUESTED' ? 'bg-yellow-100 text-yellow-800' :
                                                        parcel.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'
                                            }`}>
                                            {parcel.status}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Sender</p>
                                        <p className="text-sm font-semibold">{parcel.sender}</p>
                                        <p className="text-xs text-gray-500">{parcel.senderContact}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">From Address</p>
                                        <p className="text-sm">{parcel.pickupAddress}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">To Address</p>
                                        <p className="text-sm">{parcel.deliveryAddress}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Last Update</p>
                                        <p className="text-sm">
                                            {lastEvent && new Date(lastEvent.timestamp).toLocaleString()}
                                        </p>
                                    </div>

                                    {activeTab === 'incoming' && (
                                        <>
                                            {parcel.status === "IN_TRANSIT" ? (
                                                <button
                                                    onClick={() => handleConfirmDelivery(parcel._id)}
                                                    className="w-full bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-sm font-medium transition-colors"
                                                >
                                                    Confirm Delivery
                                                </button>
                                            ) : (
                                                <div className="text-center text-gray-400 text-sm py-2">No actions available</div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}


        </div>
    );
};

export default ReceiverParcels;