import { Link } from "react-router-dom";
export default function NotFound(){return <main className="container flex min-h-[70vh] flex-col items-center justify-center text-center"><div className="eyebrow">404 / PAGE NOT FOUND</div><h1 className="serif mt-4 text-5xl">This page isn’t here.</h1><Link to="/" className="gold-button mt-8">Return home</Link></main>}
