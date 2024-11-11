import Banner from "../components/Landing/Banner";
import ChooseUs from "../components/Landing/ChooseUs";
import Features from "../components/Landing/Features";
import Pricing from "../components/Landing/Pricing";
import TestimonialSection from "../components/Landing/Testimonials";
import Nav from "../components/resuable/Nav";
import useTitle from "../hooks/useTitle";

const Landing:React.FC = () => {

    /** HOOKS */
    useTitle("Transform Voice to Words & Words to Voice - HearText")

    return (
        <>

            <Nav />

            <Banner />
            
            <Features />

            <ChooseUs />

            <Pricing />

            <TestimonialSection />

        </>
    )
}

export default Landing;