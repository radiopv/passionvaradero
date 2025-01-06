import React from 'react';

const FAQPage = () => {
  const faqs = [
    {
      question: "Comment fonctionne le parrainage ?",
      answer: "Le parrainage permet d'aider directement un enfant cubain en contribuant à son éducation et son bien-être."
    },
    {
      question: "Combien coûte le parrainage ?",
      answer: "Le montant du parrainage est flexible et s'adapte à vos possibilités."
    },
    {
      question: "Comment puis-je communiquer avec mon filleul ?",
      answer: "Vous pouvez échanger des messages et des photos via notre plateforme sécurisée."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF7CD] to-[#FEC6A1]/20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-[#F97316] text-center">Questions Fréquentes</h1>
        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="p-6 rounded-lg shadow-md border-l-4 border-[#ea384c] bg-white/80 hover:bg-[#FEC6A1]/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold mb-2 text-[#F97316]">
                {faq.question}
              </h2>
              <p className="text-gray-700">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;