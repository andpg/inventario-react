export default function EditorArticulo(props) {
  const handleSubmit = (event) => {
    fetch(props.articulo ? 
        `https://inventario-react-api.herokuapp.com/articulos/${props.articulo['_id']}`
      :
        'https://inventario-react-api.herokuapp.com/articulos'
      , {
      method: 'POST',
      body: new FormData(event.target)
    })
    .then(() => props.fetchArticulos());
    props.noVerEditor();
    event.preventDefault();
  }

  return (
    <article>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name='nombre'
            defaultValue={props.articulo ? props.articulo['nombre'] : ''}
            placeholder='Nombre'
          />
        </div>
        <div>
          <input
            name='categoría'
            defaultValue={props.articulo ? props.articulo['categoría'] : ''}
            placeholder='Categoría'
          />
        </div>
        <div>
          {props.articulo ? props.articulo['cantidad'] : 0}
        </div>
        <div>
          <input type='submit' value='Enviar' />
          <input type='button' value='Cancelar' onClick={props.noVerEditor} />
        </div>
      </form>
    </article>
  );
}