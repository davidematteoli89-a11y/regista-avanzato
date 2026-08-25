export type SubstackPlanStatus = "free" | "paid";
export type SubstackCtaLabel = "Leggi su Substack" | "Iscriviti gratis" | "Ricevi il report completo";

export type SubstackFeature = {
  id: string;
  label: string;
  description: string;
};

export type SubstackPlan = {
  id: "substack_free" | "substack_paid";
  name: string;
  status: SubstackPlanStatus;
  description: string;
  features: readonly SubstackFeature[];
  ctaLabel: SubstackCtaLabel;
  disclaimer: string;
};

export type SubstackConfig = {
  configured: boolean;
  url: string | null;
  state: "configured" | "missing" | "invalid";
  reason: string;
};

export type NewsletterPreviewItem = {
  id: string;
  title: string;
  description: string;
  officialLinkOnly?: boolean;
};

export type NewsletterDigestPreview = {
  weekTitle: string;
  intro: string;
  stories: readonly NewsletterPreviewItem[];
  talents: readonly NewsletterPreviewItem[];
  highlights: readonly NewsletterPreviewItem[];
  crazyMatch: NewsletterPreviewItem;
  historicalEcho: NewsletterPreviewItem;
  finalCta: SubstackCtaLabel;
};

export type SubstackReportPreviewData = {
  title: string;
  reportType: string;
  description: string;
  sections: readonly string[];
  disclaimer: string;
};
