import Link from 'next/link';

const CTA = () => {
  return (
    <section className="py-20 bg-bambi-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-bambi-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-bambi-accentDark/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-landing relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Unlock Your{' '}
            <span className="bg-button-gradient bg-clip-text text-transparent">
              AI Creativity?
            </span>
          </h2>
          <p className="text-bambi-subtext text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of creators using Bambi AI to bring their imagination to life with secure, flexible image generation.
          </p>
          <Link href="/signup" className="btn-primary text-lg py-4 px-8">
            Get Started For Free
          </Link>
          <p className="mt-4 text-sm text-bambi-subtext">
            No credit card required for free plan
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
