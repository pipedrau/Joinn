import React from 'react';

export interface TeamMember {
  name: string;
  role: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ElementType;
}