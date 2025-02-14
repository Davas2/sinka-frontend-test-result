'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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

interface ClientFormProps {
  client?: Client;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ClientForm({ client, onSuccess, onCancel }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Client>({
    defaultValues: client || { avatar: '', username: '', email: '', password: '', active: true },
  });

  useEffect(() => {
    if (client) {
      setValue('avatar', client.avatar);
      setValue('username', client.username);
      setValue('email', client.email);
      setValue('active', client.active);
    }
  }, [client, setValue]);

  const onSubmit = async (data: Client) => {
    try {
      if (client?.id) {
        await axios.patch(`http://localhost:3333/client/${client.id}`, data);
      } else {
        await axios.post('http://localhost:3333/client', data);
      }
      onSuccess();
      window.location.reload(); // Recarrega a página após a adição
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  return (
    <div className="card max-w-lg w-full">
      <h2 className="text-2xl font-semibold mb-6 text-white text-center">{client ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Avatar (URL)</label>
          <input {...register('avatar')} className="input" />
          {errors.avatar && <p className="text-red-500 text-xs mt-1">{errors.avatar.message}</p>}
        </div>
        <div>
          <label className="label">Usuário</label>
          <input {...register('username', { required: 'Usuário é obrigatório' })} className="input" />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>
        <div>
          <label className="label">E-mail</label>
          <input type="email" {...register('email', { required: 'E-mail é obrigatório' })} className="input" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label">Senha</label>
          <input type="password" {...register('password', { required: 'Senha é obrigatória' })} className="input" />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <label className="label">Status</label>
          <select {...register('active')} className="input">
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>
        <div className="mt-6 flex justify-between">
          <button type="button" className="button secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="button primary">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
