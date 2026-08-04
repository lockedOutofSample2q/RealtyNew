// content/area-calculator/types.ts

export interface KeyFact {
  term: string;
  value: string;
}

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface Citation {
  title: string;
  url: string;
  source: string;
}

export interface SiblingLink {
  slug: string;
  anchorText: string;
}

export interface ProseSection {
  title: string;
  content: string;
}

export interface AreaPageContent {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  tier: "hub" | "conversion" | "entity";
  answerBlock: string;
  keyFacts: KeyFact[];
  formula: {
    forward: string;
    reverse: string;
    example: string;
  };
  questions: QuestionAnswer[];
  citations: Citation[];
  statistic: string;
  provenance: string;
  sections: ProseSection[];
  siblingLinks: SiblingLink[];
  entityLinks?: SiblingLink[];
  fromUnitId?: string;
  toUnitId?: string;
  defaultRegion?: "mohali" | "patiala" | "doaba" | "majha" | "kapurthala" | "ludhiana";
}
