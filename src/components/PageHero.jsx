export default function PageHero({ eyebrow, title, highlight, description }) {
  return (
    <section className="hero-bg border-b border-white/10 py-12 sm:py-20">
      <div className="container">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="serif mt-4 sm:mt-5 max-w-4xl text-3xl sm:text-5xl md:text-6xl leading-tight font-bold text-white">
          {title} {highlight && <span className="gold-text italic block sm:inline">{highlight}</span>}
        </h1>
        {description && (
          <p className="mt-4 sm:mt-6 max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-[#aaa59b]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
