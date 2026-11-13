export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="serif mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-2.5 sm:mt-3 max-w-2xl text-xs sm:text-sm leading-5 sm:leading-6 text-[#969086]">
          {description}
        </p>
      )}
    </div>
  );
}
