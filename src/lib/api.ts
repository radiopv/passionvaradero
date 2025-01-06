export interface Donation {
  id: string;
  amount: number;
  donor_name: string;
  donation_date: string;
  message?: string;
}

export const getDonations = async (filters: any): Promise<Donation[]> => {
  // Simulated data for now
  return [
    {
      id: '1',
      amount: 100,
      donor_name: 'Jean Dupont',
      donation_date: '2024-02-20',
      message: 'Pour soutenir les enfants'
    },
    {
      id: '2',
      amount: 50,
      donor_name: 'Marie Martin',
      donation_date: '2024-02-19',
      message: 'Bon courage à tous'
    }
  ];
};