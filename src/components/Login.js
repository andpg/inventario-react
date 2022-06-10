import { Link } from 'react-router-dom';

function Login(props) {
  const handleSubmit = (event) => {
    fetch('https://inventario-react-api.herokuapp.com/login', {
      method: 'POST',
      body: new FormData(event.target)
    })
    .then((res) => res.json())
    .then((data) => {
      if (data['_id']) {
        props.setUsuario(data);
      } else {
        alert(data['error'])
      }
    });
    event.preventDefault();
  };

  return (
    <div className='Form'>
      <h2>Ingreso de usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='Correo electrónico' />
        <input type='password' name='contraseña' placeholder='Contraseña' />
        <input type='submit' value='Entrar'/>
      </form>
      <Link to='/registro'>¿Es un nuevo empleado?</Link>
    </div>
  );
}

export default Login;