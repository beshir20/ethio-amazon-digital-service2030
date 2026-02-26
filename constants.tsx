
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'passport',
    title: 'Passport Services',
    description: 'Apply for a new passport, renew existing ones, or track application status.',
    icon: 'fa-passport',
    category: 'government',
    color: 'blue'
  },
  {
    id: 'utility',
    title: 'Utility Payments',
    description: 'Pay your electricity, water, and telecom bills securely online.',
    icon: 'fa-bolt',
    category: 'utility',
    color: 'orange'
  },
  {
    id: 'transport',
    title: 'Transport Hub',
    description: 'Check bus schedules, pay traffic fines, or manage vehicle registration.',
    icon: 'fa-bus',
    category: 'transport',
    color: 'green'
  },
  {
    id: 'digital-id',
    title: 'Fayda ID',
    description: 'Register for Ethiopia\'s national digital identity system.',
    icon: 'fa-id-card',
    category: 'government',
    color: 'purple'
  },
  {
    id: 'finance',
    title: 'Tax Services',
    description: 'File income tax, business taxes, or check your tax compliance.',
    icon: 'fa-money-bill-transfer',
    category: 'finance',
    color: 'red'
  },
  {
    id: 'land',
    title: 'Land Management',
    description: 'Access property records, land titles, and building permits.',
    icon: 'fa-map-location-dot',
    category: 'government',
    color: 'teal'
  }
];

export const SYSTEM_INSTRUCTION = `You are the Ethio-Digital Assistant, a helpful AI guide for the citizens of Ethiopia. 
Your goal is to help users navigate government services, utility payments, and digital registration systems like Fayda.
Always be polite, professional, and provide accurate, up-to-date information.
If a user asks about locations, use Google Maps grounding. 
If they ask about latest news or policies, use Google Search grounding.
Helpful context: 
- Prime Minister: Abiy Ahmed
- Currency: Ethiopian Birr (ETB)
- Language: Primary official is Amharic, but help in English.
- Digital ID: Fayda`;
