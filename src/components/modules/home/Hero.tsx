import heroImage from "@/assets/images/hero-img.png"
import heroBanner from "@/assets/images/hero-banner.png"
const Hero = () => {
    return (

        <section
            className="relative bg-no-repeat bg-right bg-cover lg:min-h-[90vh]"
            style={{ backgroundImage: `url(${heroBanner})` }}
        >
            <div className="custom-container mx-auto px-4 md:py-32">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">


                    <div className="mx-auto sm:w-[500px] md:w-full text-center md:text-left">
                        <div>
                            <h2 className="text-3xl font-bold md:text-[44px] lg:text-6xl lg:leading-20">
                                Trust In The Fastest & Most Reliable Delivery Service
                            </h2>
                            <p className="mt-4 text-sm md:text-lg tracking-wide text-gray-400">
                                Get your packages delivered quickly and safely with Delibox. Track and locate your items and receive real-time updates.
                            </p>
                        </div>
                    </div>


                    <div className="mx-auto w-1/2 md:w-full">
                        <img src={heroImage} className="" alt="" />
                    </div>

                </div>
            </div>
        </section>

    );
};

export default Hero;