import {
  useState,
  useEffect
} from 'react';
import { Link } from 'react-router-dom';

function Pedidos() {
  let [pedidos, setPedidos] = useState([]);
  let [filtro, setFiltro] = useState('');

  const fetchPedidos = () => {
    fetch('https://inventario-react-api.herokuapp.com/pedidos')
    .then((res) => res.json())
    .then((data) => {
      setPedidos(data);
      data.forEach((pedido, index) => {
        fetch(`https://inventario-react-api.herokuapp.com/articulos/${pedido['id_articulo']}`)
        .then((res) => res.json())
        .then((data) => setPedidos());
      });
    });
  }

  useEffect(fetchPedidos, []);

  return (
    <div>
      <header>
        <h2>Inventario</h2>
        <Link to='/pedidos'>Ver pedidos</Link>
        <nav>
          <button onClick={fetchPedidos}>Refrescar</button>
          {pedidos.length ? (
            <select onChange={(e) => setFiltro(e.target.value)}>
              <option value='' />
              {[...new Set(
                pedidos.map((pedido) => pedido['artículo'] ? pedido['artículo']['categoría'] : '')
              )].map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          ) : ''}
        </nav>
      </header>
      <section>
        <article>
          <div>Artículo</div>
          <div>Cantidad pedida</div>
          <div>Proveedor</div>
          <div>Estado</div>
          <div>Cantidad entregada</div>
        </article>
          {pedidos.length ?
            (filtro.length
              ? pedidos.filter((pedido) => pedido['artículo']['categoría'] === filtro)
              : pedidos
            ).map((pedido) => (
              <article key={pedido['_id']}>
                <div>{pedido['artículo'] ? pedido['artículo']["nombre"] : '...'}</div>
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