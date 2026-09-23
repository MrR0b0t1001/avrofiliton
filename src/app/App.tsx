import About from "../components/About/About";
import FoodStories from "../components/FoodStories/FoodStories";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Menu from "../components/Menu/Menu";
import Navbar from "../components/Navbar/Navbar";
import Testimonials from "../components/Testimonials/Testimonials";
import Visit from "../components/Visit/Visit";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <FoodStories />
      <Visit />
      <Testimonials />
      <Footer />
    </>
  );
};

export default App;
