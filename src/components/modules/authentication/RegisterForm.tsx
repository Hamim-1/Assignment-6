import registerImg from "@/assets/images/register.jpg";
import { useState } from "react";
import { Link } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { useRegisterMutation } from "@/redux/api/baseApi";
import { IRegisterForm } from "@/types/register.types";
import { validateRegister } from "@/utils/validation/registerValidation";

const RegisterForm = () => {
    const [register, { isLoading }] = useRegisterMutation();
    const [form, setForm] = useState<IRegisterForm>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "SENDER",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateRegister(form);
        if (validationError) {
            toast.error(validationError);
        } else {
            try {
                const data = await register(form).unwrap();
                toast.success("User created successfully!");
                console.log(data);

                setForm({ name: "", email: "", password: "", confirmPassword: "", role: "SENDER" });

            } catch (error: unknown) {
                const errMsg =
                    (error as any)?.data?.message ||
                    (error as any)?.message ||
                    "Something went wrong!";
                toast.error(errMsg);
                console.log(error);

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
                <h2 className="text-3xl font-bold md:text-[44px] lg:text-6xl">Register</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 items-center bg-secondary rounded-4xl overflow-hidden">

                <div className="bg-primary md:rounded-l-4xl h-full text-white flex flex-col justify-center p-10 order-2 md:order-1">
                    <h2 className="text-3xl font-semibold">Create Your Account</h2>
                    <p className="mt-4 text-sm md:text-lg">
                        Fill in the details below to register as a sender or receiver.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col space-y-5 pt-6">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="bg-[#C94245] px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white"
                            required
                        />
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
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="bg-[#C94245] px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white"
                            required
                        />
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="bg-[#C94245] px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-white"
                        >
                            <option value="SENDER">Sender</option>
                            <option value="RECEIVER">Receiver</option>
                        </select>

                        <button
                            type="submit"
                            className="cursor-pointer w-fit ml-auto border border-white px-6 py-2.5 rounded-xl hover:bg-white hover:text-primary transition"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-4 text-sm">
                        Already have an account? <Link to="/login" className="underline">Login here</Link>
                    </p>
                </div>


                <div className="p-5 lg:p-12 bg-gray-100 flex items-center justify-center order-1 md:order-2">
                    <img src={registerImg} alt="Register" className="mx-auto rounded-2xl" />
                </div>
            </div>
        </section>
    );
};

export default RegisterForm;
