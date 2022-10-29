import './App.css';
import AllCoins from './components/AllCoins';
import CoinForm from './components/CoinForm';
import UpdateCoin from './components/UpdateCoin';
import CoinDetails from './components/CoinDetails';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AllCoins />} />
        <Route path="/coin/new" element={<CoinForm />} />
        <Route path="/coin/update/:id" element={<UpdateCoin />} />
        <Route path = "/coin/details/:id" element= {<CoinDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
