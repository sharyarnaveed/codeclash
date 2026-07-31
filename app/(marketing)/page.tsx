'use client';

import {
  HeroSection, LogoBarSection, SecondaryCTASection, FeaturesSection,
  CPShowcase, HackathonShowcase, TestimonialsSection, FAQSection,
} from '@/components/marketing/LandingSections';
import { HeroReadyProvider } from '@/components/marketing/hero-ready-context';

export default function LandingPage() {
  return (
    <HeroReadyProvider>
      <HeroSection />
      <LogoBarSection />
      <SecondaryCTASection />
      <FeaturesSection />
      <CPShowcase />
      <HackathonShowcase />
      <TestimonialsSection />
      <FAQSection />
    </HeroReadyProvider>
  );
}
