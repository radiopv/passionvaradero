import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDonations } from '@/lib/api';
import { DonationCard } from '@/components/DonationCard';
import { DonationFilters } from '@/components/DonationFilters';
import { useFilters } from '@/hooks/useFilters';

const DonationsPage = () => {
  const { filters } = useFilters();
  
  const { data: donations, isLoading } = useQuery({
    queryKey: ['donations', filters],
    queryFn: () => getDonations(filters),
  });

  // Trier les dons par date décroissante (plus récents en premier)
  const sortedDonations = donations?.sort((a, b) => {
    return new Date(b.donation_date).getTime() - new Date(a.donation_date).getTime();
  });

  if (isLoading) {
    return <div className="flex justify-center p-8">Chargement des dons...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <DonationFilters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {sortedDonations?.map((donation) => (
          <DonationCard key={donation.id} donation={donation} />
        ))}
      </div>
    </div>
  );
};

export default DonationsPage;