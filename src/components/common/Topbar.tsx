import { useLogoutMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import Logo from "@/assets/images/logo.png"
const Topbar = () => {
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout(undefined).unwrap();
            toast.success("Log out succesfully");
            navigate("/")
        } catch (error: any) {
            toast.error(error?.message || error)
        }
    }
    return (
        <div className="bg-white shadow p-4 flex justify-between items-center">
            <Link to="/">
                <img src={Logo} alt="logo" className="w-20 md:w-auto" />
            </Link>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>
    );
};

export default Topbar;
