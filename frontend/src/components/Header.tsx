import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="w-full bg-red-400 h-32">
        <h1 className="text-white font-sans text-center p-4 text-3xl">Checkpoint : frontend</h1>
        <h2 className="text-white font-sans text-center p-4 text-xl"><Link href="/">Countries</Link></h2>
      </div>

    </header>
  );
}
