import React from 'react';

export const DonationFilters = () => {
  return (
    <div className="bg-white/80 p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-[#F97316] mb-4">Filtres</h2>
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Rechercher un donateur"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F97316]"
        />
      </div>
    </div>
  );
};