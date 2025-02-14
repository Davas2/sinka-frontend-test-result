'use client';

import { useState } from 'react';
import ClientTable from '@/components/ClientTable';
import ClientForm from '@/components/ClientForm';

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

export default function ClientsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | undefined>(undefined);

  const handleAddClient = () => {
    setEditingClient(undefined);
    setIsFormOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingClient(undefined);
  };

  return (
    <div className="page-wrapper">
      <div className="container shadow-xl bg-gray-800 p-8 rounded-xl border border-gray-700">
        <button className="button primary mb-4" onClick={handleAddClient}>
          Adicionar Cliente
        </button>
        <ClientTable onEditClient={handleEditClient} />
        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="card max-w-lg w-full relative z-50">
              <ClientForm client={editingClient} onSuccess={handleCloseForm} onCancel={handleCloseForm} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
