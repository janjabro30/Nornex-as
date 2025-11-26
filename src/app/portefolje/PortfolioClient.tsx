"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter, Briefcase, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PortfolioProject } from "@/lib/portfolio-data";

interface PortfolioClientProps {
  projects: PortfolioProject[];
  featuredProjects: PortfolioProject[];
}

type FilterType = "all" | "it" | "development";

export default function PortfolioClient({
  projects,
  featuredProjects,
}: PortfolioClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const totalPages = Math.ceil(filteredProjects.length / perPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const filters: { value: FilterType; label: string; icon: React.ElementType }[] = [
    { value: "all", label: "Alle", icon: Filter },
    { value: "it", label: "IT-tjenester", icon: Briefcase },
    { value: "development", label: "Utvikling", icon: Code },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white mb-4 border-0">
            Portefølje
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Våre prosjekter
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Se hvordan vi har hjulpet bedrifter med IT-drift, sikkerhet,
            webutvikling og mer. Hver suksesshistorie er bevis på vår ekspertise.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Utvalgte prosjekter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.slice(0, 3).map((project) => (
                <Link
                  key={project.slug}
                  href={`/portefolje/${project.slug}`}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer group overflow-hidden">
                    {/* Gradient header */}
                    <div className="h-2 bg-gradient-to-r from-emerald-500 to-cyan-500" />
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="secondary">{project.industry}</Badge>
                        <Badge
                          className={
                            project.category === "it"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }
                        >
                          {project.category === "it"
                            ? "IT-tjenester"
                            : "Utvikling"}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {project.shortDescription}
                      </p>

                      {/* Results preview */}
                      {project.results.slice(0, 2).length > 0 && (
                        <div className="flex gap-4 mb-4">
                          {project.results.slice(0, 2).map((result, idx) => (
                            <div key={idx} className="text-center">
                              <p className="text-2xl font-bold text-green-600">
                                {result.value}
                              </p>
                              <p className="text-xs text-gray-500">
                                {result.metric}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

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

      {/* All Projects with Filter */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Alle prosjekter
            </h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={activeFilter === filter.value ? "default" : "outline"}
                  onClick={() => {
                    setActiveFilter(filter.value);
                    setCurrentPage(1);
                  }}
                  className={
                    activeFilter === filter.value
                      ? "bg-green-600 hover:bg-green-700"
                      : ""
                  }
                >
                  <filter.icon className="w-4 h-4 mr-2" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map((project) => (
              <Link key={project.slug} href={`/portefolje/${project.slug}`}>
                <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {project.serviceName}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.shortDescription}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center text-green-600 font-medium text-sm">
                      Se prosjekt
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Forrige
              </Button>
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, idx) => (
                  <Button
                    key={idx}
                    variant={currentPage === idx + 1 ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(idx + 1)}
                    className={
                      currentPage === idx + 1
                        ? "bg-green-600 hover:bg-green-700"
                        : ""
                    }
                  >
                    {idx + 1}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Neste
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Klar for ditt eget suksessprosjekt?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            La oss diskutere hvordan vi kan hjelpe din bedrift med å nå sine mål
          </p>
          <Link href="/kontakt">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
            >
              Kontakt oss
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
