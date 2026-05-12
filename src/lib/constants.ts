import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Bot,
  Cpu,
  Github,
  Globe2,
  Layers,
  Linkedin,
  Rocket,
  Shield,
  Sparkles,
  Twitter,
  Workflow,
  Zap,
} from 'lucide-react';

export const SITE_CONFIG = {
  name: 'Nebula',
  tagline: 'AI workspace for product teams',
  description:
    'Nebula unifies docs, tasks, and AI agents into a single galaxy-fast workspace. Ship products, not processes.',
  url: 'https://nebula.example.com',
  ogImage: '/og.png',
} as const;

export type NavLink = Readonly<{
  href: string;
  label: string;
}>;

export const NAV_LINKS: readonly NavLink[] = [
  { href: '#features', label: 'Features' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
] as const;

export type Feature = Readonly<{
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}>;

export const FEATURES: readonly Feature[] = [
  {
    icon: Bot,
    title: 'AI copilots, always on',
    description:
      'Agents that draft specs, triage tickets, and review PRs while you sleep. Context-aware, never noisy.',
    accent: 'from-violet-500/30 to-fuchsia-500/10',
  },
  {
    icon: Workflow,
    title: 'Automated workflows',
    description:
      'Compose triggers, conditions, and actions visually. Replace 12 zaps with a single elegant graph.',
    accent: 'from-sky-500/30 to-cyan-400/10',
  },
  {
    icon: Shield,
    title: 'Zero-trust by default',
    description:
      'SOC 2, SSO, audit logs, and per-row policies. Security your CISO actually approves.',
    accent: 'from-emerald-500/30 to-teal-400/10',
  },
  {
    icon: Zap,
    title: 'Sub-50ms everything',
    description:
      'Edge-deployed CRDT sync. Every keystroke, search, and transition feels instant, everywhere.',
    accent: 'from-amber-500/30 to-orange-400/10',
  },
  {
    icon: Layers,
    title: 'Composable primitives',
    description:
      'Docs, tables, kanbans, whiteboards. One building block language across every surface.',
    accent: 'from-pink-500/30 to-rose-400/10',
  },
  {
    icon: Globe2,
    title: 'Built for global teams',
    description:
      'Realtime cursors, localisation for 40+ languages, timezone-aware rituals. Ship follow-the-sun.',
    accent: 'from-indigo-500/30 to-blue-400/10',
  },
] as const;

export type Stat = Readonly<{
  value: string;
  label: string;
  icon: LucideIcon;
}>;

export const STATS: readonly Stat[] = [
  { value: '12k+', label: 'teams onboard', icon: Rocket },
  { value: '99.99%', label: 'platform uptime', icon: Activity },
  { value: '48ms', label: 'median latency', icon: Cpu },
  { value: '4.9/5', label: 'customer rating', icon: Sparkles },
] as const;

export type WorkflowStep = Readonly<{
  index: string;
  title: string;
  description: string;
  snippet: string;
}>;

export const WORKFLOW_STEPS: readonly WorkflowStep[] = [
  {
    index: '01',
    title: 'Capture',
    description:
      'Pipe anything — Slack, email, Linear, your brain — into a single inbox. Nebula classifies it.',
    snippet: "nebula.capture('#design-review', { tag: 'inbound' })",
  },
  {
    index: '02',
    title: 'Compose',
    description:
      'Chain blocks with typed inputs. Preview the run. Ship pipelines without YAML yak-shaving.',
    snippet: 'flow.map(issue).filter(priority.gte("P1")).assign(agent.triage)',
  },
  {
    index: '03',
    title: 'Compound',
    description:
      'Every shipped flow trains your org graph. The next run is smarter, faster, cheaper.',
    snippet: 'graph.learn({ from: runs.last(30), horizon: "14d" })',
  },
] as const;

export type Testimonial = Readonly<{
  quote: string;
  name: string;
  role: string;
  company: string;
}>;

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote:
      'We collapsed Notion, Linear, and three homegrown scripts into Nebula. Planning went from Mondays to minutes.',
    name: 'Ava Zhang',
    role: 'Head of Product',
    company: 'Quasar Labs',
  },
  {
    quote:
      'The AI agents feel like a senior engineer who never sleeps. Our PR review time dropped 62% in a quarter.',
    name: 'Marcus Holloway',
    role: 'VP Engineering',
    company: 'Arcfield',
  },
  {
    quote:
      'Security, speed, and delight in one tool. It is rare. It is Nebula. Our CFO signed off in under a week.',
    name: 'Priya Raman',
    role: 'Chief of Staff',
    company: 'Meridian',
  },
  {
    quote:
      'Onboarding takes an afternoon. The composable primitives mean every team builds what they actually need.',
    name: 'Théo Laurent',
    role: 'Operations Lead',
    company: 'Northwind',
  },
] as const;

