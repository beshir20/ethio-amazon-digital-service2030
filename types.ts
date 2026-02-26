
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'government' | 'utility' | 'transport' | 'finance';
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
  groundingUrls?: { title: string; uri: string }[];
}

export interface GroundingChunk {
  web?: { uri: string; title: string };
  maps?: { uri: string; title: string };
}

export interface VaultDocument {
  id: string;
  name: string;
  type: string;
  issueDate: string;
  expiryDate?: string;
  status: 'active' | 'expired' | 'pending';
  icon: string;
}
