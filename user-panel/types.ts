// rezking07/eradicator-ai/ERADICATOR-AI-c97fdc3b5374f6cffe6641c8f996ff599a2f96b6/user-panel/types.ts

export interface Article {
  id: number;
  title: string;
  category: string;
  author: string;
  publish_date: string;
  content: string;
  image_url: string;
  summary: string;
}

export interface Report {
  id: string;
  type: 'Analysis' | 'RAB';
  name: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Failed';
  risk_level?: 'Low' | 'Medium' | 'High';
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ChatMessage {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  references?: Article[];
}

export interface RabItem {
  id: number;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export interface PriceReference {
  id: number;
  name: string;
  category: string;
  region: string;
  price: number;
  source: string;
  notes: string;
  addedDate: string;
}

// PERUBAHAN DIMULAI DI SINI
export interface InsightItem {
  type: 'MARK_UP' | 'UNRECOGNIZED' | 'UNIT_MISMATCH' | 'QUALITY_ISSUE' | 'CALCULATION_ERROR';
  itemName: string;
  details: string;
  recommendation: string;
  potentialLoss: number;
}

export interface AnalysisResult {
    riskLevel: 'Low' | 'Medium' | 'High';
    summary: string;
    insights: InsightItem[]; // Ini yang diubah dari string[]
}
// PERUBAHAN SELESAI DI SINI

export interface PriceRecord {
  id: number;
  productName: string;
  productCode: string;
  regionCode: string;
  regionName: string;
  category: string;
  unit: string;
  minPrice: number;
  maxPrice: number;
}