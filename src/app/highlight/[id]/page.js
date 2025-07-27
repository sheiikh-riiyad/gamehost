import Navbar from '@/app/components/Navbar';
import { db } from '@/app/lib/firebase';
import Footer from '@/app/pages/footer';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';


export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(db, 'highlight'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
  }));
}

export default async function HighlightPage({ params }) {
  const { id } = params;

  const gameRef = doc(db, 'highlight', id); // 👈 Correct collection
  const gameSnap = await getDoc(gameRef);

  if (!gameSnap.exists()) {
    return <div className="text-red-500 p-8">Highlighted Game not found</div>;
  }

  const game = gameSnap.data();

  return (
    <>
    <Navbar/>
    <div className="text-white p-8 min-h-screen bg-black">
      <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
      <img
        src={game.cover}
        alt={game.title}
        className="w-full max-w-md rounded mb-6 shadow-lg"
      />
      <p className="text-green-300 mb-4">{game.description || 'No description available.'}</p>
      <p className="text-green-400 mb-4">Download Link:</p>
      <a href={game.downloadURL} target="_blank" rel="noopener noreferrer">
        <button className="neon-btn">Download Now</button>
      </a>
    </div>
    <Footer/>
    </>
  );
}
