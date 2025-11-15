interface TrackingEvent {
    status: string;
    timestamp: string;
    note: string;
}
export interface IParcel {
    _id: string;
    trackingId: string;
    receiver: string;
    pickupAddress: string;
    deliveryAddress: string;
    status: string;
    trackingEvents: TrackingEvent[];
}