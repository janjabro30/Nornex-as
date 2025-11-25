"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useLanguage } from "@/hooks/useLanguage";
import { Card } from "@/components/ui";
import { Star, Quote } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  contentNo: string;
  contentEn: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Erik Hansen",
    company: "TechStart AS",
    role: "CEO",
    contentNo: "Nornex AS har transformert vår IT-infrastruktur. Deres 24/7 support og proaktive overvåking har redusert nedetiden vår med 90%. Fantastisk service!",
    contentEn: "Nornex AS has transformed our IT infrastructure. Their 24/7 support and proactive monitoring have reduced our downtime by 90%. Fantastic service!",
    rating: 5,
  },
  {
    id: "2",
    name: "Maria Olsen",
    company: "Nordic Finance",
    role: "IT Director",
    contentNo: "Den beste IT-partneren vi har hatt. Deres cybersikkerhetsløsninger beskytter oss mot moderne trusler, og teamet er alltid tilgjengelig når vi trenger dem.",
    contentEn: "The best IT partner we've had. Their cybersecurity solutions protect us against modern threats, and the team is always available when we need them.",
    rating: 5,
  },
  {
    id: "3",
    name: "Anders Berg",
    company: "Berg Consulting",
    role: "Managing Director",
    contentNo: "Migreringen til skyen ble håndtert perfekt. Nornex AS gjorde prosessen sømløs og vi ser allerede betydelige kostnadsbesparelser.",
    contentEn: "The cloud migration was handled perfectly. Nornex AS made the process seamless and we're already seeing significant cost savings.",
    rating: 5,
  },
  {
    id: "4",
    name: "Sofie Lindgren",
    company: "Design Studio Oslo",
    role: "Creative Director",
    contentNo: "Reparasjonen av våre Mac-maskiner var profesjonell og rask. Datainnhentingen reddet prosjektfilene våre. Tusen takk!",
    contentEn: "The repair of our Mac machines was professional and fast. The data recovery saved our project files. Thank you so much!",
    rating: 5,
  },
  {
    id: "5",
    name: "Thomas Nilsen",
    company: "Nilsen Logistics",
    role: "Operations Manager",
    contentNo: "Nettverksoppgraderingen har forbedret hastigheten og påliteligheten enormt. Nornex AS forstår virkelig våre forretningsbehov.",
    contentEn: "The network upgrade has improved speed and reliability enormously. Nornex AS truly understands our business needs.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const { language, t } = useLanguage();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-blue-50 to-purple-50" id="testimonials">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <Card className="h-full p-6 relative">
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-100" />
                  
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    &ldquo;{language === "no" ? testimonial.contentNo : testimonial.contentEn}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
