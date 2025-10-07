

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export enum AnalysisStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  ERROR = 'error',
}

export enum SeverityLevel {
  RENDAH = 'Rendah',
  SEDANG = 'Sedang',
  TINGGI = 'Tinggi',
  KRITIS = 'Kritis',
}

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  role: Role;
  createdAt: string;
  lastLogin: string;
}

export interface FinancialReport {
  id: number;
  userId: number;
  originalFilename: string;
  analysisStatus: AnalysisStatus;
  uploadTimestamp: string;
  detectionCount: number;
}

export interface DetectionResult {
  id: number;
  reportId: number;
  anomalyType: string;
  severityLevel: SeverityLevel;
  description: string;
  offendingData: Record<string, any>;
  detectedAt: string;
}

export interface MarketPrice {
  id: number;
  itemName: string;
  category: string;
  region: string;
  averagePrice: number;
  unit: string;
  source: string;
  lastUpdated: string;
}

export interface Article {
  id: number;
  adminId: number;
  title: string;
  content: string;
  slug: string;
  status: ArticleStatus;
  publishedAt: string;
  imageUrl?: string;
}

export interface RabProject {
    id: number;
    userId: number;
    projectName: string;
    totalBudget: number;
    createdAt: string;
}

export interface RabItem {
    id: number;
    projectId: number;
    itemName: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    subtotal: number;
}


export interface ExternalArticle {
  title: string;
  summary: string;
  source: string;
  url: string;
}

export interface ActivityLogItem {
  id: number;
  userId: number | null;
  action: string;
  target: string;
  timestamp: string;
}