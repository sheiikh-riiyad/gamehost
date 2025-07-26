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
      const walk = (x - startX) * 2; // scroll speed
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
            />
            <label htmlFor="name" className="form__label">
              SEARCH YOUR FAVORITE
            </label>
          </div>

          {/* Button */}
          <a className="fancy" href="#">
            <span className="top-key"></span>
            <span className="text">SEARCH</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </a>
        </div>

        {/* Scrollable Card Section */}
        <div className="overflow-x-auto whitespace-nowrap px-6 py-10 cursor-grab select-none hide-scrollbar"  ref={scrollRef}>
          <div className="inline-flex gap-4">
            {Array(10).fill(0).map((_, index) => (
              <div key={index} className="cart-card">
                <div className="cart-content">
                  <h2>GHOST RECON</h2>
                  <p>FUTURE SOLDEIR</p>
                  <button className="neon-btn">DOWNLOAD</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

  <div className="homelogo">
  <div className="cart-containe">
    {games.map((game) => (
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
