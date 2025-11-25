'use client';

import Link from 'next/link';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

interface BlogPost {
  slug: string;
  titleNo: string;
  titleEn: string;
  excerptNo: string;
  excerptEn: string;
  author: string;
  publishedAt: string;
  tags: { slug: string; nameNo: string; nameEn: string }[];
}

const blogPosts: BlogPost[] = [
  {
    slug: '5-tegn-du-trenger-managed-it',
    titleNo: '5 Tegn På At Bedriften Din Trenger Managed IT',
    titleEn: '5 Signs Your Business Needs Managed IT',
    excerptNo: 'Hvordan vet du når det er på tide å outsource IT-driften? Her er fem klare tegn på at bedriften din kan dra nytte av profesjonell IT-støtte.',
    excerptEn: "How do you know when it's time to outsource IT operations? Here are five clear signs that your business could benefit from professional IT support.",
    author: 'Erik Hansen',
    publishedAt: '2024-01-15',
    tags: [{ slug: 'msp', nameNo: 'Managed Services', nameEn: 'Managed Services' }],
  },
  {
    slug: 'gdpr-sjekkliste-for-sma-bedrifter',
    titleNo: 'GDPR-sjekkliste For Små og Mellomstore Bedrifter',
    titleEn: 'GDPR Checklist For Small and Medium Businesses',
    excerptNo: 'GDPR gjelder alle som behandler personopplysninger. Her er en praktisk sjekkliste for å sikre at din bedrift er compliant.',
    excerptEn: 'GDPR applies to everyone who processes personal data. Here is a practical checklist to ensure your business is compliant.',
    author: 'Erik Hansen',
    publishedAt: '2024-01-22',
    tags: [
      { slug: 'gdpr', nameNo: 'GDPR', nameEn: 'GDPR' },
      { slug: 'sikkerhet', nameNo: 'Sikkerhet', nameEn: 'Security' },
    ],
  },
  {
    slug: 'sikker-fjernarbeid-guide',
    titleNo: 'Guide: Sikker Fjernarbeid for Bedrifter',
    titleEn: 'Guide: Secure Remote Work for Businesses',
    excerptNo: 'Hybridarbeid er kommet for å bli. Her er våre anbefalinger for å sikre bedriften når ansatte jobber hjemmefra.',
    excerptEn: "Hybrid work is here to stay. Here are our recommendations for securing your business when employees work from home.",
    author: 'Admin Nornex',
    publishedAt: '2024-02-05',
    tags: [
      { slug: 'sikkerhet', nameNo: 'Sikkerhet', nameEn: 'Security' },
      { slug: 'produktivitet', nameNo: 'Produktivitet', nameEn: 'Productivity' },
    ],
  },
];

const allTags = [
  { slug: 'sikkerhet', nameNo: 'Sikkerhet', nameEn: 'Security' },
  { slug: 'sky', nameNo: 'Sky', nameEn: 'Cloud' },
  { slug: 'produktivitet', nameNo: 'Produktivitet', nameEn: 'Productivity' },
  { slug: 'gdpr', nameNo: 'GDPR', nameEn: 'GDPR' },
  { slug: 'msp', nameNo: 'Managed Services', nameEn: 'Managed Services' },
];

export default function BloggPage() {
  const { language, t } = useLanguage();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'nb-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {t.blog.title}
          </h1>
          <p className="text-lg text-muted-foreground">{t.blog.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-3 space-y-6">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    <Link href={`/blogg/${post.slug}`}>
                      {language === 'en' ? post.titleEn : post.titleNo}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {language === 'en' ? post.excerptEn : post.excerptNo}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.slug}
                          className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                        >
                          <Tag className="h-3 w-3" />
                          {language === 'en' ? tag.nameEn : tag.nameNo}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blogg/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      {t.blog.readMore}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t.blog.tags}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/blogg?tag=${tag.slug}`}
                      className="inline-flex items-center gap-1 bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <Tag className="h-3 w-3" />
                      {language === 'en' ? tag.nameEn : tag.nameNo}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter CTA */}
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg">{t.footer.newsletter.title}</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  {language === 'en'
                    ? 'Get IT tips and news directly to your inbox.'
                    : 'Få IT-tips og nyheter direkte i innboksen.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/kontakt">{t.footer.newsletter.subscribe}</Link>
                </Button>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {language === 'en' ? 'Need IT help?' : 'Trenger du IT-hjelp?'}
                </CardTitle>
                <CardDescription>
                  {language === 'en'
                    ? 'Contact us for a non-binding conversation.'
                    : 'Ta kontakt for en uforpliktende samtale.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/kontakt">
                    {t.hero.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
