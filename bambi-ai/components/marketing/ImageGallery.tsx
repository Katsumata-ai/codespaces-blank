import Image from 'next/image';
import Link from 'next/link';

const ImageGallery = () => {
  // In a real implementation, these would be actual images from your project
  const galleryImages = [
    {
      src: '/gallery/image1.jpg',
      alt: 'Futuristic cityscape with flying vehicles',
      category: 'Cityscape',
    },
    {
      src: '/gallery/image2.jpg',
      alt: 'Anime-style character with colorful hair',
      category: 'Anime',
    },
    {
      src: '/gallery/image3.jpg',
      alt: 'Photorealistic portrait of a woman',
      category: 'Portrait',
    },
    {
      src: '/gallery/image4.jpg',
      alt: 'Fantasy landscape with mountains and castle',
      category: 'Landscape',
    },
    {
      src: '/gallery/image5.jpg',
      alt: 'Cute animal in cartoon style',
      category: 'Animal',
    },
    {
      src: '/gallery/image6.jpg',
      alt: 'Abstract digital art with vibrant colors',
      category: 'Abstract',
    },
    {
      src: '/gallery/image7.jpg',
      alt: 'Sci-fi robot character design',
      category: 'Character',
    },
    {
      src: '/gallery/image8.jpg',
      alt: 'Vintage car in a sunset scene',
      category: 'Vehicle',
    },
    {
      src: '/gallery/image9.jpg',
      alt: 'Underwater scene with marine life',
      category: 'Nature',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-bambi-background to-bambi-card/30">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="section-title">See What You Can Create</h2>
          <p className="section-subtitle">
            Explore the endless possibilities with Bambi AI's image generation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-bambi-border hover:border-bambi-accent/50 transition-all duration-300"
            >
              <div className="aspect-square relative bg-bambi-card">
                {/* Placeholder for images */}
                <div className="absolute inset-0 flex items-center justify-center bg-bambi-card">
                  <div className="text-bambi-subtext text-sm">{image.alt}</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bambi-background/90 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs text-bambi-accent font-medium mb-1">{image.category}</p>
                <p className="text-sm text-bambi-text">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/gallery" className="btn-secondary">
            See More Examples
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
