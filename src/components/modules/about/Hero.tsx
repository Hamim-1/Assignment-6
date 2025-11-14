import heroImage from "@/assets/images/about-hero-image.png"
import heroBg from "@/assets/images/about-hero-bg.png"
const Hero = () => {
    return (

        <section
            className="relative bg-no-repeat bg-right py-14"
            style={{ backgroundImage: `url(${heroBg})` }}
        >
            <div className="custom-container mx-auto px-4 md:py-32">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">


                    <div className="mx-auto sm:w-[500px] md:w-full text-center md:text-left">
                        <div>
                            <h2 className="text-3xl font-bold md:text-[44px] lg:text-5xl lg:leading-16">
                                We Provide The Most Reliable Delivery Service
                            </h2>
                            <p className="mt-4 text-sm md:text-lg tracking-wide">
                                Get your packages delivered quickly and safely with Delibox. Track and locate your items and receive real-time updates. 100% reliable service. We deliver your packages safely and securely. Get your packages delivered anywhere with worldwide shipping. Fill up the form for shipment and handover your package to our delivery men.
                            </p>
                            <p className="mt-4 text-sm md:text-lg tracking-wide">
                                Get real-time updates about your package and track your shipment progress. Your packages will be delivered right on time on your receiver’s doorstep
                            </p>
                        </div>
                    </div>


                    <div className="mx-auto w-1/2 md:w-full text-right">
                        <img src={heroImage} className="ml-auto" alt="" />
                    </div>

                </div>
            </div>
        </section>

    );
};

export default Hero;