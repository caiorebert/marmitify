"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function Header() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {}, [session]);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="text-center">
          <p className="text-lg text-zinc-700">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <header className="w-full h-[100px] bg-orange-500 flex items-center justify-between px-[100px] relative">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="https://i.ibb.co/PvX1H76B/Vector-1.png"
            alt="Marmitify Logo"
            width={160}
            height={60}
            className="object-contain w-[160px] h-[60px] cursor-pointer"
          />
        </Link>
      </div>

      {/* Botão do usuário */}
      <div className="flex gap-4 items-center relative">
        <button
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          <User className="text-orange-500 w-5 h-5" />
        </button>

        {open && (
          <div className="absolute right-0 top-12 bg-white shadow-md rounded-md w-40 z-50">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
              onClick={() => setOpen(false)}
            >
              Meu Perfil
            </Link>
            {
              //@ts-ignore
              session?.user?.isChef ?
                <Link
                  href="/chef"
                  className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                  onClick={() => setOpen(false)}
                >
                  Dashboard do Chef
                </Link>
                :
                <Link
                  href="/chef/register"
                  className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                  onClick={() => setOpen(false)}
                >
                  Torne-se um Chef
                </Link>
            }
            <Link
              href=""
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
              onClick={() => signOut()}
            >
              Sair
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
