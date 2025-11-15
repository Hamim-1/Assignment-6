import { useState } from "react";
import {
    Users,
    Package,
    Shield,
    ShieldOff,
    Edit,
    UserCheck,
    Search,
    Filter
} from "lucide-react";
import { useGetAllParcelsQuery, useGetAllUsersQuery, useUpdateParcelStatusMutation, useUpdateUserStatusMutation } from "@/redux/api/baseApi";
import { toast, Toaster } from "react-hot-toast";

interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: "BLOCKED" | "ACTIVE";
    createdAt: string;
}

interface IParcel {
    _id: string;
    trackingId: string;
    sender: string;
    receiver: string;
    pickupAddress: string;
    deliveryAddress: string;
    status: string;
    createdAt: string;
    trackingEvents: Array<{
        status: string;
        timestamp: string;
        location: string;
        description: string;
    }>;
}

const AdminDashboard2 = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'parcels'>('users');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState<IParcel | null>(null);
    const [newStatus, setNewStatus] = useState('');

    const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery(undefined);
    const { data: parcelsData, isLoading: parcelsLoading } = useGetAllParcelsQuery(undefined);
    const [updateUserStatus] = useUpdateUserStatusMutation();
    const [updateParcelStatus] = useUpdateParcelStatusMutation();

    const users = usersData?.data || [];
    const parcels = parcelsData?.data || [];

    const filteredUsers = users.filter((user: IUser) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredParcels = parcels.filter((parcel: IParcel) => {
        const matchesSearch = parcel.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parcel.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            parcel.receiver.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || parcel.status === statusFilter;
        return matchesSearch && matchesStatus;
    });


    const stats = {
        totalUsers: users.length,
        activeUsers: users.filter((u: IUser) => u.status === "ACTIVE").length,
        blockedUsers: users.filter((u: IUser) => u.status).length,
        totalParcels: parcels.length,
        pending: parcels.filter((p: IParcel) => p.status === 'REQUESTED').length,
        inTransit: parcels.filter((p: IParcel) => p.status === 'IN_TRANSIT' || p.status === 'PICKED').length,
        delivered: parcels.filter((p: IParcel) => p.status === 'DELIVERED').length,
    };

    const handleBlockUser = async (userId: string, status: string) => {

        try {
            const paylod = {
                id: userId,
                status: status === "ACTIVE" ? "BLOCKED" : "ACTIVE"
            }
            await updateUserStatus(paylod).unwrap();
            toast.success("User status updated successfully!")
        } catch (error) {
            const errMsg = (error as any)?.data?.message || "Something went wrong!";
            toast.error(errMsg);
        }
    };

    const handleUpdateStatus = async (id: string) => {
        if (!selectedParcel || !newStatus) return;
        try {
            const paylod = {
                id,
                status: newStatus
            }
            await updateParcelStatus(paylod).unwrap()
            toast.success("Parcel status updated successfully!");
            setShowStatusModal(false);
            setSelectedParcel(null);
            setNewStatus('');
        } catch (error) {
            const errMsg = (error as any)?.data?.message || "Something went wrong!";
            toast.error(errMsg);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <Toaster />
            <div className="max-w-7xl mx-auto">

                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">Manage users and parcels</p>
                </div>


                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-600">Total Users</p>
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{stats.totalUsers}</p>
                            </div>
                            <Users className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-600">Active Users</p>
                                <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">{stats.activeUsers}</p>
                            </div>
                            <UserCheck className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-600">Total Parcels</p>
                                <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1">{stats.totalParcels}</p>
                            </div>
                            <Package className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-600">In Transit</p>
                                <p className="text-2xl sm:text-3xl font-bold text-orange-600 mt-1">{stats.inTransit}</p>
                            </div>
                            <Package className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
                        </div>
                    </div>
                </div>


                <div className="bg-white shadow rounded-lg mb-6 sm:mb-8">
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            <button
                                onClick={() => {
                                    setActiveTab('users');
                                    setSearchTerm('');
                                }}
                                className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors ${activeTab === 'users'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Users className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                                Manage Users
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('parcels');
                                    setSearchTerm('');
                                }}
                                className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-colors ${activeTab === 'parcels'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                                Manage Parcels
                            </button>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder={`Search ${activeTab}...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {activeTab === 'parcels' && (
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                                    >
                                        <option value="ALL">All Status</option>
                                        <option value="REQUESTED">Requested</option>
                                        <option value="PICKED">Picked</option>
                                        <option value="IN_TRANSIT">In Transit</option>
                                        <option value="DELIVERED">Delivered</option>
                                        <option value="CANCELED">Canceled</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>


                    {activeTab === 'users' && (
                        <div className="p-4 sm:p-6">
                            {usersLoading ? (
                                <div className="text-center py-8">Loading users...</div>
                            ) : filteredUsers.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">No users found</div>
                            ) : (
                                <>
                                    {/* Desktop Table */}
                                    <div className="hidden md:block overflow-x-auto">
                                        <table className="min-w-full border border-gray-300 border-collapse">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Name</th>
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Email</th>
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Role</th>
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Status</th>
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Joined</th>
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredUsers.map((user: IUser) => (
                                                    <tr key={user._id} className="hover:bg-gray-50">
                                                        <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base font-semibold">{user.name}</td>
                                                        <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">{user.email}</td>
                                                        <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">
                                                            <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">
                                                            <span onClick={() => handleBlockUser(user._id, user.status)} className={`inline-block px-2 py-1 rounded text-xs font-semibold ${user.status === "BLOCKED"
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-green-100 text-green-800'
                                                                }`}>
                                                                {user.status === "BLOCKED" ? 'Blocked' : 'Active'}
                                                            </span>
                                                        </td>
                                                        <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">
                                                            {new Date(user.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">
                                                            <button
                                                                onClick={() => handleBlockUser(user._id, user.status)}
                                                                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${user.status
                                                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                                                    : 'bg-red-500 text-white hover:bg-red-600'
                                                                    }`}
                                                            >
                                                                {user.status === "BLOCKED" ? (
                                                                    <>
                                                                        <Shield className="w-3 h-3 inline mr-1" />
                                                                        Unblock
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <ShieldOff className="w-3 h-3 inline mr-1" />
                                                                        Block
                                                                    </>
                                                                )}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile Cards */}
                                    <div className="md:hidden space-y-4">
                                        {filteredUsers.map((user: IUser) => (
                                            <div key={user._id} className="border border-gray-300 rounded-lg p-4 space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-semibold text-sm">{user.name}</p>
                                                        <p className="text-xs text-gray-500">{user.email}</p>
                                                    </div>
                                                    <span onClick={() => handleBlockUser(user._id, user.status)} className={`inline-block px-2 py-1 rounded text-xs font-semibold ${user.status === "BLOCKED"
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-green-100 text-green-800'
                                                        }`}>
                                                        {user.status === "BLOCKED" ? 'Blocked' : 'Active'}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase">Role</p>
                                                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                                                            {user.role}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase">Joined</p>
                                                        <p className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => handleBlockUser(user._id, user.status)}
                                                    className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${user.status === "BLOCKED"
                                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                                        : 'bg-red-500 text-white hover:bg-red-600'
                                                        }`}
                                                >
                                                    {user.status === "BLOCKED" ? (
                                                        <>
                                                            <Shield className="w-4 h-4 inline mr-1" />
                                                            Unblock User
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShieldOff className="w-4 h-4 inline mr-1" />
                                                            Block User
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}


                    {activeTab === 'parcels' && (
                        <div className="p-4 sm:p-6">
                            {parcelsLoading ? (
                                <div className="text-center py-8">Loading parcels...</div>
                            ) : filteredParcels.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">No parcels found</div>
                            ) : (
                                <>
                                    {/* Desktop Table */}
                                    <div className="hidden md:block overflow-x-auto">
                                        <table className="min-w-full border border-gray-300 border-collapse">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Tracking ID</th>
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Sender</th>
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Receiver</th>
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Pickup</th>
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Delivery</th>
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Status</th>
                                                    <th className="border px-3 lg:px-4 py-2 text-sm lg:text-base">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredParcels.map((parcel: IParcel) => (
                                                    <tr key={parcel._id} className="hover:bg-gray-50">
                                                        <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base font-mono">{parcel.trackingId}</td>
                                                        <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">{parcel.sender}</td>
                                                        <td className="border px-3 lg:px-4 py-2 text-sm lg:text-base">{parcel.receiver}</td>
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
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedParcel(parcel);
                                                                    setNewStatus(parcel.status);
                                                                    setShowStatusModal(true);
                                                                }}
                                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm transition-colors"
                                                            >
                                                                <Edit className="w-3 h-3 inline mr-1" />
                                                                Update
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile Cards */}
                                    <div className="md:hidden space-y-4">
                                        {filteredParcels.map((parcel: IParcel) => (
                                            <div key={parcel._id} className="border border-gray-300 rounded-lg p-4 space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase">Tracking ID</p>
                                                        <p className="font-mono font-semibold text-sm">{parcel.trackingId}</p>
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

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase">Sender</p>
                                                        <p className="text-sm">{parcel.sender}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase">Receiver</p>
                                                        <p className="text-sm">{parcel.receiver}</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase">Pickup</p>
                                                    <p className="text-sm">{parcel.pickupAddress}</p>
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase">Delivery</p>
                                                    <p className="text-sm">{parcel.deliveryAddress}</p>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        setSelectedParcel(parcel);
                                                        setNewStatus(parcel.status);
                                                        setShowStatusModal(true);
                                                    }}
                                                    className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm font-medium transition-colors"
                                                >
                                                    <Edit className="w-4 h-4 inline mr-1" />
                                                    Update Status
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                </div>


                {showStatusModal && selectedParcel && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 sm:p-8">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Update Parcel Status</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Tracking ID: <span className="font-mono font-semibold">{selectedParcel.trackingId}</span>
                            </p>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select New Status</label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="REQUESTED">Requested</option>
                                    <option value="PICKED">Picked</option>
                                    <option value="IN_TRANSIT">In Transit</option>
                                    <option value="DELIVERED">Delivered</option>
                                    <option value="CANCELED">Canceled</option>
                                </select>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => {
                                        setShowStatusModal(false);
                                        setSelectedParcel(null);
                                    }}
                                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleUpdateStatus(selectedParcel._id)}
                                    className="flex-1 bg-blue-600 text-white px-4 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base cursor-pointer"
                                >
                                    Update Status
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard2;