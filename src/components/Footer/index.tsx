import { Typography } from "@/app/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import LinkedIn from "./linkedin.svg";

const SocialLink = ({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: () => React.JSX.Element;
}) => (
  <Link href={href} className="flex items-center gap-2 w-100">
    <Icon />
    <Typography.Span>{label}</Typography.Span>
  </Link>
);

const WhatsAppSocial = () => (
  <SocialLink
    href="https://wa.me/5541997314223"
    label="+55 (41) 99731-4223"
    Icon={() => <LinkedIn width={24} height={24} alt="WhatsApp" />}
  />
);

const InstagramSocial = () => (
  <SocialLink
    href="https://instagram.com/lojhan.dev"
    label="@lojhan.dev"
    Icon={() => <LinkedIn width={24} height={24} alt="Instagram" />}
  />
);

const LinkedInSocial = () => (
  <SocialLink
    href="https://linkedin.com/in/lojhan"
    label="in/lojhan"
    Icon={() => <LinkedIn width={24} height={24} alt="LinkedIn" />}
  />
);

const GitHubSocial = () => (
  <SocialLink
    href="https://github.com/Lojhan"
    label="lojhan"
    Icon={() => <LinkedIn width={24} height={24} alt="GitHub" />}
  />
);

const BlueSkySocial = () => (
  <SocialLink
    href="https://bsky.app/profile/lojhan.com"
    label="@lojhan.com"
    Icon={() => <LinkedIn width={24} height={24} alt="BlueSky" />}
  />
);

export const Footer = () => {
  return (
    <footer
      className={cn(
        "place-self-center container grid py-12",
        "grid-cols-1 place-items-center gap-24",
        "md:grid-cols-2 md:place-items-center md:items-start md:gap-0",
      )}
    >
      <section
        className={cn("flex flex-col gap-4 flex-grow", "md:place-items-start")}
      >
        <section>
          <Typography.H1 className="text-keppel-green">
            VINICIUS LOJHAN
          </Typography.H1>
          <Typography.H6 className="text-light-font-color text-xs">
            Staff Software Engineer | Tech Lead | Consultant | Mentor
          </Typography.H6>
        </section>
        <section
          className={cn("flex flex-col gap-2 items-start place-items-start")}
        >
          <WhatsAppSocial />
          <BlueSkySocial />
          <InstagramSocial />
          <LinkedInSocial />
          <GitHubSocial />
        </section>
      </section>
      {/* <section>
        <Typography.H4 className="text-light-font-color">Contact</Typography.H4>
      </section> */}
      <section className="grid grid-cols-1 gap-6">
        <Typography.H4 className="text-light-font-color">
          Logo and branding by:
        </Typography.H4>
        <Link href="https://www.picolodesign.com.br/">
          <Image
            src="https://lh6.googleusercontent.com/V7TY3G3AzFMXZQg0wU7hEIMLLrxkbPNVfD_S6xdYhBWmRoaEf777yZ9KPadtsEKj_DzbzQR_uWuUa1MMFYSMVz4=w16383"
            alt="Logo Picolo Design"
            width={170}
            height={170}
          />
        </Link>
      </section>
    </footer>
  );
};
