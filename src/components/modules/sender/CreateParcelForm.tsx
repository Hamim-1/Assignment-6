import { useCreateParcelMutation } from "@/redux/api/baseApi";
import { ICreateParcel } from "@/types/createParcel.types";
import { checkParcelValidation } from "@/utils/validation/createParcelValidation";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateParcelForm = () => {
    const [createParcel] = useCreateParcelMutation();
    const [form, setForm] = useState<ICreateParcel>({
        receiver: "",
        pickupAddress: "",
        deliveryAddress: "",
        fee: 10,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = checkParcelValidation(form);
        if (validationError) {
            toast.error(validationError);
        } else {
            try {
                const data = await createParcel(form).unwrap();
                toast.success("Parcel created successfully!");
                console.log(data);

                setForm({
                    receiver: "",
                    pickupAddress: "",
                    deliveryAddress: "",
                    fee: 10,
                });

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
        <div className="bg-white shadow rounded p-6">
            <h2 className="text-2xl font-bold mb-4">Create Parcel</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="receiver"
                    value={form.receiver}
                    onChange={handleChange}
                    placeholder="Receiver Id"
                    className="border p-3 rounded"
                    required
                />
                <input
                    type="text"
                    name="pickupAddress"
                    value={form.pickupAddress}
                    onChange={handleChange}
                    placeholder="Pickup Address"
                    className="border p-3 rounded"
                    required
                />
                <input
                    type="text"
                    name="deliveryAddress"
                    value={form.deliveryAddress}
                    onChange={handleChange}
                    placeholder="Delivery Address"
                    className="border p-3 rounded"
                    required
                />
                <input
                    type="number"
                    name="fee"
                    value={form.fee}
                    onChange={handleChange}
                    placeholder="Fee"
                    className="border p-3 rounded"
                    min={10}
                    required
                />
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateParcelForm;
