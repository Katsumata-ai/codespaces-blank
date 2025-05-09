import Image from 'next/image';

const TrustedBy = () => {
  const partners = [
    { name: 'Freepik', logo: '/logos/freepik.svg' },
    { name: 'Foxspace', logo: '/logos/foxspace.svg' },
    { name: 'Woven', logo: '/logos/woven.svg' },
    { name: 'Promptopia', logo: '/logos/promptopia.svg' },
    { name: 'Designify', logo: '/logos/designify.svg' },
  ];

  return (
    <section className="py-12 border-y border-bambi-border">
      <div className="container-landing">
        <div className="text-center mb-8">
          <p className="text-bambi-subtext text-sm uppercase tracking-wider">Trusted By</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner) => (
            <div key={partner.name} className="opacity-60 hover:opacity-100 transition-opacity duration-300">
              <div className="h-8 w-24 relative">
                {/* Note: In a real implementation, you would have actual logo SVGs */}
                <div className="text-bambi-subtext text-sm font-medium">{partner.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
