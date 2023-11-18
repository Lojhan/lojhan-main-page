export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24 gap-6">
      <h1 className="font-lojhan text-9xl text-gray-300">Lojhan</h1>
      <span className="text-gray-300">{"</>"}</span>
      <span className="font-sans text-center text-sm text-gray-300">Coming soon</span>
    </main>
  );
}

function Dot() {
  return <span className="">•</span>;
}
