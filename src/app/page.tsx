import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { Cta } from '@/components/sections/cta';
import { Faq } from '@/components/sections/faq';
import { Features } from '@/components/sections/features';
import { Hero } from '@/components/sections/hero';
import { LogoCloud } from '@/components/sections/logo-cloud';
import { Pricing } from '@/components/sections/pricing';
import { Stats } from '@/components/sections/stats';
import { Testimonials } from '@/components/sections/testimonials';
import { Workflow } from '@/components/sections/workflow';

export default function Page(): JSX.Element {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <ErrorBoundary>
          <Hero />
          <LogoCloud />
          <Features />
          <Stats />
          <Workflow />
          <Testimonials />
          <Pricing />
          <Faq />
          <Cta />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
