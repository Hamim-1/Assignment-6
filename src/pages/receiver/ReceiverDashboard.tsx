import Topbar from "@/components/common/Topbar";
import Stats from "@/components/common/Stats";
import { Toaster } from "react-hot-toast";
import ReceiverParcels from "../../components/modules/receiver/ParcelsTable";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useGetMeQuery } from "@/redux/api/baseApi";
import { useEffect } from "react";
import { setUser } from "@/redux/features/auth/authSlice";
import { Navigate } from "react-router";

const ReceiverDashboard = () => {
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


    if (isError || (user && user.role !== "RECEIVER")) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="min-h-screen">
            <Toaster position="top-center" />

            {/* <Sidebar /> */}
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="p-6">
                    <Stats />
                    <ReceiverParcels />
                </main>
            </div>
        </div>
    );
};

export default ReceiverDashboard;