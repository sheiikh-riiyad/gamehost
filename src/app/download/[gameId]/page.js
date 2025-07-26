import { db } from '@/app/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// Required for static export (output: 'export')
export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(db, 'games'));
  return querySnapshot.docs.map((doc) => ({
    gameId: doc.id,
  }));
}

export default async function GamePage({ params }) {
  const { gameId } = params;

  const gameRef = doc(db, 'games', gameId);
  const gameSnap = await getDoc(gameRef);

  if (!gameSnap.exists()) {
    return <div className="text-red-500 p-8">Game not found</div>;
  }

  const game = gameSnap.data();

  return (
    <div className="text-white p-8 min-h-screen bg-black">
      <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
      <img
        src={game.cover}
        alt={game.title}
        className="w-full max-w-md rounded mb-6 shadow-lg"
      />
      <p className="text-green-300 mb-4">{game.description || 'No description available.'}</p>
      <p className="text-green-400 mb-4">Download Link:</p>
      <a href={game.downloadUrl} target="_blank" rel="noopener noreferrer">
        <button className="neon-btn">Download Now</button>
      </a>
    </div>
  );
}
