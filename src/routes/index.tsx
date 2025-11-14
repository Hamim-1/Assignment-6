import App from "@/App";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
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
])