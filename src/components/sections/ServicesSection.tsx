"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "@/components/ui";
import {
  Monitor,
  Shield,
  Cloud,
  Headphones,
  Network,
  Wrench,
  ArrowRight,
} from "lucide-react";

const serviceIcons = {
  managedIt: Monitor,
  cybersecurity: Shield,
  cloud: Cloud,
  support: Headphones,
  network: Network,
  repair: Wrench,
};

const serviceColors = {
  managedIt: "from-blue-500 to-blue-600",
  cybersecurity: "from-red-500 to-orange-500",
  cloud: "from-cyan-500 to-blue-500",
  support: "from-green-500 to-emerald-500",
  network: "from-purple-500 to-violet-500",
  repair: "from-amber-500 to-orange-500",
};

const serviceHrefs = {
  managedIt: "/services/managed-it",
  cybersecurity: "/services/cybersecurity",
  cloud: "/services/cloud",
  support: "/services/support",
  network: "/services/network",
  repair: "/services/repair",
};

export function ServicesSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    "managedIt",
    "cybersecurity",
    "cloud",
    "support",
    "network",
    "repair",
  ] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={ref} className="py-24 bg-gray-50" id="services">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((serviceKey) => {
            const Icon = serviceIcons[serviceKey];
            const serviceData = t.services[serviceKey];
            const colorClass = serviceColors[serviceKey];
            const href = serviceHrefs[serviceKey];

            return (
              <motion.div key={serviceKey} variants={itemVariants}>
                <Card hover3d className="h-full group cursor-pointer">
                  <CardHeader>
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-4 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </motion.div>
                    <CardTitle className="text-xl">{serviceData.title}</CardTitle>
                    <CardDescription className="text-base">
                      {serviceData.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href={href}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 group"
                    >
                      {t.services.learnMore}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button variant="outline" size="lg">
              {t.services.viewAll}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
