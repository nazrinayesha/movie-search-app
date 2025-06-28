import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  let [popularMovies, setPopularMovies] = useState([]);
  let [movieName, setMovieName] = useState("");
  let [searchMovies, setSearchMovies] = useState([]);
  

  useEffect( () => {
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=cfe422613b250f702980a3bbf9e90716`)
    .then( (res) => {
      setSearchMovies(res.data.results)
    })
  }, [movieName]);


  useEffect( () => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716`)
    .then((res) => {
      setPopularMovies(res.data.results);
    })
  }, []);


  return (
   
    <div>
      <div className="container text-center mt-4">
          <h1 className="mb-4">🎬 Movie Search Engine</h1>
          <div className="d-flex justify-content-center mb-4">
            <input value = {movieName}
            className="form-control w-50 me-2" placeholder='search movie here' 
            onChange={ (e) => {
              setMovieName(e.target.value)
            }}
            />
          </div>
          {movieName !== "" && searchMovies.length === 0 ? <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740" /> : ""}
      </div>


      <div className="row row-cols-1 row-cols-md-4 g-4 m-4">
        { searchMovies.length === 0 && movieName === "" ? popularMovies.map( (item,i) => {
          return <div className="col">
    <div className="card h-100">
      <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} className="card-img-top thumbnail" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.overview.slice(60)}</p>
        <p>Release Date: {item.release_date}</p>
      </div>
    </div>
  </div>
        }) : searchMovies.map( (item,i) => {
          return <div className="col">
    <div className="card">
      <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} className="card-img-top thumbnail" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.overview ? item.overview.slice(0, 80) + "..." : "No description available"}</p>
        <p>Release Date: {item.release_date}</p>
      </div>
    </div>
  </div>
        })}
        
      </div>
    </div>
  );
}

export default App;
