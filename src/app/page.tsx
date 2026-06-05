"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { getNewsArticles, type GetNewsArticlesOutput } from "@/ai/flows/get-news-articles";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Phone } from "lucide-react";

export default function NewsFeedPage() {
  const [articles, setArticles] = useState<GetNewsArticlesOutput>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const newsArticles = await getNewsArticles();
        setArticles(newsArticles);
      } catch (error) {
        console.error("Failed to fetch news articles:", error);
        // Optionally, set some error state to show in the UI
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);


  return (
    <>
    <Header />
    <main className="flex-1 pt-16">
      <section className="py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Your Source for a Cleaner Tomorrow
            </h1>
            <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
              Stay informed about the latest news in recycling, waste reduction, and environmental protection.
            </p>
          </div>
      </section>

      <section className="py-8">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-start gap-4 p-4 rounded-lg border border-destructive/50 bg-destructive/5">
              <div className="bg-destructive/10 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-destructive">Urgent Delays? Call Us</h3>
                <p className="text-muted-foreground">For immediate assistance with collection delays.</p>
                <div className="flex items-center gap-4 mt-2">
                  <a href="tel:0714683849" className="text-lg font-semibold text-foreground">
                    071 468 3849
                  </a>
                  <Button asChild>
                    <a href="tel:0714683849">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4 pb-12 md:pb-24">
        <div className="container grid gap-8 px-4 md:px-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter">Latest News</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
              {loading && Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="flex flex-col overflow-hidden">
                  <Skeleton className="h-56 w-full" />
                  <CardHeader>
                     <Skeleton className="h-4 w-24" />
                     <Skeleton className="h-6 w-4/5 mt-2" />
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2">
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                  <CardFooter>
                     <Skeleton className="h-4 w-20" />
                  </CardFooter>
                </Card>
              ))}
              {!loading && articles.map((article) => (
                <Card key={article.id} className="flex flex-col overflow-hidden">
                    <div className="relative h-56 w-full">
                       <Image
                          src={`https://picsum.photos/seed/${article.id}/600/400`}
                          alt={article.title}
                          data-ai-hint={article.imagePrompt}
                          fill
                          className="object-cover"
                        />
                    </div>
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                       <Badge variant="outline">{article.category}</Badge>
                       <time dateTime={article.date}>{new Date(article.date).toLocaleDateString()}</time>
                    </div>
                    <CardTitle className="mt-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{article.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="link" className="p-0 h-auto">
                      <Link href="#">
                        Read More
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
        </div>
      </section>
      </main>
      </>
  );
}
