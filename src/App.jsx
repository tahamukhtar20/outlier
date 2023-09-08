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
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ContactForm from "./components/ContactForm.jsx";

function App() {

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<>
                        <Hero/>
                        <About/>
                        <Metrics/>
                        <OurTeam/>
                        <Solution/>
                        <ProjectSC/>
                        <OurApproach/>
                    </>
                    }>
                    </Route>
                    <Route path={"/contact"} element={
                        <ContactForm/>
                    }>
                    </Route>
                </Routes>
            </Layout>
        </BrowserRouter>

    )
}

export default App;
