import React from 'react';
import type { Donation } from '@/lib/api';

interface DonationCardProps {
  donation: Donation;
}

export const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-[#F97316] mb-2">
        {donation.donor_name}
      </h3>
      <p className="text-gray-600 mb-2">
        Montant: {donation.amount}€
      </p>
      <p className="text-sm text-gray-500">
        Date: {new Date(donation.donation_date).toLocaleDateString()}
      </p>
      {donation.message && (
        <p className="mt-2 text-gray-700 italic">
          "{donation.message}"
        </p>
      )}
    </div>
  );
};