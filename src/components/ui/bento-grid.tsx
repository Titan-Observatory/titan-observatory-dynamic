import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between gap-4 rounded-3xl border border-titan-border/60 bg-titan-bg-alt/85 p-5 shadow-[0_18px_40px_-30px_rgba(8,12,24,0.9)] backdrop-blur-sm",
        className,
      )}
    >
      {header}
      <div>
        {icon}
        <div className="mt-2 mb-2 font-sans font-semibold text-titan-text-secondary">
          {title}
        </div>
        <div className="font-sans text-sm font-normal text-titan-text-primary/80">
          {description}
        </div>
      </div>
    </div>
  );
};
