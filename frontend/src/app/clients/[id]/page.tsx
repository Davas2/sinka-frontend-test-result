'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

interface Client {
  id: string;
  avatar: string;
  username: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ClientDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchClient();
    }
  }, [id]);

  const fetchClient = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/client/${id}`);
      setClient(response.data);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-300">Carregando...</p>;
  }

  if (!client) {
    return <p className="text-center text-red-500">Cliente não encontrado.</p>;
  }

  return (
    <div className="page-wrapper">
      <div className="container shadow-xl bg-gray-800 p-8 rounded-xl border border-gray-700">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Detalhes do Cliente</h1>
        <div className="flex flex-col items-center">
          <img
            src={client.avatar || '/images/default-avatar.png'}
            alt={client.username}
            className="w-24 h-24 rounded-full shadow-md mb-4"
          />
          <p className="text-lg"><strong>Nome:</strong> {client.username}</p>
          <p className="text-lg"><strong>E-mail:</strong> {client.email}</p>
          <p className="text-lg">
            <strong>Status:</strong> 
            <span className={client.active ? "text-green-400" : "text-red-500"}>
              {client.active ? ' Ativo' : ' Inativo'}
            </span>
          </p>
          <p className="text-lg"><strong>Criado em:</strong> {new Date(client.createdAt).toLocaleDateString()}</p>
          <p className="text-lg"><strong>Atualizado em:</strong> {new Date(client.updatedAt).toLocaleDateString()}</p>
          <button
            className="button primary mt-6"
            onClick={() => router.push('/')}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
