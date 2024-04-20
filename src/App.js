import "../src/Scss/Main.scss";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from "./Components/FirstPage";
import VideoTable from "./Components/VideoTable";
import Reports from "./Components/Reports";
import EnergyState from "./context/EnergyState";


function App() {
  return (
    <div className="App">
      <div className="container">
      <EnergyState>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/Dashboard" element={<FirstPage />} />
            <Route exact path="/VideoTable" element={<VideoTable />} />
            <Route exact path="/Reports" element={<Reports />} />
          </Routes>
        </Router>
        </EnergyState>
      </div>
    </div>
  );
}

export default App;
