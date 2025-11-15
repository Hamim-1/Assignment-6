import Topbar from "@/components/common/Topbar";
import Stats from "@/components/common/Stats";
import { Toaster } from "react-hot-toast";
import ReceiverParcels from "../../components/modules/receiver/ParcelsTable";

const ReceiverDashboard = () => {
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