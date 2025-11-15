import trackImg from "@/assets/images/track-parcel.png"
import deliveryImg from "@/assets/images/deliver-parcel.png"
import pickImg from "@/assets/images/pick-parcel.png"
import { Link } from "react-router";

const HowItWork = () => {
    const howItWorkSteps = [
        {
            img: pickImg,
            title: "Submit Request For Shipment",
            description: "Fill up the form for shipment and handover your package to our delivery men"
        },
        {
            img: trackImg,
            title: "Track Your Shipment In Real-Time",
            description: "Get real-time updates about your package and track your shipment progress"
        },
        {
            img: deliveryImg,
            title: "Have Your Package Delivered To Your Doorstept",
            description: "Have Your Package Delivered To Your Doorstep"
        },
    ]
    return (
        <section className="custom-container mx-auto flex flex-col space-y-20 py-16">

            <div className="flex flex-col space-y-3 text-center">
                <h2 className="text-3xl font-bold md:text-[44px] lg:text-6xl">How It Works</h2>
                <p> Have your products delivered anywhere in 3 easy steps</p>
            </div>

            <div className="flex flex-col space-y-16">
                {
                    howItWorkSteps.map((step, i) => (
                        <div className={`flex flex-col gap-6 items-center md:gap-8 ${i === 1 ? "md:flex-row-reverse" : "md:flex-row "}`} key={i}>


                            <div className="mx-auto w-1/2 md:w-full">
                                <img src={step.img} className="max-h-96" alt="" />
                            </div>

                            <div className="mx-auto sm:w-[500px] md:w-full text-center md:text-left">
                                <div className="flex flex-col space-y-4">
                                    <h2 className="text-3xl lg:text-5xl lg:leading-16 font-bold">
                                        {step.title}
                                    </h2>
                                    <p className="text-sm tracking-wide text-gray-400">
                                        {step.description}
                                    </p>

                                    <Link to="" className="bg-secondary text-primary rounded-3xl w-fit px-5 py-2.5">Learn more</Link>
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default HowItWork;