import { useNavigate } from 'react-router-dom';

function Registro(props) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    if (event.target["contraseña"] === event.target["confirmaContraseña"]) {
      fetch("http://localhost:5000/register", {
        method: "POST",
        body: new FormData(event.target),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data["_id"]) {
          props.setUsuario(data);
          navigate('/');
        } else {
          alert(data['error']);
        }
      });
      event.preventDefault();
    }
  };

  return (
    <div className='Form'>
      <h2>Registro de usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" />
        <input type="email" name="email" placeholder="Correo electrónico" />
        <input type="password" name="contraseña" placeholder="Contraseña" />
        <input type="password" name="confirmaContraseña" placeholder="Confirmar contraseña" />
        <input type='submit' value='Registrar'/>
      </form>
    </div>
  );
}

export default Registro;