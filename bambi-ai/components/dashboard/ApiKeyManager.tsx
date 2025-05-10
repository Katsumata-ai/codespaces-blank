"use client";

import { useState } from "react";
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  XIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// Types pour les configurations API
type ApiConfig = {
  id: string;
  name: string;
  provider: string;
  key: string;
  isDefault: boolean;
};

// Providers disponibles
const API_PROVIDERS = [
  { value: "openai", label: "OpenAI" },
  { value: "stability", label: "Stability AI" },
  { value: "google", label: "Google" },
  { value: "midjourney", label: "Midjourney" },
];

export function ApiKeyManager() {
  // États
  const [configs, setConfigs] = useState<ApiConfig[]>([
    { 
      id: "1", 
      name: "Ma clé OpenAI", 
      provider: "openai", 
      key: "sk-••••••••••••••••••••XY1Z", 
      isDefault: true 
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<ApiConfig | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    key: "",
    isDefault: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  
  // Ouvrir le modal pour ajouter une nouvelle configuration
  const openAddModal = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      provider: "",
      key: "",
      isDefault: false,
    });
    setError(null);
    setShowKey(false);
    setIsModalOpen(true);
  };
  
  // Ouvrir le modal pour modifier une configuration existante
  const openEditModal = (config: ApiConfig) => {
    setIsEditing(true);
    setCurrentConfig(config);
    setFormData({
      name: config.name,
      provider: config.provider,
      key: "", // Ne pas afficher la clé existante pour des raisons de sécurité
      isDefault: config.isDefault,
    });
    setError(null);
    setShowKey(false);
    setIsModalOpen(true);
  };
  
  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Sauvegarder la configuration
  const saveConfig = () => {
    // Validation
    if (!formData.name.trim()) {
      setError("Le nom de la configuration est requis.");
      return;
    }
    
    if (!formData.provider) {
      setError("Veuillez sélectionner un fournisseur d'API.");
      return;
    }
    
    if (!isEditing && !formData.key.trim()) {
      setError("La clé API est requise.");
      return;
    }
    
    // Simuler la sauvegarde (à remplacer par l'appel API réel)
    if (isEditing && currentConfig) {
      // Mise à jour d'une configuration existante
      setConfigs(prev => 
        prev.map(config => 
          config.id === currentConfig.id 
            ? { 
                ...config, 
                name: formData.name, 
                provider: formData.provider,
                ...(formData.key ? { key: formData.key } : {}),
                isDefault: formData.isDefault,
              } 
            : formData.isDefault 
              ? { ...config, isDefault: false } 
              : config
        )
      );
    } else {
      // Ajout d'une nouvelle configuration
      const newConfig: ApiConfig = {
        id: `config-${Date.now()}`,
        name: formData.name,
        provider: formData.provider,
        key: formData.key,
        isDefault: formData.isDefault,
      };
      
      setConfigs(prev => {
        const updatedConfigs = formData.isDefault 
          ? prev.map(config => ({ ...config, isDefault: false }))
          : [...prev];
        
        return [...updatedConfigs, newConfig];
      });
    }
    
    // Fermer le modal
    setIsModalOpen(false);
  };
  
  // Supprimer une configuration
  const deleteConfig = (id: string) => {
    // Confirmation
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette configuration ?")) {
      return;
    }
    
    setConfigs(prev => prev.filter(config => config.id !== id));
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion de vos Clés API</h1>
        <Button 
          onClick={openAddModal}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Ajouter une nouvelle Clé API
        </Button>
      </div>
      
      {/* Liste des configurations */}
      {configs.length === 0 ? (
        <Card className="p-8 text-center border border-dashed border-bambi-border">
          <p className="text-bambi-subtext mb-4">
            Vous n'avez aucune configuration de clé API. Ajoutez-en une pour commencer !
          </p>
          <Button 
            onClick={openAddModal}
            className="btn-primary"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Ajouter une Clé API
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {configs.map(config => (
            <Card 
              key={config.id} 
              className="p-4 border border-bambi-border flex justify-between items-center"
            >
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{config.name}</h3>
                  {config.isDefault && (
                    <span className="ml-2 px-2 py-0.5 bg-bambi-accent/20 text-bambi-accent text-xs rounded-full">
                      Par défaut
                    </span>
                  )}
                </div>
                <div className="text-sm text-bambi-subtext mt-1">
                  {API_PROVIDERS.find(p => p.value === config.provider)?.label || config.provider}
                </div>
                <div className="text-xs font-mono mt-1 text-bambi-subtext">
                  {config.key}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openEditModal(config)}
                  className="border-bambi-border text-bambi-subtext hover:text-bambi-text"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => deleteConfig(config.id)}
                  className="border-bambi-border text-bambi-subtext hover:text-red-500"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {/* Modal pour ajouter/modifier une configuration */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-bambi-card border border-bambi-border rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditing ? "Modifier la Clé API" : "Ajouter une Clé API"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-bambi-subtext hover:text-bambi-text"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nom de la configuration
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Ma clé perso DALL-E"
                  className="bg-bambi-background border-bambi-border"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Fournisseur d'API
                </label>
                <select
                  name="provider"
                  value={formData.provider}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-bambi-background border border-bambi-border text-bambi-text"
                >
                  <option value="" disabled>Sélectionner un fournisseur</option>
                  {API_PROVIDERS.map(provider => (
                    <option key={provider.value} value={provider.value}>
                      {provider.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Clé API {isEditing && "(laisser vide pour conserver l'existante)"}
                </label>
                <div className="relative">
                  <Input
                    name="key"
                    type={showKey ? "text" : "password"}
                    value={formData.key}
                    onChange={handleChange}
                    placeholder={isEditing ? "••••••••••••••••••••" : "sk-..."}
                    className="w-full bg-bambi-background border-bambi-border pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-bambi-subtext hover:text-bambi-text"
                  >
                    {showKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="isDefault"
                  name="isDefault"
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
                  className="h-4 w-4 rounded border-bambi-border text-bambi-accent focus:ring-bambi-accent"
                />
                <label htmlFor="isDefault" className="ml-2 block text-sm">
                  Définir comme configuration par défaut
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
                className="border-bambi-border"
              >
                Annuler
              </Button>
              <Button 
                onClick={saveConfig}
                className="btn-primary"
              >
                {isEditing ? "Mettre à jour" : "Sauvegarder la clé"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
