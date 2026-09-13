import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[40rem] px-5 py-28 text-center sm:px-8">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-tight text-ink">
        We couldn't find that page
      </h1>
      <p className="mt-6 leading-relaxed text-ink-soft">
        It may have moved, or the link may be out of date. The whole collection
        is still right here.
      </p>
      <Link href="/shop" className="btn btn-solid mt-10">
        Browse the collection
      </Link>
    </div>
  );
}
