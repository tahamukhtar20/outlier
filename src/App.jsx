import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Layout from "./components/Layout.jsx";
import Metrics from "./components/Metrics.jsx";
import OurTeam from "./components/OurTeam.jsx";
import Solution from "./components/Solution.jsx";

function App() {

    return (
        <Layout>
            <Hero/>
            <About/>
            <Metrics/>
            <OurTeam/>
            <Solution/>
        </Layout>
    )
}

export default App
