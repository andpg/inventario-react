import { useState } from "react";
import EditorArticulo from "./EditorArticulo";

export default function Articulo(props) {
  let [verEditor, setVerEditor] = useState(false);
  let [verPedir, setVerPedir] = useState(false);
  let [verVender, setVerVender] = useState(false);

  const descontinuar = () => {
    if (window.confirm('¿Seguro que necesita descontinuar este producto?')) {
      fetch(`https://inventario-react-api.herokuapp.com/articulos/${props.articulo["_id"]}`, {
        method: 'DELETE'
      })
      .then(() => props.fetchArticulos());
    }
  }

  const vender = (event) => {
    fetch(`https://inventario-react-api.herokuapp.com/articulos/${props.articulo['_id']}/vender`, {
      method: 'POST',
      body: new FormData(event.target)
    })
    .then((res) => res.json())
    .then((data) => {
      if (data['_id']) {
        props.fetchArticulos();
        setVerVender(false);
      } else {
        alert(data['error']);
      }
    });
    event.preventDefault();
  }

  const pedir = (event) => {
    fetch("https://inventario-react-api.herokuapp.com/pedidos", {
      method: 'POST',
      body: new FormData(event.target)
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data['_id']) {
        props.fetchArticulos();
        setVerPedir(false);
      } else {
        alert(data['error']);
      }
    });
    setVerVender(false);
    event.preventDefault();
  }

  return verEditor ?
    <EditorArticulo
      articulo={props.articulo}
      fetchArticulos={props.fetchArticulos}
      noVerEditor={() => setVerEditor(false)}
    />
  : (
    <div>
    <article>
      <div>
        {props.articulo["nombre"]}
      </div>
      <div>
        {props.articulo["categoría"]}
      </div>
      <div>
        {props.articulo["cantidad"]}
      </div>
      <div>
        <button disabled={verVender || verPedir} onClick={() => setVerVender(true)}>Vender</button>
        <button disabled={verVender || verPedir} onClick={() => setVerPedir(true)}>Pedir más</button>
        <button disabled={verVender || verPedir} onClick={() => setVerEditor(true)}>Editar</button>
        <button disabled={verVender || verPedir} onClick={descontinuar}>Descontinuar</button>
      </div>
    </article>
    {verPedir ? (
      <article>
        <form onSubmit={pedir}>
          <div>
            <input hidden readOnly name='id_articulo' value={props.articulo["_id"]} />
          </div>
          <div>
            <input type='text' name='proveedor' placeholder='Proveedor' />
          </div>
          <div>
            <input type='number' name='cantidad' placeholder='Cantidad'/>
          </div>
          <div>
            <input type='submit' value='Pedir' />
            <input type='button' value='Cancelar' onClick={() => setVerPedir(false)} />
          </div>
        </form>
      </article>
    ) : ""}
    {verVender ? (
      <article>
        <form onSubmit={vender}>
          <div></div>
          <div></div>
          <div>
            <input type='number' name='cantidad' placeholder='Cantidad'/>
          </div>
          <div>
            <input type='submit' value='Vender' />
            <input type='button' value='Cancelar' onClick={() => setVerVender(false)} />
          </div>
        </form>
      </article>
    ) : ""}
    </div>
  );
}