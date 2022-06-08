import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext } from '../App';

function Login() {
  const [, setUser] = useContext(SessionContext);

  const handleSubmit = (event) => {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      body: new FormData(event.target)
    })
    .then((res) => res.json())
    .then((data) => {
      if (data['_id']) {
        setUser(data);
      }
    });
    event.preventDefault();
  };

  return (
    <div className='Form'>
      <h2>Ingreso de usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='Correo electrónico' />
        <input type='password' name='password' placeholder='Contraseña' />
        <input type='submit' value='Entrar'/>
      </form>
      <Link to='/registro'>¿Es un nuevo empleado?</Link>
    </div>
  );
}

export default Login;