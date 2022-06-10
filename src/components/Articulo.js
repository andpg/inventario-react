import { useState } from "react";
import EditorArticulo from "./EditorArticulo";

export default function Articulo(props) {
  let [verEditor, setVerEditor] = useState(false);

  const descontinuar = () => {
  }

  const vender = () => {
  }

  const pedir = () => {
  }

  return verEditor ?
    <EditorArticulo
      articulo={props.articulo}
      fetchArticulos={props.fetchArticulos}
      noverEditor={() => setVerEditor(false)}
    />
  : (
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
        <button onClick={vender}>Vender</button>
        <button onClick={() => setVerEditor(!verEditor)}>Editar</button>
        <button onClick={descontinuar}>Descontinuar</button>
        <button onClick={pedir}>Pedir más</button>
      </div>
    </article>
  );
}