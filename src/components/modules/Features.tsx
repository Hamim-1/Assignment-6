import featureImg1 from "@/assets/images/feature-1.png"
import featureImg2 from "@/assets/images/feature-2.png"
import featureImg3 from "@/assets/images/feature-3.png"

const Features = () => {
    const features = [
        {
            img: featureImg1,
            title: "Fast Delivery",
            description: "Quick delivery with real-time tracking, updates and notifications"
        },
        {
            img: featureImg2,
            title: "Secure Service",
            description: "100% reliable service. We deliver your packages safely and securely."
        },
        {
            img: featureImg3,
            title: "Worldwide Shipping",
            description: "Get your packages delivered anywhere with worldwide shipping"
        },
    ]
    return (
        <div className="custom-container py-14">
            <div className="mx-auto max-w-lg text-center">
                <h2 className="text-3xl/tight font-bold sm:text-4xl">Features</h2>

                <p className="mt-4 text-lg text-pretty text-gray-700">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis tenetur, nemo quam
                    voluptas sunt impedit dolorem asperiores aliquid doloribus fugit.
                </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                {
                    features.map((feature, i) => (
                        <div className="rounded-lg shadow-lg border-gray-200 p-6" key={i}>
                            <div className="inline-flex rounded-full bg-secondary p-3">
                                <img src={feature.img} alt="" />
                            </div>

                            <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>

                            <p className="mt-2 text-pretty text-gray-700">
                                {feature.description}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Features;