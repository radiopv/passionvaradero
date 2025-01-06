import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FAQPage from './routes/faq';
import DonationsPage from './routes/donations';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-[#FEF7CD] to-[#FEC6A1]/20">
          <main>
            <Routes>
              <Route path="/" element={<DonationsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/donations" element={<DonationsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;