
import Features from '@/components/modules/home/Features';
import Hero from './../components/modules/home/Hero';
import HowItWork from '@/components/modules/home/HowItWork';

const Home = () => {
    return (
        <div className="py-16">
            <Hero />
            <Features />
            <HowItWork />
        </div>
    );
};

export default Home;