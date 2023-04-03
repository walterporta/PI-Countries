// import React, { useState } from "react";
// import style from "./styles/Paginado.module.css";

// export const Paginado = ({ countriesPage, allcountries, paginado,  }) => {
//   const [currentPage, setCurrentPage] = useState(1); 
//   const pageNumber = []; // numero de paginas

//   for (let i = 1; i <= Math.ceil(allcountries / countriesPage); i++) {
//     pageNumber.push(i);
//   }

  
//   return (
//     <nav>
//       <ul className={style.paginado}>
//         {pageNumber.length ? (
//           pageNumber.map((number) => (
//             <li
//               className={`${style.otro} ${
//                 currentPage === number ? style.active : ""
//               }`} 
//               key={number}
//             >
//               <a
//                 onClick={() => {
//                   paginado(number);
//                   setCurrentPage(number);
//                 }}
//               >
//                 {number}
//               </a>
//             </li>
//           ))
//         ) : (
//           <h1>error</h1>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Paginado;

import React, { useState, useEffect } from "react";
import style from "./styles/Paginado.module.css";

export const Paginado = ({ countriesPage, allcountries, paginado }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumber = []; // numero de paginas

  useEffect(() => {
    setCurrentPage(1);
  }, [allcountries]); // Actualizar la página actual al cargar una nueva lista de países

  for (let i = 1; i <= Math.ceil(allcountries / countriesPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className={style.paginado}>
        {pageNumber.length ? (
          pageNumber.map((number) => (
            <li
              // className={`${style.otro} ${
              //   currentPage === number ? style.active : ""
              // }`}
              className={`${style.otro} ${
                currentPage === number ? style.active : currentPage === 1 && number === 1 ? style.active : ""
              }`}

              key={number}
            >
              <a
                onClick={() => {
                  paginado(number);
                  setCurrentPage(number);
                }}
              >
                {number}
              </a>
            </li>
          ))
        ) : (
          <h1>error</h1>
        )}
      </ul>
    </nav>
  );
};

export default Paginado;
