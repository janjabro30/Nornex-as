"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Building2,
  Star,
  Check,
  Phone,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PortfolioProject } from "@/lib/portfolio-data";

interface CaseStudyClientProps {
  project: PortfolioProject;
  relatedProjects: PortfolioProject[];
}

export default function CaseStudyClient({
  project,
  relatedProjects,
}: CaseStudyClientProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("nb-NO", {
      year: "numeric",
      month: "long",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link
            href="/portefolje"
            className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake til portefølje
          </Link>

          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0">
                {project.serviceName}
              </Badge>
              <Badge variant="secondary">{project.industry}</Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {project.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap gap-6 text-slate-300">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <span>{project.client}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(project.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{project.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 bg-white -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {project.results.map((result, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-3xl md:text-4xl font-bold text-green-600 mb-1">
                    {result.value}
                  </p>
                  <p className="text-sm text-gray-600">{result.metric}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Utfordringen
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {project.challenge}
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Løsningen
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Gjennomføring
            </h2>

            <div className="space-y-6">
              {project.implementation.map((phase, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {phase.phase}
                      </h3>
                      <Badge variant="secondary">{phase.duration}</Badge>
                    </div>
                    <p className="text-gray-600">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Detail Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Resultater
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.results.map((result, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600 mb-1">
                          {result.value}
                        </p>
                        <p className="font-medium text-gray-900">
                          {result.metric}
                        </p>
                        <p className="text-sm text-gray-600">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Teknologier brukt
            </h2>

            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white rounded-full shadow-sm text-gray-700 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {project.testimonial && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <CardContent className="pt-8 pb-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl italic mb-6 text-white/90">
                    &quot;{project.testimonial.content}&quot;
                  </blockquote>
                  <div>
                    <p className="font-semibold text-lg">
                      {project.testimonial.name}
                    </p>
                    <p className="text-slate-400">{project.testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects Section */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Lignende prosjekter
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.slug}
                  href={`/portefolje/${relatedProject.slug}`}
                >
                  <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer group">
                    <CardContent className="pt-6">
                      <Badge variant="secondary" className="mb-3">
                        {relatedProject.industry}
                      </Badge>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                        {relatedProject.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedProject.shortDescription}
                      </p>
                      <div className="flex items-center text-green-600 font-medium text-sm">
                        Les mer
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vil du oppnå lignende resultater?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontakt oss for en uforpliktende samtale om ditt prosjekt
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
              >
                Kontakt oss
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+4712345678">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Phone className="mr-2 w-5 h-5" />
                Ring oss
              </Button>
            </a>
          </div>

          {/* Address */}
          <div className="mt-12 flex items-center justify-center gap-2 text-white/80">
            <MapPin className="w-5 h-5" />
            <span>Brynsveien 18, 0667 Oslo, Norway</span>
          </div>
        </div>
      </section>
    </div>
  );
}
