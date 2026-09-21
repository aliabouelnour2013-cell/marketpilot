import { BookOpen, GraduationCap } from "lucide-react";

import { educationLevels } from "@/lib/demo-data";

import { PageHeading } from "./PageHeading";

export function EducationView() {
  return (
    <section className="page-section">
      <PageHeading
        title="Education"
        description="Educational content is separate from analysis and does not recommend securities."
      />

      <div className="three-column-grid">
        {educationLevels.map((lesson) => (
          <section className="card info-card" key={lesson.level}>
            <div className="card-title">
              <GraduationCap size={19} />
              {lesson.level}
            </div>

            <p>{lesson.topics}</p>

            <div className="source-line">
              Source: MarketPilot educational material — not financial advice
            </div>
          </section>
        ))}
      </div>

      <section className="card lower-grid">
        <div className="card-title">
          <BookOpen size={18} />
          Lesson structure
        </div>

        <p className="education-copy">
          Every future lesson will include an explanation, worked example,
          common mistakes, quiz, and practice exercise. Educational calculators
          and simulations will remain clearly labeled as simulations.
        </p>
      </section>
    </section>
  );
}
