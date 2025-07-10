#!/usr/bin/env node

/**
 * Serveur de développement pour Dafnck Army SPA
 * Gère le fallback vers index.html pour toutes les routes SPA
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

// Types MIME pour les fichiers statiques
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

// Routes SPA qui doivent servir index.html
const spaRoutes = [
    '/',
    '/auth',
    '/auth/callback',
    '/onboarding/role',
    '/onboarding/profile',
    '/onboarding/stripe', // Garde l'ancienne route pour compatibilité

    '/explorer',
    '/metrics',
    '/submissions',
    '/create',
    '/campaign/create',
    '/activities',
    '/budget',
    '/profile'
];

function serveFile(filePath, res) {
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Fichier non trouvé
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                // Erreur serveur
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            // Succès - Headers pour éviter le cache en développement
            const headers = { 'Content-Type': mimeType };
            if (extname === '.js' || extname === '.css') {
                headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
                headers['Pragma'] = 'no-cache';
                headers['Expires'] = '0';
            }

            res.writeHead(200, headers);
            res.end(content, 'utf-8');
        }
    });
}

function serveSPA(req, res) {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;

    // Nettoyer le pathname
    if (pathname === '/') {
        pathname = '/index.html';
    }

    const filePath = path.join(__dirname, pathname);

    // Vérifier si c'est un fichier statique existant
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            // Le fichier existe, le servir
            serveFile(filePath, res);
        } else {
            // Le fichier n'existe pas
            const cleanPath = pathname.replace('.html', '');
            const hasExtension = path.extname(pathname);

            // Si c'est un fichier avec extension (js, css, etc.), c'est un fichier statique manquant
            if (hasExtension) {
                console.log(`❌ Static file not found: ${pathname}`);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
                return;
            }

            // Si c'est une route SPA (sans extension), servir index.html
            const isSpaRoute = spaRoutes.includes(cleanPath) ||
                              spaRoutes.some(route => cleanPath.startsWith(route));

            if (isSpaRoute) {
                console.log(`📄 SPA route detected: ${pathname} -> serving index.html`);
                serveFile(path.join(__dirname, 'index.html'), res);
            } else {
                // Route inconnue
                console.log(`❌ Unknown route: ${pathname}`);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Page Not Found</h1>', 'utf-8');
            }
        }
    });
}

// Créer le serveur
const server = http.createServer(serveSPA);

// Démarrer le serveur
server.listen(PORT, HOST, () => {
    console.log(`🚀 Dafnck Army Server running at http://${HOST}:${PORT}/`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`🔄 SPA fallback enabled for routes: ${spaRoutes.join(', ')}`);
    console.log(`⏹️  Press Ctrl+C to stop`);
});

// Gestion propre de l'arrêt
process.on('SIGINT', () => {
    console.log('\n🛑 Server shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Server shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});
