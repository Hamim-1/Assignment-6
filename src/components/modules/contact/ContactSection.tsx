import contactImg from "@/assets/images/contact-image.png"
const ContactSection = () => {
    return (
        <section className="py-20 custom-container">

            <div className="flex flex-col space-y-3 text-center pb-10">
                <h2 className="text-3xl font-bold md:text-[44px] lg:text-6xl">Contact</h2>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 items-center bg-secondary rounded-4xl">
                <div className="p-14">
                    <img src={contactImg} alt="Image" className="mx-auto" />
                </div>

                <div className="bg-primary rounded-b-4xl md:rounded-bl-none md:rounded-r-4xl h-full text-white flex flex-col justify-center p-8">
                    <h2 className="text-3xl font-semibold">
                        Have Questions? Contact Us
                    </h2>
                    <p className="mt-4 text-sm md:text-lg">
                        For any problems or questions, feel free to reach out to us by filling up the form below
                    </p>

                    <form className="flex flex-col space-y-5 pt-5">
                        <input type="text" placeholder="Name" className="bg-[#C94245] px-5 py-2.5 rounded-lg" required />
                        <input type="email" placeholder="Email" className="bg-[#C94245] px-5 py-2.5 rounded-lg" required />
                        <input type="text" placeholder="Message" className="bg-[#C94245] px-5 py-2.5 rounded-lg" required />
                        <button className="cursor-pointer w-fit ml-auto border  px-5 py-2.5 rounded-xl">Sned Message</button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default ContactSection;