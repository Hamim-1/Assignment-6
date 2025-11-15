import Topbar from "@/components/common/Topbar";
import CreateParcelForm from "@/components/modules/sender/CreateParcelForm";
import ParcelTable from "@/components/modules/sender/ParcelTable";
import { useGetMeQuery } from "@/redux/api/baseApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";


const SenderDashboard = () => {
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const { data, isLoading, isError, isSuccess } = useGetMeQuery(undefined, {
        skip: !!user
    });
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (isSuccess && data && !user) {
            dispatch(setUser(data.data));
        }
    }, [isSuccess, data, user, dispatch]);


    useEffect(() => {
        if (!isLoading && isError) {
            navigate("/");
        }
    }, [isLoading, isError, navigate]);


    if (isLoading) return <h2>Loading...</h2>;
    return (
        <div className="min-h-screen">
            <Toaster position="top-center" />

            {/* <Sidebar /> */}
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="p-6">
                    <CreateParcelForm />
                    <ParcelTable />
                </main>
            </div>
        </div>
    );
};

export default SenderDashboard;
