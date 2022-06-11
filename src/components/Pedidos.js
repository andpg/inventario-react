import {
  useState,
  useEffect
} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Tabla.css';

function Pedidos() {
  let [pedidos, setPedidos] = useState([]);

  const fetchPedidos = () => {
    fetch('https://inventario-react-api.herokuapp.com/pedidos')
    .then((res) => res.json())
    .then((data) => setPedidos(data));
  }

  useEffect(fetchPedidos, []);

  return (
    <div>
      <header>
        <h2>Pedidos</h2>
        <Link to='/'>Ver inventario</Link>
        <nav>
          <button onClick={fetchPedidos}>Refrescar</button>
        </nav>
      </header>
      <section className='Tabla'>
        <article className='Titulos'>
          <div>Artículo</div>
          <div>Cantidad pedida</div>
          <div>Proveedor</div>
          <div>Estado</div>
          <div>Cantidad entregada</div>
        </article>
          {pedidos.length ?
            pedidos.map((pedido) => (
              <article key={pedido['_id']}>
                <div>{pedido["articulo"]}</div>
                <div>{pedido["cantidad"]}</div>
                <div>{pedido["proveedor"]}</div>
                <div>Entregado</div>
                <div>{pedido["entrega"]["cantidad"]}</div>
              </article>
            ))
          : ""}
      </section>
    </div>
  );
}

export default Pedidos;