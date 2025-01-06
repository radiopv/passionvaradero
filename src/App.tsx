import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-[#FEF7CD] to-[#FEC6A1]/20">
          <main>
            {/* Routes will be added here in future updates */}
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;