'use client';

import { useState } from 'react';
import ClientModal from './ClientModal';
import Link from 'next/link';
import { Eye, Pencil, X } from 'lucide-react';

interface Client {
  id: string;
  avatar: string;
  username: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

interface ClientRowProps {
  client: Client;
  onEditClient: (client: Client) => void;
}

export default function ClientRow({ client, onEditClient }: ClientRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <tr className="border-b border-gray-700 bg-gray-800 text-center transition">
      <td className="py-3 px-6">
        <img src={client.avatar || '/images/default-avatar.png'} alt={client.username} className="w-12 h-12 rounded-full mx-auto shadow-md" />
      </td>
      <td className="py-3 px-6 text-gray-300">{client.username}</td>
      <td className="py-3 px-6 text-gray-300">{client.email}</td>
      <td className="py-3 px-6">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            client.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {client.active ? 'Ativo' : 'Inativo'}
        </span>
      </td>
      <td className="py-3 px-6 text-gray-400">{new Date(client.createdAt).toLocaleDateString()}</td>
      <td className="py-3 px-6 flex justify-center gap-4">
        <Link href={`/clients/${client.id}`}>
          <button className="p-2 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 transition">
            <Eye size={16} />
          </button>
        </Link>
        <button
          className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
          onClick={() => onEditClient(client)}
        >
          <Pencil size={16} />
        </button>
        <button
          className="p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <X size={16} />
        </button>
      </td>
      {isModalOpen && <ClientModal client={client} onClose={() => setIsModalOpen(false)} />}
    </tr>
  );
}
