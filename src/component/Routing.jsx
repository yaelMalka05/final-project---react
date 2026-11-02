import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import MyTable from "./MyTable";
import DayDetails from "./DayDetails";
import AddMedication from "./AddMedication";
import UpdateMedication from "./UpdateMedication";

export const Routing = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="app-nav">
          <div className="brand">MyMeds</div>
          <div className="links">
            <Link to="/"><button className="btn ghost">home</button></Link>
            <Link to="/table"><button className="btn secondary">table</button></Link>
            <Link to="/add"><button className="btn">add medication</button></Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table" element={<MyTable />} />
          <Route path="/day/:dayId" element={<DayDetails />} />
          <Route path="/add" element={<AddMedication />} />
          <Route path="/update/:dayId/:medId" element={<UpdateMedication />} />
        </Routes>
      </div>
    </Router>
  );
};