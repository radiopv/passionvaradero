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
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const handleCardClick = (route: string) => {
    try {
      console.log("Navigating to:", route); // Pour le débogage
      navigate(route);
    } catch (error) {
      console.error("Navigation error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de navigation",
        description: "Impossible d'accéder à cette page. Veuillez réessayer.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord Parrain</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card 
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer" 
          onClick={() => handleCardClick("/sponsor-dashboard/profile")}
        >
          <h2 className="text-xl font-semibold mb-4">Mon Profil</h2>
          <p className="text-gray-600 mb-4">Gérez vos informations personnelles</p>
          <Button className="w-full">
            Voir mon profil
          </Button>
        </Card>

        <Card 
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer" 
          onClick={() => handleCardClick("/sponsor-dashboard/children")}
        >
          <h2 className="text-xl font-semibold mb-4">Mes Filleuls</h2>
          <p className="text-gray-600 mb-4">
            {childrenData?.length 
              ? `Vous parrainez ${childrenData.length} enfant(s)`
              : "Vous ne parrainez pas encore d'enfant"}
          </p>
          <Button className="w-full">
            Voir mes filleuls
          </Button>
        </Card>

        <Card 
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer" 
          onClick={() => handleCardClick("/sponsor-dashboard/messages")}
        >
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <p className="text-gray-600 mb-4">Consultez vos messages</p>
          <Button className="w-full">
            Voir mes messages
          </Button>
        </Card>

        <Card 
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer" 
          onClick={() => handleCardClick("/sponsor-dashboard/testimonials")}
        >
          <h2 className="text-xl font-semibold mb-4">Témoignages</h2>
          <p className="text-gray-600 mb-4">Partagez votre expérience</p>
          <Button className="w-full">
            Voir mes témoignages
          </Button>
        </Card>

        <Card 
          className="p-6 hover:shadow-lg transition-shadow cursor-pointer" 
          onClick={() => handleCardClick("/sponsor-dashboard/album")}
        >
          <h2 className="text-xl font-semibold mb-4">Album Photos</h2>
          <p className="text-gray-600 mb-4">Consultez les photos de vos filleuls</p>
          <Button className="w-full">
            Voir l'album
          </Button>
        </Card>
      </div>
    </div>
  );
}