import React from 'react';

export interface ServiceRoute {
  id: string;
  title: string;
  path: string;
  description: string;
  icon: React.ElementType;
  details: {
    heroImage: string;
    whatWeDo: string[];
    included: string[];
    process: string[];
    faqs: { question: string; answer: string }[];
  };
}

export interface Project {
  id: number;
  title: string;
  category: string; // 'pool-cages' | 'rescreens' | 'repairs' | 'glass-rooms' | 'lanais' | 'porches'
  location: string;
  imageUrl: string;
  description: string;
}

export interface ServiceArea {
  id: string;
  name: string;
  path: string;
  cities: string[];
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
  honeypot: string; // Anti-spam
  privacyAccepted: boolean;
}