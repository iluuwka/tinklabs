import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
import MovieList from './MovieList/MovieList';
import MovieDetails from './MovieDetails/MovieDetails';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieForm from './AddOrEdit/MovieForm';

function App() {
  return (
    <>
      <Header />
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <MovieList />
        <Routes>
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
          <Route path='/movie/:imdbID/edit' element={<MovieForm/>} />
          <Route path='/addMovie' element={<MovieForm/>} />
          <Route path="/*" element={<></>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
