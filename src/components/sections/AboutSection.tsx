"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/hooks/useLanguage";
import { useCountUp } from "@/hooks/useAnimations";
import { Button } from "@/components/ui";
import { Users, Clock, Zap, Award, CheckCircle } from "lucide-react";

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  inView: boolean;
}

function StatCard({ value, suffix, label, icon, inView }: StatCardProps) {
  const { count, startCounting, isActive } = useCountUp(value, 2000);

  React.useEffect(() => {
    if (inView && !isActive) {
      startCounting();
    }
  }, [inView, startCounting, isActive]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="text-center p-6 rounded-2xl bg-white shadow-lg border border-gray-100"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 text-blue-600 mb-4">
        {icon}
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  );
}

export function AboutSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const stats = [
    {
      value: 100,
      suffix: "+",
      label: t.about.stats.clients,
      icon: <Users className="h-6 w-6" />,
    },
    {
      value: 99,
      suffix: "%",
      label: t.about.stats.uptime,
      icon: <Zap className="h-6 w-6" />,
    },
    {
      value: 15,
      suffix: "min",
      label: t.about.stats.support,
      icon: <Clock className="h-6 w-6" />,
    },
    {
      value: 10,
      suffix: "+",
      label: t.about.stats.experience,
      icon: <Award className="h-6 w-6" />,
    },
  ];

  const features = [
    "Microsoft Gold Partner",
    "ISO 27001 Certified",
    "GDPR Compliant",
    "24/7 Support Available",
    "Norwegian-Based Team",
    "Custom Solutions",
  ];

  return (
    <section ref={ref} className="py-24 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.about.title}
            </h2>
            <p className="text-xl text-blue-600 font-medium mb-6">
              {t.about.subtitle}
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {t.about.description}
            </p>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </motion.div>
              ))}
            </div>

            <Button size="lg">
              {t.nav.contact}
            </Button>
          </motion.div>

          {/* Right Side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <StatCard {...stat} inView={inView} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
