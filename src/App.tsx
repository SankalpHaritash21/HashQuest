import Home from "./components/Welcome";
import { AnimatePresence } from "framer-motion";
import HashGenerator from "./components/HashAlgorithm";
import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<HashGenerator />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
