'use client';

import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is Bambi AI?',
      answer:
        'Bambi AI is a web application that allows you to generate high-quality images using AI models through your own API keys (BYOK - Bring Your Own Key). We support multiple providers including OpenAI, Stability AI, Google, Hugging Face, and OpenRouter.',
    },
    {
      question: 'How does the BYOK (Bring Your Own Key) system work?',
      answer:
        'Our BYOK system allows you to use your own API keys from supported providers. Your keys are encrypted with AES-256 encryption and never exposed in the frontend. All API calls are proxied through our secure backend to ensure maximum security.',
    },
    {
      question: 'Is there a free plan available?',
      answer:
        'Yes! Our free plan includes 50 image generations per month and allows you to save one API configuration. This is perfect for trying out the service or for occasional use.',
    },
    {
      question: 'What do I get with the Premium plan?',
      answer:
        'The Premium plan ($5/month or $50/year) includes unlimited image generations, unlimited API configurations, HD resolution exports (4K, SVG), complete history with organization features, priority support, and advanced prompt tools.',
    },
    {
      question: 'Which AI image generation providers are supported?',
      answer:
        'We currently support OpenAI (DALL·E), Stability AI (Stable Diffusion), Google (Imagen), Hugging Face, and OpenRouter. We regularly add support for new providers as they become available.',
    },
    {
      question: 'How secure are my API keys?',
      answer:
        'Security is our top priority. Your API keys are encrypted with AES-256 encryption before being stored in our database. All API calls are made through our secure backend proxy, so your keys are never exposed to the client side or third parties.',
    },
  ];

  const toggleFaq = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="py-20 bg-bambi-card/30">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about Bambi AI
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 border-b border-bambi-border pb-4 last:border-0"
            >
              <button
                className="flex justify-between items-center w-full text-left py-4"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <svg
                  className={`h-5 w-5 text-bambi-accent transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-bambi-subtext pb-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
