import { useContext } from "react";
import { Context } from "../../context/UserContext";

export const Header = () => {
  const { authenticated } = useContext(Context);

  if (!authenticated) {
    return null
  }
  return (
    <header className="flex justify-between items-center py-1 px-6 bg-zinc-700 w-screen max-h-12 border-b-1 border-zinc-600 shadow-xl">
      <a className="max-w-10 flex items-center justify-between" href="/">
        <img className="min-w-full" src="/favicon.ico" alt="Logo" />
      </a>
      <nav className="flex gap-4 text-zinc-200">
        <a className="hover:text-blue-400" href="#">
          Clientes
        </a>
        <a className="hover:text-blue-400" href="/login">
          Sair
        </a>
      </nav>
    </header>
  );
};
