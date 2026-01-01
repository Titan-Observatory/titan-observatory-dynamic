const WIDGET_URL =
  "https://www.gofundme.com/f/help-build-titan-observatory-for-student-science/widget/medium?sharesheet=undefined&attribution_id=sl:e9f624ba-2f25-49c0-9786-cab56d206ade";

export default function GofundmeEmbed() {
  return (
    <div className="mx-auto w-full max-w-[420px]">
      <iframe
        title="GoFundMe donation widget"
        src={WIDGET_URL}
        width="100%"
        scrolling="no"
        loading="lazy"
        frameBorder={0}
        allow="payment *; clipboard-write *"
        className="w-full rounded-2xl border border-titan-border/40 shadow-sm h-[220px] sm:h-[208px] md:h-[195px] lg:h-[183px] xl:h-[170px]"
      />
    </div>
  );
}
