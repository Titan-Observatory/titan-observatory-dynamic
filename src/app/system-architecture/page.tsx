import type { Metadata } from "next";
import DiagramViewer from "./DiagramViewer";

export const metadata: Metadata = {
  title: "System Architecture | Titan Observatory",
  description: "System architecture diagrams and documentation.",
};

export default function SystemArchitecturePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-titan-text-secondary">System Architecture</h1>
        <p className="text-base leading-relaxed text-titan-text-primary/90">
          This is an early draft of our telescope control and data system architecture; it will evolve as we build and gather feedback.
        </p>
        <p className="text-base leading-relaxed text-titan-text-primary/90">
          We’ll publish the services on GitHub under an open-source license. If you want to dig into the details or contribute improvements, you’ll be able to browse the code and open pull requests.
        </p>
      </header>

      <DiagramViewer />

      <section className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-titan-text-primary/90">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-titan-text-secondary">Overview</h3>
          <p>
          The control system for the Titan Observatory will be built to let remote users run observations and collect data without worrying about what is happening under the hood. At the center of everything is the Observation Control Service (OCS), the brain of the telescope. It takes observation requests from users, keeps track of what is scheduled, and makes sure every part of the telescope and data pipeline works together smoothly.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-titan-text-secondary">How a request runs</h3>
          <p>
            When a user logs into the observatory website and submits an observation, the OCS checks the request and adds it to the queue. From there, the OCS orchestrates the commands that each subsystem needs to execute for that observation. For example, it might first tell the Telescope Control Service (TCS) to point at the galactic center and begin tracking. The TCS translates that high-level command into explicit instructions the motors understand, while continuously monitoring pointing accuracy.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-titan-text-secondary">Data handling</h3>
          <p>
            Data collected from the telescope moves through a processing pipeline that checks data quality and then writes results to the local storage array for rapid access. The system also keeps detailed records of observations and metadata, and maintains backups, so data is robust and well-documented.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-titan-text-secondary">Monitoring and safety</h3>
          <p>
            Environmental sensors feed real-time information on weather and site conditions, while specialized services watch equipment health and performance. All of these pieces report back to the Monitoring and Safety service, which continuously looks for abnormalities and can lock out systems to avoid dangerous situations, even without anyone on site.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-titan-text-secondary">Outcome</h3>
          <p>
            This setup makes it possible for people anywhere to schedule and run their own radio astronomy observations while the hardware coordination and data management happen behind the scenes.
          </p>
        </div>
      </section>
    </div>
  );
}