export type PricingTier = Readonly<{
  name: string;
  price: string;
  period: string;
  description: string;
  features: readonly string[];
  cta: string;
  featured?: boolean;
}>;

export const PRICING: readonly PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'For small teams exploring the universe.',
    features: [
      'Up to 5 members',
      'Unlimited docs & tasks',
      '3 AI agents',
      'Community support',
    ],
    cta: 'Start free',
  },
  {
    name: 'Team',
    price: '$18',
    period: 'per user / mo',
    description: 'For teams shipping serious product velocity.',
    features: [
      'Everything in Starter',
      'Unlimited AI agents',
      'SSO & audit logs',
      'Priority support',
      'Workflow automations',
    ],
    cta: 'Start 14-day trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'talk to us',
    description: 'For orgs with regulation, scale, and ambition.',
    features: [
      'Everything in Team',
      'SAML, SCIM, BYO-KMS',
      'Dedicated infrastructure',
      '99.99% SLA',
      'White-glove onboarding',
    ],
    cta: 'Contact sales',
  },
] as const;

export type FaqItem = Readonly<{
  q: string;
  a: string;
}>;

export const FAQ: readonly FaqItem[] = [
  {
    q: 'How is Nebula different from Notion or Linear?',
    a: 'Nebula is one substrate, not three tools duct-taped together. Docs, tasks, and AI share a typed graph — data flows without copy-paste or integrations rot.',
  },
  {
    q: 'Is my data used to train models?',
    a: 'Never. Your workspace runs against isolated, per-tenant embeddings. You own every token. We publish our data handling policy at nebula.example.com/security.',
  },
  {
    q: 'Can I self-host?',
    a: 'Yes. Enterprise customers can deploy Nebula on-prem or into their own VPC. We ship signed, attested images and a Helm chart.',
  },
  {
    q: 'What happens after the free trial?',
    a: 'You keep the Starter plan forever. No credit card, no forced upgrade. Your data stays exactly where it is.',
  },
  {
    q: 'Do you support mobile?',
    a: 'Native apps for iOS and Android launch alongside the web. Realtime sync, offline-first, and a first-class widget gallery.',
  },
] as const;

export type Brand = Readonly<{ name: string }>;

export const BRANDS: readonly Brand[] = [
  { name: 'Quasar' },
  { name: 'Arcfield' },
  { name: 'Meridian' },
  { name: 'Northwind' },
  { name: 'Helix' },
  { name: 'Polaris' },
  { name: 'Vanta' },
  { name: 'Orbital' },
] as const;

export type SocialLink = Readonly<{
  href: string;
  label: string;
  icon: LucideIcon;
}>;

export const SOCIALS: readonly SocialLink[] = [
  { href: 'https://github.com', label: 'GitHub', icon: Github },
  { href: 'https://twitter.com', label: 'Twitter', icon: Twitter },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: Linkedin },
] as const;

export const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { href: '#features', label: 'Features' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#workflow', label: 'Workflows' },
      { href: '#', label: 'Changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '#', label: 'About' },
      { href: '#', label: 'Careers' },
      { href: '#', label: 'Press' },
      { href: '#', label: 'Contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '#', label: 'Docs' },
      { href: '#', label: 'API' },
      { href: '#', label: 'Status' },
      { href: '#', label: 'Security' },
    ],
  },
] as const;

export { Code2 };
