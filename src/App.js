import { Provider } from "./components/ui/provider.jsx"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pages from "./pages/Pages";

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Pages />} />
          {/*<Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/login" element={<Login />} />*/}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
