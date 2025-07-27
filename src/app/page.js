"use client";
import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import { useRouter } from "next/navigation";
import { db } from "./lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState } from 'react';
import Footer from './pages/footer';

export default function Home() {
  const scrollRef = useRef(null);

  useEffect(() => {
  const slider = scrollRef.current;
  if (!slider) return; // 👈 prevent null reference

  let isDown = false;
  let startX;
  let scrollLeft;

  const mouseDown = (e) => {
    isDown = true;
    slider.classList.add('cursor-grabbing');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const mouseLeaveOrUp = () => {
    isDown = false;
    slider.classList.remove('cursor-grabbing');
  };

  const mouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  };

  slider.addEventListener('mousedown', mouseDown);
  slider.addEventListener('mouseleave', mouseLeaveOrUp);
  slider.addEventListener('mouseup', mouseLeaveOrUp);
  slider.addEventListener('mousemove', mouseMove);

  return () => {
    slider.removeEventListener('mousedown', mouseDown);
    slider.removeEventListener('mouseleave', mouseLeaveOrUp);
    slider.removeEventListener('mouseup', mouseLeaveOrUp);
    slider.removeEventListener('mousemove', mouseMove);
  };
}, []);




  const router = useRouter()
  const [games, setGames] = useState([]);
  

  useEffect(() => {
    const fetchGames = async () => {
      const querySnapshot = await getDocs(collection(db, "games"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(data);
    };

    fetchGames();
  }, []);

 

  


// search option

  const [searchInput, setSearchInput] = useState(""); // For the input field
  const [filteredGames, setFilteredGames] = useState([]); // For showing



  useEffect(() => {
  const fetchGames = async () => {
    const querySnapshot = await getDocs(collection(db, "games"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setGames(data);
    setFilteredGames(data); // <-- Set this too
  };

  fetchGames();
}, []);



  const handleSearchChange = (e) => {
  setSearchInput(e.target.value);
};

const handleSearchClick = () => {
  if (searchInput.trim() === "") {
    setFilteredGames(games); // Reset to all if input is empty
  } else {
    const result = games.filter((game) =>
      game.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredGames(result);
  }

  setTimeout(() => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 10);
};

  const resultsRef = useRef(null);




  const [highlightedGames, setHighlightedGames] = useState([]);


  useEffect(() => {
  const fetchHighlights = async () => {
    const querySnapshot = await getDocs(collection(db, "highlight"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setHighlightedGames(data);
  };

  fetchHighlights();
}, []);



  return (
    <>
      <div className='home h-screen bg-black text-white hide-scrollbar'>
        <Navbar />

        <div className="searchbar flex flex-col items-center gap-10 mt-10 ">
          {/* Input Field */}
          <div className="form__group field w-[50%] shadow-emerald-500 shadow-md">
            <input
              type="text"
              className="form__field  "
              placeholder="SEARCH YOUR FAVORITE"
              name="name"
              id="name"
              required
              value={searchInput}
              onChange={handleSearchChange}
            />
            <label htmlFor="name" className="form__label">
              SEARCH YOUR FAVORITE
            </label>
          </div>

          {/* Button */}
          <a className="fancy" onClick={(e) => {
    e.preventDefault(); // stop link behavior
    handleSearchClick();
  }}>
            <span className="top-key"></span>
            <span className="text">SEARCH</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </a>
        </div>

        {/* Scrollable Card Section */}
     <div className="inline-flex gap-4">
  {highlightedGames.map((game) => (
    <div
      key={game.id}
      className="game-cart w-56 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-3 shadow-md hover:scale-105 transition-transform duration-300"
    >
      <div className="cart-content flex flex-col items-center text-center">
        <div className="game-image mb-3">
          <img
            src={game.cover}
            alt={game.title}
            className="w-full h-32 object-cover rounded-lg shadow-sm"
          />
        </div>
        <h2 className="game-title text-base font-semibold text-white mb-2 line-clamp-2">
          {game.title}
        </h2>
        <button
          className="neon-btn bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow hover:shadow-md transition-all duration-200"
          onClick={() => router.push(`/highlight/${game.id}`)}
        >
          DOWNLOAD
        </button>
      </div>
    </div>
  ))}
</div>
      </div>

  <div className="homelogo">
  <div className="cart-containe" ref={resultsRef}>
    {filteredGames.map((game) => (
      <div className="game-cart" key={game.id}>
        <div className="game-image">
          <img src={game.cover} alt={game.title} />
        </div>
        <div className="game-info">
          <h2 className="game-title">{game.title}</h2>
          <button onClick={() => router.push(`/download/${game.id}`)}>DOWNLOAD</button>
        </div>
      </div>
    ))}
  </div>
</div>


        <Footer/>
    </>
  );
}
