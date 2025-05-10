"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon, RocketIcon, CreditCardIcon } from "lucide-react";

export function PlanSelector() {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">("free");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleSelectPlan = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      if (selectedPlan === "free") {
        // Logique pour sélectionner le plan gratuit
        console.log("Selected free plan");
        // Redirection vers le dashboard
        window.location.href = "/generate";
      } else {
        // Logique pour sélectionner le plan premium (redirection vers Stripe)
        console.log("Selected premium plan");
        // Simuler un délai pour la démo
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Redirection vers Stripe Checkout (à implémenter)
        // window.location.href = "/api/create-checkout-session";
        
        // Pour la démo, on redirige directement vers le dashboard
        window.location.href = "/generate";
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Choisissez votre plan Bambi AI</h1>
      
      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm text-center">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Plan Gratuit */}
        <Card 
          className={`p-6 border-2 transition-all ${
            selectedPlan === "free" 
              ? "border-bambi-accent shadow-[0_0_15px_rgba(123,92,250,0.3)]" 
              : "border-bambi-border hover:border-bambi-accent/50"
          }`}
          onClick={() => setSelectedPlan("free")}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold">Plan Découverte</h2>
              <p className="text-2xl font-bold mt-2">Gratuit</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              selectedPlan === "free" 
                ? "bg-bambi-accent" 
                : "border border-bambi-border"
            }`}>
              {selectedPlan === "free" && <CheckIcon className="h-4 w-4 text-white" />}
            </div>
          </div>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>50 générations d'images / mois</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>1 configuration de clé API</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Accès aux fonctionnalités de base</span>
            </li>
          </ul>
        </Card>
        
        {/* Plan Premium */}
        <Card 
          className={`p-6 border-2 transition-all ${
            selectedPlan === "premium" 
              ? "border-bambi-accent shadow-[0_0_15px_rgba(123,92,250,0.3)]" 
              : "border-bambi-border hover:border-bambi-accent/50"
          }`}
          onClick={() => setSelectedPlan("premium")}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold">Plan Créateur</h2>
              <p className="text-2xl font-bold mt-2">5€ / mois</p>
            </div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              selectedPlan === "premium" 
                ? "bg-bambi-accent" 
                : "border border-bambi-border"
            }`}>
              {selectedPlan === "premium" && <CheckIcon className="h-4 w-4 text-white" />}
            </div>
          </div>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Générations d'images illimitées</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Configurations de clés API illimitées</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Accès à tous les modèles et fonctionnalités avancées</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Support prioritaire</span>
            </li>
          </ul>
        </Card>
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          className="btn-primary text-lg py-3 px-8"
          onClick={handleSelectPlan}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <div className="h-4 w-4 border-t-2 border-white rounded-full animate-spin mr-2"></div>
              Chargement...
            </span>
          ) : selectedPlan === "free" ? (
            <span className="flex items-center">
              Commencer avec le plan Découverte
            </span>
          ) : (
            <span className="flex items-center">
              <CreditCardIcon className="mr-2 h-4 w-4" />
              Passer au plan Créateur
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
