import { cn } from "@/lib/utils";
import { Lato, Outfit } from "next/font/google";

/**
OUTFIT

Como fonte padrão de comunicação da marca, a escolhida
foi a OUTFIT, por ter um design moderno, mas sem
comprometer a legibilidade.

*/
export const OUTFIT = Outfit({ subsets: ["latin"], preload: true });
/**
Lato

Escolhida para a escrita de parágrafos e textos, a Lato
Regular, traz um design elegante, minimalista e de fácil
leitura.
*/
export const LATO = Lato({
  subsets: ["latin"],
  preload: true,
  weight: ["100", "300", "400", "700", "900"],
});

type Props = React.PropsWithChildren<{ className?: string }>;

export const Typography = {
  H1: (props: Props) => (
    <h1
      style={OUTFIT.style}
      {...props}
      className={cn("text-3xl", props.className)}
    />
  ),
  H2: (props: Props) => (
    <h2
      style={OUTFIT.style}
      {...props}
      className={cn("text-2xl", props.className)}
    />
  ),
  H3: (props: Props) => (
    <h3
      style={LATO.style}
      {...props}
      className={cn("text-xl", props.className)}
    />
  ),
  H4: (props: Props) => (
    <h4
      style={LATO.style}
      {...props}
      className={cn("text-lg", props.className)}
    />
  ),
  H5: (props: Props) => <h5 style={LATO.style} {...props} />,
  H6: (props: Props) => <h6 style={LATO.style} {...props} />,
  Span: (props: Props) => <span style={LATO.style} {...props} />,
  P: (props: Props) => <p style={LATO.style} {...props} />,
};
