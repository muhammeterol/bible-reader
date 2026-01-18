export type Book = {
  slug: string;
  name: string;
  chapters: number;
  testament: "OT" | "NT";
};

export const BOOKS: Book[] = [
  { slug: "genesis", name: "Genesis", chapters: 50, testament: "OT" },
  { slug: "matthew", name: "Matthew", chapters: 28, testament: "NT" },
];

export function getBookBySlug(slug: string): Book | undefined {
  return BOOKS.find((b) => b.slug === slug);
}
