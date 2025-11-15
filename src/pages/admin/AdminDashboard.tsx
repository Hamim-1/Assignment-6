import Topbar from "@/components/common/Topbar";
import { useGetMeQuery } from "@/redux/api/baseApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router";
import AdminDashboardContent from "@/components/modules/admin/Admin";


const AdminDashboard = () => {
    const { user } = useAppSelector((state) => state.auth);
    const { data, isLoading, isError, isSuccess } = useGetMeQuery(undefined, {
        skip: !!user
    });
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (isSuccess && data && !user) {
            dispatch(setUser(data.data));
        }
    }, [isSuccess, data, user, dispatch]);


    if (isLoading) return <h2>Loading...</h2>;


    if (isError || (user && user.role !== "ADMIN")) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="min-h-screen">
            <Toaster position="top-center" />


            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="p-6">
                    <AdminDashboardContent />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
