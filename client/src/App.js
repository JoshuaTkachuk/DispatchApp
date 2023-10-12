import { BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import MyTrucks from "./components/MyTrucks";
import NewTruckForm from "./components/NewTruckForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<MyTrucks/>} path="/myTrucks"/>
          <Route element={<NewTruckForm/>} path="/addTruck"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
