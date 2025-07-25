import { db } from '@/app/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';

export async function generateMetadata({ params }) {
  return {
    title: `Download Game`,
  };
}

export default async function GameDetailPage({ params }) {
  const { gameId } = params;

  const docRef = doc(db, 'games', gameId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="text-center text-white p-10">
        <h2>Game not found</h2>
      </div>
    );
  }

  const game = docSnap.data();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl mb-4">{game.title}</h1>
      <img src={game.cover} alt={game.title} className="w-[300px] mb-4 rounded" />
      <p className="mb-4">{game.description}</p>
      <a
        href={game.downloadUrl || '#'}
        className="bg-blue-600 px-6 py-3 rounded inline-block"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Now
      </a>
    </div>
  );
}
