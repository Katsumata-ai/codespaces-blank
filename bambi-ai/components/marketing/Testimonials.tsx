import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Bambi AI has completely transformed my creative workflow. The ability to use my own API keys while keeping them secure is exactly what I needed. The images are stunning!",
      author: "Sarah Johnson",
      title: "Digital Artist",
      avatar: "/testimonials/avatar1.jpg",
    },
    {
      quote:
        "As a developer, I appreciate the technical flexibility Bambi AI offers. I can switch between different AI providers seamlessly and the security measures are top-notch.",
      author: "Michael Chen",
      title: "Software Engineer",
      avatar: "/testimonials/avatar2.jpg",
    },
    {
      quote:
        "The premium plan is worth every penny. Unlimited generations and HD exports have made my design process so much faster. Customer support is excellent too!",
      author: "Emma Rodriguez",
      title: "UI/UX Designer",
      avatar: "/testimonials/avatar3.jpg",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-bambi-background">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">
            Join thousands of creators who trust Bambi AI for their image generation needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-bambi-card border border-bambi-border rounded-xl p-6 hover:border-bambi-accent/50 transition-colors duration-300"
            >
              <div className="mb-6">
                <svg
                  className="h-8 w-8 text-bambi-accent/40"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="text-bambi-subtext mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-bambi-border overflow-hidden mr-3">
                  {/* Placeholder for avatar */}
                  <div className="h-full w-full flex items-center justify-center text-xs text-bambi-subtext">
                    {testimonial.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-bambi-subtext">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
