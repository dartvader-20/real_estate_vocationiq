import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Questionaire1 from "./components/Questionaire/Questionaire1";
import Questionaire2 from "./components/Questionaire/Questionaire2";
import Questionaire3 from "./components/Questionaire/Questionaire3";
import HomePage from "./components/HomePage/HomePage";
import DashboardComponent from "./components/Navbar/DashboardComponent";
import UserDetails from "./components/UserDetails/UserDetails";
import PrivacyPolicy from "./components/HomePage/PrivacyPolicy";
import TermsOfService from "./components/HomePage/TermsOfService";
import LandingPage from "./components/HomePage/LandingPage";
import Questionaire4 from "./components/Questionaire/Questionaire4";
import Computation from "./components/FinalOutput/Computation";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path='/dashboard' element={<DashboardComponent />} />
          <Route path="/questionaire1" element={<Questionaire1 />} />
          <Route path="/questionaire2" element={<Questionaire2 />} />
          <Route path="/questionaire3" element={<Questionaire3 />} />
          <Route path="/questionaire4" element={<Questionaire4 />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsofservice" element={<TermsOfService />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/computation" element={<Computation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
