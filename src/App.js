import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  createContext,
  useState
} from 'react';

import Login from './components/Login';
import Pedidos from './components/Pedidos';
import Inventario from './components/Inventario';
import Registro from './components/Registro';

export const SessionContext = createContext();

function App() {
  const [user, setUser] = useState();
  return (
    <BrowserRouter>
      <SessionContext.Provider value={[user, setUser]}>
        <Routes>
          <Route path='/' element={user ? <Inventario /> : <Login />} />
          <Route path='registro' element={<Registro />} />
          <Route path='ordenes' element={<Pedidos />} />
        </Routes>
      </SessionContext.Provider>
    </BrowserRouter>
  );
}

export default App;
