import Navbar from '@/components/marketing/Navbar';
import Hero from '@/components/marketing/Hero';
import TrustedBy from '@/components/marketing/TrustedBy';
import HowItWorks from '@/components/marketing/HowItWorks';
import ImageGallery from '@/components/marketing/ImageGallery';
import Features from '@/components/marketing/Features';
import Pricing from '@/components/marketing/Pricing';
import Testimonials from '@/components/marketing/Testimonials';
import FAQ from '@/components/marketing/FAQ';
import CTA from '@/components/marketing/CTA';
import Footer from '@/components/marketing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-bambi-background">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <HowItWorks />
        <ImageGallery />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
