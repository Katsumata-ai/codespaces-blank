import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-bambi-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bambi-accentDark/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container-landing relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">
            Turn Your Imagination into Stunning{' '}
            <span className="bg-button-gradient bg-clip-text text-transparent">
              AI-Generated Images!
            </span>
          </h1>
          <p className="text-bambi-subtext text-lg md:text-xl max-w-2xl mb-8">
            Generate beautiful images with your own API keys. Secure, flexible, and designed for creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup" className="btn-primary">
              Try For Free
            </Link>
            <Link href="#how-it-works" className="btn-secondary">
              See How It Works
            </Link>
          </div>
        </div>

        {/* App Dashboard Mockup */}
        <div className="relative mx-auto max-w-5xl">
          <div className="bg-bambi-card rounded-xl border border-bambi-border shadow-2xl shadow-bambi-glow overflow-hidden">
            <div className="relative aspect-[16/9]">
              <Image
                src="/dashboard-mockup.png"
                alt="Bambi AI Dashboard"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-bambi-accent/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-bambi-accent/10 rounded-full blur-xl"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
