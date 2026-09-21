export type DataStatus =
  | "DEMO"
  | "AVAILABLE"
  | "DELAYED"
  | "REPORTED"
  | "ESTIMATED"
  | "UNAVAILABLE";

export type DataClassification =
  | "DEMO DATA"
  | "REPORTED DATA"
  | "CALCULATED DATA"
  | "ESTIMATED DATA"
  | "AI INTERPRETATION"
  | "UNAVAILABLE";

export type SourceMetadata = {
  source: string;
  sourceUrl?: string;
  retrievedAt: string;
  asOf?: string;
  status: DataStatus;
  classification: DataClassification;
};

export type ProviderStatus = {
  mode: "DEMO MODE";
  quoteProvider: "NOT CONFIGURED";
  historicalPriceProvider: "NOT CONFIGURED";
  fundamentalsProvider: "NOT CONFIGURED";
  filingsProvider: "NOT CONFIGURED";
  newsProvider: "NOT CONFIGURED";
  earningsProvider: "NOT CONFIGURED";
  insiderProvider: "NOT CONFIGURED";
  institutionalProvider: "NOT CONFIGURED";
  economicCalendarProvider: "NOT CONFIGURED";
  message: string;
  metadata: SourceMetadata;
};
