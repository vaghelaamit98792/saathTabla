// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import "./App.css"

function App() {
    return (
        <Router>
            <div className="App">
               
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/Login" element={<Login />} />
                        <Route path="/payment" element={<Payment />} /> */}
                    
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
