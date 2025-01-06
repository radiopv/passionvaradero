import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function SponsorDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: sponsorData, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["sponsorProfile"],
    queryFn: async () => {
      const { data: profile, error } = await supabase
        .from("sponsors")
        .select("*")
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger votre profil. Veuillez réessayer.",
        });
        throw error;
      }

      return profile;
    },
  });

  const { data: childrenData, isLoading: isLoadingChildren } = useQuery({
    queryKey: ["sponsoredChildren"],
    queryFn: async () => {
      const { data: children, error } = await supabase
        .from("children")
        .select("*")
        .eq("sponsor_id", sponsorData?.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les informations des enfants. Veuillez réessayer.",
        });
        throw error;
      }

      return children;
    },
    enabled: !!sponsorData?.id,
  });

  const isLoading = isLoadingProfile || isLoadingChildren;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FEF7CD] to-[#FEC6A1]/20">
        <Loader2 className="w-8 h-8 animate-spin text-[#F97316]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF7CD] to-[#FEC6A1]/20">
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold mb-6 text-[#F97316]">Tableau de bord Parrain</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Mon Profil",
              description: "Gérez vos informations personnelles",
              route: "/sponsor-dashboard/profile"
            },
            {
              title: "Mes Filleuls",
              description: childrenData?.length 
                ? `Vous parrainez ${childrenData.length} enfant(s)`
                : "Vous ne parrainez pas encore d'enfant",
              route: "/sponsor-dashboard/children"
            },
            {
              title: "Messages",
              description: "Consultez vos messages",
              route: "/sponsor-dashboard/messages"
            },
            {
              title: "Témoignages",
              description: "Partagez votre expérience",
              route: "/sponsor-dashboard/testimonials"
            },
            {
              title: "Album Photos",
              description: "Consultez les photos de vos filleuls",
              route: "/sponsor-dashboard/album"
            }
          ].map((item, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white/80 border-l-4 border-[#ea384c] cursor-pointer" 
              onClick={() => navigate(item.route)}
            >
              <h2 className="text-xl font-semibold mb-4 text-[#F97316]">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <Button className="w-full bg-[#F97316] hover:bg-[#ea384c] transition-colors">
                Voir plus
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
