"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Loader2Icon } from "lucide-react";
import { MealTabs } from "@/components/card/mealTabs";
import { ChefSection } from "@/components/chef/chef-section";
import { useSession } from "next-auth/react";
import { obterChefs } from "../api/chef";
import Link from "next/link";
import { BreadcrumbComponent } from "@/components/layout/breadcrumb";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const data = await obterChefs();
        setChefs(data);
      } catch (error) {
        console.error("Erro ao obter chefs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChefs();
  }, []);

  const [address] = useState("Rua da Baixada, 161");

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="text-center">
          <Loader2Icon />
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-7xl mx-auto pt-10">
        <BreadcrumbComponent 
            items={[
              { to: "dashboard", label: "Dashboard" }
            ]}
          />
        {/* Cabeçalho: saudação + endereço */}
        <section className="mb-10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900">
              Olá,{" "}
              <span className="font-bold">
                {session?.user?.name ? session.user.name : ""}
              </span>
            </h2>

            <div className="flex items-center gap-1 mt-1">
              {
                session?.user?.endereco ? (
                  <span className="text-zinc-700 text-base">
                    {session.user.endereco}
                  </span>
                ) : (
                  <span className="text-zinc-700 text-base">
                    Endereço não definido
                  </span>
                )
              }
              <ChevronDown className="w-4 h-4 text-orange-600 cursor-pointer" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/appointments">
              <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold border border-orange-500 w-full">
                Ver Agendamentos
              </button>
            </Link>
            <Link href="/searchChefs">
              <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold border border-orange-500 w-full">
                Ver Chefes
              </button>
            </Link>
          </div>
        </section>
        <h3 className="text-2xl mt-6 font-semibold text-zinc-900">
          Chefes especiais
        </h3>

        {/* @ts-ignore */}
        <ChefSection chefs={chefs} />
      </div>
    );
  }
}
