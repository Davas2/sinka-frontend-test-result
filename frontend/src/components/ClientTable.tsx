'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Pencil, X } from 'lucide-react';
import Image from 'next/image';
import ClientModal from '@/components/ClientModal';
import Link from 'next/link';

interface Client {
  id: string;
  avatar: string;
  username: string;
  email: string;
  password?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

interface ClientTableProps {
  onEditClient: (client: Client) => void;
}

export default function ClientTable({ onEditClient }: ClientTableProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [deleteClient, setDeleteClient] = useState<Client | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:3333/client');
      const formattedClients = response.data.map((client: any) => ({
        ...client,
        avatar: client.avatar ?? '/images/default-avatar.png',
        createdAt: client.createdAt ? new Date(client.createdAt).toISOString() : '',
        updatedAt: client.updatedAt ? new Date(client.updatedAt).toISOString() : '',
      }));
      setClients(formattedClients);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  return (
    <div className="overflow-x-auto p-6">
      <table className="table bg-gray-800 rounded-xl shadow-lg overflow-hidden text-center">
        <thead>
          <tr className="bg-green-600 text-white uppercase text-sm leading-normal text-center">
            <th className="p-3 text-center">Avatar</th>
            <th className="p-3 text-center">Usuário</th>
            <th className="p-3 text-center">E-mail</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Criado em</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-300 text-sm font-light">
          {clients.map((client) => (
            <tr key={client.id} className="border border-gray-700 bg-gray-700 transition-all">
              <td className="p-3">
                <Image
                  src={'/images/default-avatar.png'}
                  alt={client.username}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full mx-auto shadow-md object-cover hover:scale-110 transition-transform"
                />
              </td>
              <td className="p-3">{client.username}</td>
              <td className="p-3">{client.email}</td>
              <td className="p-3">
                <span className={client.active ? "text-green-400 font-semibold" : "text-red-500 font-semibold"}>
                  {client.active ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="p-3">{client.createdAt ? new Date(client.createdAt).toLocaleDateString() : 'Data inválida'}</td>
              <td className="p-3 flex items-center justify-center gap-4">
                <Link href={`/clients/${client.id}`}>
                  <button className="p-3 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 transition">
                    <Eye size={18} />
                  </button>
                </Link>
                <button
                  className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all flex items-center justify-center shadow-md hover:scale-110"
                  onClick={() => onEditClient(client)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all flex items-center justify-center shadow-md hover:scale-110"
                  onClick={() => setDeleteClient(client)}
                >
                  <X size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteClient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ClientModal client={deleteClient} onClose={() => setDeleteClient(null)} />
        </div>
      )}
    </div>
  );
}
