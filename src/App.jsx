import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Layout from "./components/Layout.jsx";
import Metrics from "./components/Metrics.jsx";
import OurTeam from "./components/OurTeam.jsx";
import Solution from "./components/Solution.jsx";
import ProjectSC from "./components/ProjectSC.jsx";
import OurApproach from "./components/OurApproach.jsx";

function App() {

    return (
        <Layout>
            <Hero/>
            <About/>
            <Metrics/>
            <OurTeam/>
            <Solution/>
            <ProjectSC/>
            <OurApproach/>
        </Layout>
    )
}

export default App;
