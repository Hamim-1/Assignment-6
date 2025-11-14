import whatMakesUsDifferentImg from "@/assets/images/whatMakeUsDifferent.png"
import { CheckCircleIcon } from "@/components/icons/CheckCircle";

const WhatMakesUsDifferent = () => {
    return (
        <section className="pb-20">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-12 custom-container items-center bg-secondary rounded-4xl p-8">
                <div>
                    <img src={whatMakesUsDifferentImg} alt="Image" className="mx-auto" />
                </div>

                <div>
                    <h2 className="text-3xl font-bold md:text-[44px] lg:text-5xl lg:leading-16">
                        What Makes Us Different?
                    </h2>
                    <p className="mt-4 text-sm md:text-lg tracking-wide">
                        Get your packages delivered quickly and safely with Delibox. Track and locate your items and receive real-time updates.
                    </p>
                    <div className="flex flex-col space-y-5 pt-8">
                        <div className="flex space-x-2 items-center">
                            <CheckCircleIcon className="size-8 bg-white text-green-500 rounded-full" />

                            <p>Quick delivery with real-time tracking, updates and notifications</p>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <CheckCircleIcon className="size-8 bg-white text-green-500 rounded-full" />
                            <p>100% reliable service. We deliver your packages safely and securely</p>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <CheckCircleIcon className="size-8 bg-white text-green-500 rounded-full" />
                            <p>Get your packages delivered anywhere with worldwide shipping</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WhatMakesUsDifferent;