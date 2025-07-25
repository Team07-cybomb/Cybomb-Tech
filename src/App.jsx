import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./component/ScrollToTop";
import Nav from "./component/nav/nav";
import Footer from "./component/footer/footer";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./component/services/services";
import Mobileappservice from "./pages/mobile-app-service";
import Webappservice from "./pages/web-app-service";
import Aimachinelearning from "./pages/ai-machine-learning";
import Saasproduct from "./pages/saas-product";
import Uiuxservices from "./pages/ui-ux-service";
import Softwareconsulting from "./pages/software-consulting ";
import Prortfolio from "./pages/portfolio";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import NotFoundPage from "./pages/404";
import Privacypolicy from "./pages/privacy-policy";
import Terms from "./pages/terms";
import Refundpolicy from "./pages/refund-policy";
import Career from "./pages/career";
import Faq from "./pages/faq";
import MobileAppDevelopment from "./component/pages-services/design-development/mobile-app-development/mobile-app-development";
import AndoridAppDevelopment from "./component/pages-services/design-development/android-app-dev/android-app-development";
<<<<<<< HEAD
import WebDev from "./component/pages-services/design-development/web-development/web-dev";
=======

// ms
// 
// 
// 
// 
// 
// 

// sudesh
// 
// 
// 
// 
// 

// santhosh
// 
// 
// 
// 



>>>>>>> bfb7373c512991785fe910dccfdaed3bb6cfcecd
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/mobile-app" element={<Mobileappservice />} />
        <Route path="/services/web-app" element={<Webappservice />} />
        <Route
          path="/services/ai-machine-learning"
          element={<Aimachinelearning />}
        />
        <Route path="/services/saas-product" element={<Saasproduct />} />
        <Route path="/services/ui-ux" element={<Uiuxservices />} />
        <Route
          path="/services/software-consulting-Strategy"
          element={<Softwareconsulting />}
        />
        <Route path="/portfolio" element={<Prortfolio />} />
        <Route path="/career" element={<Career/>} />
        <Route path="/faq" element={<Faq/>} />
         
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund-policy" element={<Refundpolicy />} />

        {/* Services - ms*/}
        <Route path="/services/mobile-app-development" element ={<MobileAppDevelopment/>} />
        <Route path="/technologies/android-app-development" element ={<AndoridAppDevelopment/>} />
        {/*<Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} /> */}

        {/* Services - sudesh */}
        {/* <Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} /> */}

        {/* Services - santhosh */}
         <Route path="/services/web-development" element ={<WebDev/>} />
        {/* {<Route path="" element ={} />}
        <Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} />
        <Route path="" element ={} /> */}


        <Route path="*" element={<NotFoundPage />} />
   
       
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
