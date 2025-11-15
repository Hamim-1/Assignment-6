import { ICreateParcel } from "@/types/createParcel.types";


export const checkParcelValidation = (data: ICreateParcel) => {


    if (!data.receiver.trim()) {
        return "Receiver is required";
    }
    if (!data.pickupAddress.trim()) {
        return "Pickup Address is required";
    }

    if (!data.deliveryAddress.trim()) {
        return "Delivery Address is required";
    }

    if (data.fee < 10) {
        return "Minimum fee is 10";
    }

    return null;
};
