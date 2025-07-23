"use client"

import { Header } from "@/components/layout/header-logged";
import { BreadcrumbComponent } from "@/components/layout/breadcrumb";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { atualizaUser } from "../api/user";
import { toast } from "sonner";

export default function ChefProfilePage() {
  const { data:session, update } = useSession();
  const [form, setForm] = useState({
    name: "",
    email: "",
    endereco: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (session?.user.id) {
      //@ts-ignore
      atualizaUser(session.user.id, form).then(async () => {
        await update();
        setLoading(false);
        toast.success("Usuário atualizado com sucesso!");
      }).catch((error) => {
        console.error("Erro ao atualizar usuário:", error);
        setLoading(false);
        toast.error("Erro ao atualizar usuário. Tente novamente mais tarde.");
      });
    }
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="text-center">
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (form.email === "" && form.name === "") {
    setForm({
      name: session.user.name || "",
      email: session.user.email || "",
      endereco: session.user.endereco || ""
    });
  }

  const defaultImage =
    "https://ui-avatars.com/api/?name=" +
    encodeURIComponent(session.user.name) +
    "&background=cccccc&color=555555&size=256";

  return (
    <>
      <Header />
      <main className="px-[100px]">
        <section className="max-w-7xl mx-auto pt-10">
          <BreadcrumbComponent
            items={
              [
                { label: "Dashboard", to: "dashboard" },
                { label: "Perfil", to: "profile" },
              ]
            }/>
          {/* Header com imagem e nome */}
          <h1>Suas informações: </h1>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 relative rounded-2xl overflow-hidden shadow-md">
              <img
                src={session.user.image || defaultImage}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Endereço
                  </label>
                  <input
                    type="text"
                    placeholder="Digite seu endereço"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={form.endereco}
                    onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                  />
                </div>
                <button
                  disabled={loading}
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Salvar
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
