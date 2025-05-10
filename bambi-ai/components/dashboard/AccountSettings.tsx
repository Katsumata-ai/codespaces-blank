"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RocketIcon, AlertTriangleIcon } from "lucide-react";
import Link from "next/link";

export function AccountSettings() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [error, setError] = useState("");
  
  // Exemple de données utilisateur (à remplacer par des données réelles)
  const user = {
    email: "utilisateur@example.com",
    plan: "découverte", // ou "créateur"
    nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 jours
  };
  
  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "SUPPRIMER") {
      setError("Veuillez saisir 'SUPPRIMER' pour confirmer.");
      return;
    }
    
    // Logique de suppression de compte à implémenter
    console.log("Deleting account...");
    
    // Redirection vers la page d'accueil
    window.location.href = "/";
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Mon Compte</h1>
      
      {/* Section Informations Personnelles */}
      <Card className="p-6 bg-bambi-card border border-bambi-border">
        <h2 className="text-xl font-semibold mb-4">Informations Personnelles</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="p-2 bg-bambi-background border border-bambi-border rounded-md">
              {user.email}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Section Abonnement */}
      <Card className="p-6 bg-bambi-card border border-bambi-border">
        <h2 className="text-xl font-semibold mb-4">Abonnement</h2>
        
        {user.plan === "découverte" ? (
          <div className="space-y-4">
            <div className="p-4 bg-bambi-background rounded-lg">
              <div className="font-medium">Plan Actuel: Plan Découverte</div>
              <div className="text-sm text-bambi-subtext mt-1">
                Limité à 50 générations d'images par mois et 1 configuration API.
              </div>
            </div>
            
            <div className="p-4 bg-bambi-accent/10 border border-bambi-accent/30 rounded-lg">
              <div className="font-medium text-bambi-accent mb-2">
                Passez au Plan Créateur pour des générations illimitées et plus de fonctionnalités !
              </div>
              <Link href="/plans">
                <Button className="btn-primary flex items-center">
                  <RocketIcon className="mr-2 h-4 w-4" />
                  Voir les avantages Premium
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-bambi-background rounded-lg">
              <div className="font-medium">Plan Actuel: Plan Créateur ✨</div>
              <div className="text-sm text-bambi-subtext mt-1">
                Générations d'images illimitées et configurations API illimitées.
              </div>
              <div className="text-sm mt-2">
                Prochaine facturation: {user.nextBilling.toLocaleDateString()}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="border-bambi-border text-bambi-text"
            >
              Gérer mon abonnement et mes paiements
            </Button>
          </div>
        )}
      </Card>
      
      {/* Zone de Danger */}
      <Card className="p-6 bg-red-500/5 border border-red-500/30">
        <h2 className="text-xl font-semibold mb-4 text-red-500">Zone de Danger</h2>
        
        <p className="text-bambi-subtext mb-4">
          La suppression de votre compte est irréversible et entraînera la perte de toutes vos données.
        </p>
        
        <Button 
          variant="outline" 
          className="border-red-500 text-red-500 hover:bg-red-500/10"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Supprimer mon compte
        </Button>
      </Card>
      
      {/* Modal de confirmation de suppression */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-bambi-card border border-bambi-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center mb-4 text-red-500">
              <AlertTriangleIcon className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-bold">Supprimer votre compte</h2>
            </div>
            
            <p className="mb-4 text-bambi-subtext">
              Cette action est irréversible. Toutes vos données seront définitivement supprimées.
            </p>
            
            <p className="mb-4 font-medium">
              Pour confirmer, veuillez saisir "SUPPRIMER" ci-dessous:
            </p>
            
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              className="w-full p-2 mb-4 bg-bambi-background border border-bambi-border rounded-md"
              placeholder="SUPPRIMER"
            />
            
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteModalOpen(false)}
                className="border-bambi-border"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleDeleteAccount}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Supprimer définitivement
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
