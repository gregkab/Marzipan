import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPolicy, getPolicySlugs } from "@/lib/policies";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPolicySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return { title: "Not found" };
  return { title: policy.title, description: policy.intro };
}

export default async function PolicyPage({ params }: Params) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <article className="mx-auto max-w-[44rem] px-5 py-16 sm:px-8">
      <p className="eyebrow eyebrow-line">Information</p>
      <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-tight text-ink">
        {policy.title}
      </h1>
      <p className="specimen mt-4">Last updated {policy.updated}</p>
      <p className="mt-8 text-lg leading-relaxed text-ink-soft">
        {policy.intro}
      </p>

      <div className="prose-marlipan mt-4">
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
