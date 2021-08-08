import React from 'react';
import Imagen from './Imagen'

const ListadoImagenes = ({imagenes}) => {
    return ( 
        <div className="col-21 p-5 row">
          {imagenes.map(img => (
              <Imagen key={img.id} imagen = {img}/>
          ))}
        </div>
     );
}
 
export default ListadoImagenes;