"use client";
import { useRouter } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  return (
    <>
    <div className="bg-blue-400 h-35 text-center">

      <p className="text-black"> <strong>If You Satisfied Our Site</strong></p>

      <button
        onClick={() => router.push(`/donate`)}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Donate Us| For the poor people.
      </button>

      <h4 className="font-mono">
        &copy; {currentYear} GAMEHOSTs. DOWNLOAD ALL GAMES FOR FREE
      </h4>
    <p className="text-black"> this website made by  <a className="text-black" href=""> <strong> BlueheartDev </strong></a>  </p>
    </div>
    </>
  );
};

Footer.displayName = "Footer";
export default Footer;
