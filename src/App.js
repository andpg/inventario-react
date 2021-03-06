import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  useState
} from 'react';

import Login from './components/Login';
import Pedidos from './components/Pedidos';
import Inventario from './components/Inventario';
import Registro from './components/Registro';

function App() {
  const [usuario, setUsuario] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={usuario ? <Inventario /> : <Login setUsuario={setUsuario} />} />
        <Route path="registro" element={<Registro setUsuario={setUsuario} />} />
        <Route path="pedidos" element={usuario ? <Pedidos /> : <Login setUsuario={setUsuario} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
