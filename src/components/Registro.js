import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../App';

function Registro() {
  const [, setUser] = useContext(SessionContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    if (event.target["password"] === event.target["confirmPassword"]) {
      fetch("http://localhost:5000/register", {
        method: "POST",
        body: new FormData(event.target),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data["_id"]) {
            setUser(data);
            navigate('/');
          }
        });
      event.preventDefault();
    }
  };

  return (
    <div className='Form'>
      <h2>Registro de usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre" />
        <input type="email" name="email" placeholder="Correo electrónico" />
        <input type="password" name="password" placeholder="Contraseña" />
        <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" />
        <input type='submit' value='Registro'/>
      </form>
    </div>
  );
}

export default Registro;