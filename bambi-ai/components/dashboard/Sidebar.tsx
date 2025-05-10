"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ImageIcon, 
  KeyIcon, 
  UserIcon, 
  LogOutIcon,
  RocketIcon
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path);
  };
  
  return (
    <div className="h-screen w-64 bg-bambi-card border-r border-bambi-border flex flex-col fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="p-4 border-b border-bambi-border">
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold text-bambi-accent">Bambi AI</span>
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              href="/generate" 
              className={`flex items-center p-2 rounded-lg transition-colors ${
                isActive("/generate") 
                  ? "bg-bambi-accent/20 text-bambi-accent" 
                  : "text-bambi-subtext hover:bg-bambi-border/50 hover:text-bambi-text"
              }`}
            >
              <ImageIcon className="mr-3 h-5 w-5" />
              <span>Génération d'Images</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/api-keys" 
              className={`flex items-center p-2 rounded-lg transition-colors ${
                isActive("/api-keys") 
                  ? "bg-bambi-accent/20 text-bambi-accent" 
                  : "text-bambi-subtext hover:bg-bambi-border/50 hover:text-bambi-text"
              }`}
            >
              <KeyIcon className="mr-3 h-5 w-5" />
              <span>Gestion des Clés API</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/account" 
              className={`flex items-center p-2 rounded-lg transition-colors ${
                isActive("/account") 
                  ? "bg-bambi-accent/20 text-bambi-accent" 
                  : "text-bambi-subtext hover:bg-bambi-border/50 hover:text-bambi-text"
              }`}
            >
              <UserIcon className="mr-3 h-5 w-5" />
              <span>Mon Compte</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* User/Plan Section */}
      <div className="p-4 border-t border-bambi-border">
        <div className="mb-2 text-sm text-bambi-subtext">user@example.com</div>
        <div className="mb-4 text-xs font-medium text-bambi-accent">
          Plan Découverte: 25/50 générations restantes
        </div>
        <Link href="/plans">
          <button className="w-full btn-primary text-xs py-2 flex items-center justify-center">
            <RocketIcon className="mr-2 h-3 w-3" />
            Passer à Premium
          </button>
        </Link>
      </div>
      
      {/* Logout Button */}
      <div className="p-4 border-t border-bambi-border">
        <button className="flex items-center text-bambi-subtext hover:text-bambi-text transition-colors">
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
}

// Composant pour la version mobile du Sidebar
export function MobileSidebar() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-bambi-card border-t border-bambi-border z-30">
      <div className="flex justify-around p-2">
        <Link href="/generate" className="p-2 flex flex-col items-center">
          <ImageIcon className="h-5 w-5 text-bambi-subtext" />
          <span className="text-xs mt-1 text-bambi-subtext">Images</span>
        </Link>
        <Link href="/api-keys" className="p-2 flex flex-col items-center">
          <KeyIcon className="h-5 w-5 text-bambi-subtext" />
          <span className="text-xs mt-1 text-bambi-subtext">Clés API</span>
        </Link>
        <Link href="/account" className="p-2 flex flex-col items-center">
          <UserIcon className="h-5 w-5 text-bambi-subtext" />
          <span className="text-xs mt-1 text-bambi-subtext">Compte</span>
        </Link>
      </div>
    </div>
  );
}
