import { Wallet, TrendingUp, Globe, ShieldCheck, Zap, Users, BrainCircuit, CreditCard } from 'lucide-react';
import { TeamMember, StatItem, FeatureItem } from './types';

export const NAV_LINKS = [
  { name: 'Mission', href: '#mission' },
  { name: 'Solution', href: '#solution' },
  { name: 'Market', href: '#market' },
  { name: 'Team', href: '#team' },
];

export const HERO_CONTENT = {
  title: "Cash That Compounds.",
  subtitle: "Inflation? Not on This Card.",
  description: "We created a wallet where \"spend\" and \"invest\" are two sides of the same transaction. Join the first platform helping underserved populations build wealth while they spend.",
};

export const STATS: StatItem[] = [
  { value: "98.7%", label: "Unserved", description: "Of people in LATAM with savings don't invest." },
  { value: "$150B", label: "Market Size", description: "Annual investable capital in LATAM alone." },
  { value: "3%", label: "Yield Access", description: "Only 3% of adults currently access yield assets." },
];

export const FEATURES: FeatureItem[] = [
  {
    title: "Joinn Pay",
    description: "A yield-generating wallet that acts like a card. Invest and spend seamlessly without breaking the chain of compound growth.",
    icon: CreditCard
  },
  {
    title: "Joinn Invest",
    description: "Tokenized Bonds, ETFs & Index Funds. Think Venmo meets Robinhood, but built for the next billion users.",
    icon: TrendingUp
  },
  {
    title: "AI-Powered Scale",
    description: "Emotionally intelligent onboarding, gamified savings tools, and Web3-grade security with Web2 simplicity.",
    icon: BrainCircuit
  },
  {
    title: "Web3 Economics",
    description: "Gasless, self-custodial, accessible 24/7. Account abstraction makes blockchain invisible.",
    icon: Zap
  }
];

export const TEAM: TeamMember[] = [
  {
    name: "Bryan Benson",
    role: "Strategic Partnerships",
    description: "Ex-Managing Director of Binance LatAm. 27+ years building businesses."
  },
  {
    name: "Leonardo Galindez",
    role: "Product Strategy",
    description: "Founder of COINCOINX ($300M revenue). Built teams of 70+ professionals."
  },
  {
    name: "Beau Williams",
    role: "CTO",
    description: "Product-focused engineer from Atlassian and Auth0. Web2-style UX architecture."
  },
  {
    name: "Dan Foley",
    role: "CMO",
    description: "Award-winning marketer & registered investment banker. Leads commercial strategy."
  }
];