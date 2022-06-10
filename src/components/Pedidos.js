import {
  useState,
  useEffect
} from 'react';

function Pedidos() {
  let [articulos, setArticulos] = useState([]);
  let [pedidos, setPedidos] = useState([]);
  let [filtro, setFiltro] = useState('');

  const fetchPedidos = () => {
    fetch('http://localhost:5000/pedidos')
    .then((res) => res.json())
    .then((data) => {
      setPedidos(data);
      pedidos.forEach((pedido) => {
        fetch(`http://localhost:5000/articulos/${pedido['id_articulo']}`)
        .then((res) => res.json())
        .then((data) => setArticulos([...articulos, data]));
      });
    });
  }

  useEffect(fetchPedidos, []);

  return (
    <div>
      <header>
        <h2>Inventario</h2>
        <nav>
          <button onClick={fetchPedidos}>Recargar</button>
          {articulos.length ? (
            <select onChange={(e) => setFiltro(e.target.value)}>
              <option value='' />
              {[...new Set(
                articulos.map((articulo) => articulo['categoría'])
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
              ? pedidos.filter((_, index) => articulos[index]['categoría'] === filtro)
              : pedidos
            ).map((pedido, index) => (
              <article>
                <div>{articulos[index]["nombre"]}</div>
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