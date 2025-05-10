"use client";

import { useState } from "react";
import { 
  ChevronDownIcon, 
  ChevronUpIcon, 
  DownloadIcon, 
  ShareIcon, 
  RefreshCwIcon,
  Loader2Icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

// Types pour les configurations API et les images générées
type ApiConfig = {
  id: string;
  name: string;
  provider: string;
};

type GeneratedImage = {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
};

export function ImageGenerator() {
  // États
  const [selectedConfig, setSelectedConfig] = useState<string | null>("1"); // Pour la démo, on présélectionne une config
  const [prompt, setPrompt] = useState("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [imageCount, setImageCount] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Exemple de configurations API (à remplacer par des données réelles)
  const apiConfigs: ApiConfig[] = [
    { id: "1", name: "Ma clé OpenAI", provider: "OpenAI" },
    { id: "2", name: "Stability AI", provider: "Stability AI" },
  ];
  
  // Fonction de génération d'images
  const generateImages = async () => {
    if (!selectedConfig) {
      setError("Veuillez sélectionner une configuration API.");
      return;
    }
    
    if (!prompt.trim()) {
      setError("Veuillez saisir un prompt.");
      return;
    }
    
    setError(null);
    setIsGenerating(true);
    
    try {
      // Simulation de génération d'images (à remplacer par l'appel API réel)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Exemple de résultats (à remplacer par les résultats réels)
      const newImages: GeneratedImage[] = Array.from({ length: imageCount }, (_, i) => ({
        id: `img-${Date.now()}-${i}`,
        url: `https://picsum.photos/seed/${Date.now() + i}/512/512`,
        prompt,
        timestamp: new Date(),
      }));
      
      setGeneratedImages(newImages);
    } catch (err) {
      setError("Erreur lors de la génération. Veuillez réessayer.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Générer des Images</h1>
      
      {/* Zone de Configuration & Prompt */}
      <Card className="p-6 bg-bambi-card border border-bambi-border">
        {/* Sélecteur de Configuration API */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Configuration API active :
          </label>
          
          {apiConfigs.length === 0 ? (
            <div className="text-center p-4 border border-dashed border-bambi-border rounded-lg">
              <p className="text-bambi-subtext mb-2">Aucune clé API configurée.</p>
              <Button 
                variant="outline" 
                className="text-bambi-accent border-bambi-accent"
                onClick={() => window.location.href = "/api-keys"}
              >
                + Ajouter une Clé API
              </Button>
            </div>
          ) : (
            <select
              value={selectedConfig || ""}
              onChange={(e) => setSelectedConfig(e.target.value)}
              className="w-full p-2 rounded-md bg-bambi-background border border-bambi-border text-bambi-text"
            >
              <option value="" disabled>Sélectionner une configuration</option>
              {apiConfigs.map(config => (
                <option key={config.id} value={config.id}>
                  {config.name} ({config.provider})
                </option>
              ))}
            </select>
          )}
        </div>
        
        {/* Champ Prompt */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Décrivez l'image à générer :
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Décrivez l'image que vous souhaitez créer... (ex: un chaton mignon jouant avec une pelote de laine, style peinture à l'huile)"
            className="min-h-[100px] bg-bambi-background border-bambi-border"
          />
        </div>
        
        {/* Options Avancées */}
        <div className="mb-6">
          <button
            type="button"
            className="flex items-center text-bambi-subtext hover:text-bambi-text transition-colors text-sm font-medium"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          >
            {isAdvancedOpen ? (
              <ChevronUpIcon className="mr-1 h-4 w-4" />
            ) : (
              <ChevronDownIcon className="mr-1 h-4 w-4" />
            )}
            Options avancées
          </button>
          
          {isAdvancedOpen && (
            <div className="mt-4 p-4 bg-bambi-background/50 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre d'images à générer :
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 4].map(num => (
                    <button
                      key={num}
                      type="button"
                      className={`px-4 py-2 rounded-lg border ${
                        imageCount === num
                          ? "bg-bambi-accent/20 border-bambi-accent text-bambi-accent"
                          : "border-bambi-border text-bambi-subtext"
                      }`}
                      onClick={() => setImageCount(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Autres options avancées à ajouter ici */}
            </div>
          )}
        </div>
        
        {/* Bouton de génération */}
        <Button
          className="w-full btn-primary"
          onClick={generateImages}
          disabled={isGenerating || !selectedConfig || !prompt.trim()}
        >
          {isGenerating ? (
            <span className="flex items-center">
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Génération en cours...
            </span>
          ) : (
            "✨ Générer"
          )}
        </Button>
        
        {/* Message d'erreur */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}
      </Card>
      
      {/* Zone de Résultats */}
      <div>
        {isGenerating ? (
          <div className="text-center p-12 border border-dashed border-bambi-border rounded-lg">
            <div className="animate-pulse-subtle mb-4">
              <div className="h-8 w-8 mx-auto border-t-2 border-bambi-accent rounded-full animate-spin"></div>
            </div>
            <p className="text-bambi-subtext">Génération en cours... Veuillez patienter.</p>
          </div>
        ) : generatedImages.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Vos Créations :</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generatedImages.map(image => (
                <Card key={image.id} className="overflow-hidden border border-bambi-border">
                  <div className="relative aspect-square">
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div className="text-sm text-bambi-subtext truncate max-w-[70%]">
                      {image.prompt}
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-full hover:bg-bambi-border/50 transition-colors">
                        <DownloadIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-bambi-border/50 transition-colors">
                        <ShareIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-bambi-border/50 transition-colors">
                        <RefreshCwIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center p-12 border border-dashed border-bambi-border rounded-lg">
            <p className="text-bambi-subtext">
              Vos images apparaîtront ici. Décrivez ce que vous voulez créer et cliquez sur 'Générer' !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
