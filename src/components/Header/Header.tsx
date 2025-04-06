import { useContext } from "react";
import { Context } from "../../context/UserContext";
import { Link } from "react-router-dom";

export const Header = () => {
  const { authenticated, logout } = useContext(Context);

  if (!authenticated) {
    return null
  }
  return (
    <header className="flex justify-between items-center py-1 px-6 bg-zinc-700 w-screen max-h-12 border-b-1 border-zinc-600 shadow-xl">
      <Link className="max-w-10 flex items-center justify-between" to="/">
        <img className="min-w-full" src="/favicon.ico" alt="Logo" />
      </Link>
      <nav className="flex gap-4 text-zinc-200">
        <Link className="hover:text-blue-400" to="#">
          Clientes
        </Link>
        <Link className="hover:text-blue-400" to="#" onClick={logout}>
          Sair
        </Link>
      </nav>
    </header>
  );
};
