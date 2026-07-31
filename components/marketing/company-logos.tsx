import { SiGithub, SiGoogle, SiLinear, SiStripe, SiVercel } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { cn } from '@/lib/utils';

type CompanyLogo = {
  name: string;
  Icon?: IconType;
  src?: string;
  iconClassName?: string;
};

export const TRUSTED_BY_LOGOS: CompanyLogo[] = [
  { name: 'Vercel', Icon: SiVercel },
  { name: 'Stripe', Icon: SiStripe },
  { name: 'GitHub', Icon: SiGithub },
  { name: 'Linear', Icon: SiLinear },
  { name: 'Amazon', src: '/logos/amazon.svg', iconClassName: 'h-4 sm:h-[18px] md:h-5' },
  { name: 'Google', Icon: SiGoogle },
];

const defaultIconClass = 'h-5 w-auto sm:h-6 md:h-7';

export function CompanyLogoMark({ name, Icon, src, iconClassName }: CompanyLogo) {
  const className = cn(defaultIconClass, iconClassName);

  if (src) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden
        className={cn(className, 'opacity-35 dark:brightness-0 dark:invert')}
      />
    );
  }

  if (!Icon) return null;

  return <Icon className={className} aria-hidden />;
}

function LogoMarqueeStrip({ duplicate }: { duplicate?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-8 px-6 sm:gap-12 sm:px-10 md:gap-14"
      aria-hidden={duplicate}
    >
      <span className="whitespace-nowrap text-[11px] font-mono uppercase tracking-[0.2em] landing-muted sm:text-xs sm:tracking-[0.25em]">
        Trusted by engineers at
      </span>
      <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/20" aria-hidden />
      {TRUSTED_BY_LOGOS.map((logo) => (
        <div
          key={`${duplicate ? 'dup-' : ''}${logo.name}`}
          className="flex shrink-0 items-center landing-muted"
          aria-label={duplicate ? undefined : logo.name}
        >
          <CompanyLogoMark {...logo} />
        </div>
      ))}
      <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/20" aria-hidden />
    </div>
  );
}

export function LogoMarquee() {
  return (
    <div className="logo-marquee-track flex w-max">
      <LogoMarqueeStrip />
      <LogoMarqueeStrip duplicate />
    </div>
  );
}
