'use client';

import ClientsPage from '@/app/clients/page';
import '@/styles/globals.css';

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <div className="container shadow-xl bg-background p-8 rounded-xl border border-gray-700">
        <h1 className="text-white text-4xl font-bold mb-6 text-center">Gerenciamento de Clientees</h1>
        <ClientsPage />
      </div>
    </div>
  );
}
