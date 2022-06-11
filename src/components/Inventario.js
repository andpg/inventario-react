import {
  useState,
  useEffect
} from 'react';
import { Link } from 'react-router-dom';
import Articulo from './Articulo';
import EditorArticulo from './EditorArticulo';
import '../styles/Tabla.css';

function Inventario() {
  let [articulos, setArticulos] = useState([]);
  let [filtro, setFiltro] = useState('');
  let [verAgregar, setVerAgregar] = useState('');

  const fetchArticulos = () => {
    fetch('https://inventario-react-api.herokuapp.com/articulos')
    .then((res) => res.json())
    .then((data) => setArticulos(data));
  }

  useEffect(fetchArticulos, []);

  return (
    <div>
      <header>
        <h2>Inventario</h2>
        <Link to='/pedidos'>Ver pedidos</Link>
        <nav>
          <button onClick={fetchArticulos}>Refrescar</button>
          {articulos.length ? (
            <select onChange={(e) => setFiltro(e.target.value)}>
              <option value=''>Filtrar categorías</option>
              {[...new Set(
                articulos.map((articulo) => articulo['categoría'])
              )].map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          ) : ''}
          <button onClick={() => setVerAgregar(!verAgregar)}>
            {verAgregar ? 'Cerrar' : 'Agregar nuevo artículo'}
          </button>
        </nav>
      </header>
      <section className='Tabla'>
        <article className='Titulos'>
          <div>Nombre</div>
          <div>Categoría</div>
          <div>Cantidad</div>
        </article>
          {verAgregar ?
            <EditorArticulo
              fetchArticulos={fetchArticulos}
              noVerEditor={() => setVerAgregar(false)}
            />
          : ""}
          {articulos.length ?
            (filtro.length
              ? articulos.filter((articulo) => articulo['categoría'] === filtro)
              : articulos
            ).map((articulo) => <Articulo
              articulo={articulo}
              fetchArticulos={fetchArticulos}
              key={articulo['_id']}
            />)
          : ""}
        </section>
    </div>
  );
}

export default Inventario;