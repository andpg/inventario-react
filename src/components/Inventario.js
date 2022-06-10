import {
  useState,
  useEffect
} from 'react';
import Articulo from './Articulo';
import EditorArticulo from './EditorArticulo';

function Inventario() {
  let [articulos, setArticulos] = useState([]);
  let [filtro, setFiltro] = useState('');
  let [verAgregar, setVerAgregar] = useState('');

  const fetchArticulos = () => {
    fetch('http://localhost:5000/articles')
    .then((res) => res.json())
    .then((data) => setArticulos(data));
  }

  useEffect(fetchArticulos, []);

  return (
    <div>
      <header>
        <h2>Inventario</h2>
        <nav>
          <button onClick={fetchArticulos}>Recargar</button>
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
      <section>
        <article>
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