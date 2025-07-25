import { db } from '@/app/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(db, 'games'));
  const paths = querySnapshot.docs.map((doc) => ({
    gameId: doc.id,
  }));
  return paths;
}

export default async function GamePage({ params }) {
  const { gameId } = params;

  const gameRef = doc(db, 'games', gameId);
  const gameSnap = await getDoc(gameRef);

  if (!gameSnap.exists()) {
    return <div>Game not found</div>;
  }

  const game = gameSnap.data();

  return (
    <div className="text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-black">{game.title}</h1>
      <img src={game.cover} alt={game.title} className="mb-4" />
      <p>{game.description}</p>
      <a href={game.downloadUrl} target="_blank">
        <button className="neon-btn">Download Now</button>
      </a>
    </div>
  );
}
