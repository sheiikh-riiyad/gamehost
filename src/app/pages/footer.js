"use client";
import { useRouter } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  return (
    <div className="bg-blue-400 h-30 text-center">
      <button
        onClick={() => router.push(`/donate`)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Donate Us For the poor people.
      </button>

      <h4 className="font-mono">
        &copy; {currentYear} GAMEHOSTs. DOWNLOAD ALL GAMES FOR FREE
      </h4>
    </div>
  );
};

Footer.displayName = "Footer";
export default Footer;
