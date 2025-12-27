export const metadata = {
  title: "Project Updates | Titan Observatory",
  description: "Latest project updates from the Titan Observatory community.",
};

const embedScript = `
  var DiscourseEmbed = {
    discourseUrl: 'https://community.titanobservatory.org/',
    topicId: 47
  };
  (function() {
    var d = document.createElement('script'); d.type = 'text/javascript'; d.async = true;
    d.src = DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d);
  })();
`;

export default function ProjectUpdatesPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-titan-text-muted">Community</p>
        <h1 className="text-3xl font-semibold tracking-tight text-titan-text-primary sm:text-4xl">
          Project Updates
        </h1>
        <p className="max-w-2xl text-base text-titan-text-muted">
          Live updates from the Titan Observatory community forum. Click through to join the
          conversation.
        </p>
      </header>

      <div id="discourse-comments"></div>
      <meta name="discourse-username" content="system" />
      <script dangerouslySetInnerHTML={{ __html: embedScript }} />
      <style
        // Ensure the iframe can expand and fit content
        dangerouslySetInnerHTML={{
          __html: `
          #discourse-comments iframe {
            width: 100% !important;
            min-height: 1200px;
            border: 0;
          }
        `,
        }}
      />
    </section>
  );
}
