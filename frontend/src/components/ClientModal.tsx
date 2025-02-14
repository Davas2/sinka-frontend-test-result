'use client';

interface Client {
  id?: string;
  avatar: string;
  username: string;
  email: string;
  password?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

interface ClientModalProps {
  client: Client;
  onClose: () => void;
}

export default function ClientModal({ client, onClose }: ClientModalProps) {
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3333/client/${client.id}`, {
        method: 'DELETE',
      });
      onClose();
      window.location.reload(); // Recarrega a lista de clientes
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="card max-w-sm w-full relative z-50">
        <h2 className="text-xl font-semibold text-primary text-center mb-4">Confirmar Exclusão</h2>
        <div className="flex flex-col items-center gap-4 mb-4">
          <img src={client.avatar || '/images/default-avatar.png'} alt={client.username} className="w-16 h-16 rounded-full shadow-md" />
          <p className="text-center text-gray-300">Tem certeza que deseja excluir o cliente <strong>{client.username}</strong>?</p>
        </div>
        <div className="mt-4 flex justify-between">
          <button className="button secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="button primary bg-red-600 hover:bg-red-700" onClick={handleDelete}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
