import App from "@/App";
import About from "@/pages/About";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ReceiverDashboard from "@/pages/receiver/ReceiverDashboard";
import Register from "@/pages/Register";
import SenderDashboard from "@/pages/sender/SenderDashboard";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: Home,
                path: "/"
            },
            {
                Component: Contact,
                path: "/contact"
            },
            {
                Component: About,
                path: "/about"
            },

        ]
    },

    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: SenderDashboard,
        path: "/dashboard/sender"
    },
    {
        Component: ReceiverDashboard,
        path: "/dashboard/receiver"
    },
    {
        Component: AdminDashboard,
        path: "/dashboard/admin"
    },
    {
        Component: NotFound,
        path: "*"
    }
])