import loginImg from "@/assets/images/login.avif";
import { useLoginMutation } from "@/redux/api/baseApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.password.trim()) {
            toast.error("Password is required")
        } else {
            try {
                const data = await login(form).unwrap();

                toast.success("Log In successfully!");
                const role = (data.data.user.role as string).toLowerCase();
                navigate(`/dashboard/${role}`)
                setForm({ email: "", password: "" })

            } catch (error: unknown) {
                const errMsg =
                    (error as any)?.data?.message ||
                    (error as any)?.message ||
                    "Something went wrong!";
                toast.error(errMsg);

            }
        }

    };

    return (
        <section className="py-20 custom-container">
            <div className="pb-5">
                <Link
                    to="/"
                    className="text-primary hover:underline font-medium"
                >
                    &#8592; Back to Home
                </Link>
            </div>

            <Toaster position="top-center" />

            <div className="text-center pb-10">
                <h2 className="text-3xl font-bold md:text-[44px] lg:text-6xl">Login</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 items-center bg-secondary rounded-4xl overflow-hidden">

                <div className="p-14 bg-gray-100 flex items-center justify-center">
                    <img src={loginImg} alt="Login" className="mx-auto rounded-2xl" />
                </div>


                <div className="bg-primary rounded-b-4xl md:rounded-bl-none md:rounded-r-4xl h-full text-white flex flex-col justify-center p-10">
                    <h2 className="text-3xl font-semibold">Log In to Your Account</h2>
                    <p className="mt-4 text-sm md:text-lg">
                        Enter your credentials to access your dashboard.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-5 pt-6">
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="bg-[#C94245] px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="bg-[#C94245] px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white"
                            required
                        />

                        <button
                            type="submit"
                            className="cursor-pointer w-fit ml-auto border border-white px-6 py-2.5 rounded-xl hover:bg-white hover:text-primary transition"
                        >
                            Log In
                        </button>
                    </form>

                    <p className="mt-4 text-sm">
                        Don't have an account? <Link to="/register" className="underline">Register here</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
