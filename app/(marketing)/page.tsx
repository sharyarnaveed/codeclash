'use client';

import {
  HeroSection, LogoBarSection, SecondaryCTASection, FeaturesSection,
  CPShowcase, HackathonShowcase, TestimonialsSection, FAQSection,
} from '@/components/marketing/LandingSections';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <LogoBarSection />
      <SecondaryCTASection />
      <FeaturesSection />
      <CPShowcase />
      <HackathonShowcase />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
