import { IRegisterForm } from "@/types/register.types";

export const validateRegister = (data: IRegisterForm) => {


    if (!data.name.trim()) {
        return "Name is required";
    }
    if (data.name.trim().length < 2) {
        return "Name is too short";
    }

    if (!data.email.trim()) {
        return "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
        return "Invalid email format";
    }

    if (!data.password) {
        return "Password is required";
    }
    if (data.password.length < 8) {
        return "Password must be at least 8 characters";
    }

    if (!/[A-Z]/.test(data.password)) {
        return "Password must include at least 1 uppercase letter";
    }


    if (data.password !== data.confirmPassword) {
        return "Passwords do not match";
    }

    return null;
};
