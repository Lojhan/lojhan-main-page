import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-beween p-24 gap-6">
      <h1 className="font-lojhan text-9xl flex-1">Lojhan</h1>
      <span className="flex-1">{"</>"}</span>
      <span className="font-sans">
        Software Development • Consulting • Training
      </span>
    </main>
  );
}

function Dot() {
  return <span className="">•</span>;
}
