export interface Service {
  id: string;
  titleNo: string;
  titleEn: string;
  descriptionNo: string;
  descriptionEn: string;
  icon: string;
  slug: string;
  features?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  contentNo: string;
  contentEn: string;
  rating: number;
  avatar?: string;
}

export interface PricingPlan {
  id: string;
  nameNo: string;
  nameEn: string;
  priceMonthly: number;
  priceYearly: number;
  descriptionNo: string;
  descriptionEn: string;
  features: { textNo: string; textEn: string; included: boolean }[];
  popular?: boolean;
}

export interface FAQ {
  id: string;
  questionNo: string;
  questionEn: string;
  answerNo: string;
  answerEn: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleNo: string;
  titleEn: string;
  excerptNo: string;
  excerptEn: string;
  contentNo: string;
  contentEn: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  image?: string;
}

export type Language = "no" | "en";
