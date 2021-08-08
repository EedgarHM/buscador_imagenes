import React, {useState,useEffect} from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

function App() {
  // state de la app
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual,setPaginaActual] = useState(1);
  const [totalpaginas, setTotalPaginas] = useState(1);

  useEffect(()=>{
    const getApi = async () => {

      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = "22457893-f58ad0637dc7ea15a5712dd20";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
     
      const response = await fetch(url);
      const result = await response.json();
      setImagenes(result.hits)

      // Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(result.totalHits/imagenesPorPagina);
      setTotalPaginas(calcularTotalPaginas);

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'});

    }
    
    getApi();
  },[busqueda,paginaactual]);


  // Definicion de paginas
  const paginaAnterior = () => {
    const nuevaPagActual = paginaactual-1;
    if(nuevaPagActual===0) return;
    setPaginaActual(nuevaPagActual);
  }

  const paginaSiguiente = () => {
    const nuevaPagActual = paginaactual+1;
    if(nuevaPagActual>totalpaginas) return;
    setPaginaActual(nuevaPagActual);
  }
  return (
   <div className="container">
     <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario setBusqueda ={setBusqueda}/>
     </div>

     <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes}/>
        
        {(paginaactual===1) ? null : (<button 
          type="button" 
          className="bbtn  mr-2"
          onClick={paginaAnterior}
          >&laquo;Anterior
        </button>)}
        {(paginaactual===totalpaginas ? null : ( <button
          type="button" 
          className="bbtn"
          onClick={paginaSiguiente}
        >
          Siguiente &raquo;
        </button>))}
     </div>
   </div>
  );
}

export default App;
