"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import toast from "react-hot-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { Button, Input, Textarea, Select, Card } from "@/components/ui";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export function ContactSection() {
  const { language, t } = useLanguage();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const services = [
    { value: "", label: t.contact.form.service },
    { value: "managed-it", label: t.services.managedIt.title },
    { value: "cybersecurity", label: t.services.cybersecurity.title },
    { value: "cloud", label: t.services.cloud.title },
    { value: "support", label: t.services.support.title },
    { value: "network", label: t.services.network.title },
    { value: "repair", label: t.services.repair.title },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast.success(t.contact.form.success);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      label: t.contact.info.address,
      value: "Storgata 1, 0155 Oslo, Norge",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: t.contact.info.phone,
      value: "+47 22 00 00 00",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      label: t.contact.info.email,
      value: "kontakt@nornex.no",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      label: t.contact.info.hours,
      value: t.contact.info.hoursValue,
      extra: t.contact.info.support24,
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-white" id="contact">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t.contact.form.name}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label={t.contact.form.email}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t.contact.form.phone}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <Input
                    label={t.contact.form.company}
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <Select
                  label={t.contact.form.service}
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  options={services}
                />
                <Textarea
                  label={t.contact.form.message}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
                <Button type="submit" className="w-full" isLoading={isSubmitting}>
                  {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
                  {!isSubmitting && <Send className="h-5 w-5 ml-2" />}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Card className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {info.label}
                    </h3>
                    <p className="text-gray-600">{info.value}</p>
                    {info.extra && (
                      <p className="text-green-600 text-sm mt-1 font-medium">
                        {info.extra}
                      </p>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <Card className="p-0 overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000.0!2d10.7522!3d59.9139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTnCsDU0JzUwLjAiTiAxMMKwNDUnMDcuOSJF!5e0!3m2!1sen!2sno!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={language === "no" ? "Nornex AS lokasjon" : "Nornex AS location"}
                />
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
