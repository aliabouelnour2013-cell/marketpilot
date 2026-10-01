import { PricingContent } from "@/components/PricingContent";

export const metadata = {
  title: "Pricing — MarketPilot Premium",
  description: "Subscribe to MarketPilot Premium for AI-powered market research.",
};

export default function PricingPage() {
  return (
    <main className="standalone-page">
      <PricingContent />
    </main>
  );
}
