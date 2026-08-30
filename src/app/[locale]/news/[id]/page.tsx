import { setRequestLocale } from "next-intl/server";
import ArticleDetailContent from "@/components/sections/article-detail-content";
import { ARTICLES_MAP } from "@/data/newsArticles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const article = ARTICLES_MAP[id] || ARTICLES_MAP["guest-house-rental-tozeur"];
  return {
    title: `${article ? article.title : "Article"} | Darbook News`,
    description: article ? article.subtitle : "Read the latest news and guides on Darbook.",
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return <ArticleDetailContent articleId={id} />;
}
