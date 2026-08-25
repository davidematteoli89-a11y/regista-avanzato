import Link from "next/link";
import { StoryCopyrightNotice } from "@/components/public/StoryCopyrightNotice";
import { StoryGrid } from "@/components/public/StoryGrid";
import { getPublicStories } from "@/lib/storyLibrary/getPublicStories";
export default async function StoriesPage() { const data = await getPublicStories(); return <main className="stack"><header><span className="eyebrow">Story Library</span><h1>Storie di calcio, connessioni e memoria</h1><p>Racconti originali o rielaborati, pubblicati soltanto dopo revisione editoriale.</p><nav className="section-nav"><Link href="/storie/categorie">Categorie</Link><Link href="/storie/fonti">Come gestiamo le fonti</Link></nav></header><StoryCopyrightNotice /><StoryGrid stories={data.items} /><p className="notice">{data.message} La navigazione non consuma ricerche avanzate.</p></main>; }
