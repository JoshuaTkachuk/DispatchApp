import { BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import MyTrucks from "./components/MyTrucks";
import NewTruckForm from "./components/NewTruckForm";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path="/home"/>
          <Route element={<MyTrucks/>} path="/myTrucks"/>
          <Route element={<NewTruckForm/>} path="/addTruck"/>
          <Route element={<Register/>}  dafault path = "/"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
