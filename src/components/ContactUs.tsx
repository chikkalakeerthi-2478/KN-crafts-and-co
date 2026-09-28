import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Clock, Instagram, Youtube } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Question',
          message: '',
        });
      }, 4000);
    }, 600);
  };

  return (
    <section id="contact" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#A4604E]">
          Get in Touch
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C2420]">
          We’d Love to Hear From You
        </h2>
        <p className="text-sm sm:text-base text-[#6B5A52]">
          Have an inquiry about wholesale favors, custom bouquet colors, or studio workshops?
          Drop us a note or send a friendly WhatsApp text.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-white border border-[#E8DFD8] shadow-2xs space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#2C2420]">
              Studio Information
            </h3>

            <div className="space-y-3 text-xs text-[#5F524A]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#FAF0EC] text-[#D97C65] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#2C2420] font-semibold">Studio Workshop</strong>
                  <span>Suite 4B, The Old Mill Craft Quarter, Blossom Lane</span>
                  <span className="block text-[#8E7E76]">(Visits & pickups by appointment)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#EDF4EE] text-[#5F856C] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#2C2420] font-semibold">Email Us</strong>
                  <a
                    href="mailto:hello@twistandbloomstudio.com"
                    className="hover:text-[#D97C65] transition-colors"
                  >
                    hello@twistandbloomstudio.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#F2F0F9] text-[#8B81B3] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#2C2420] font-semibold">Studio Hours</strong>
                  <span>Mon – Sat: 9:00 AM – 6:30 PM</span>
                  <span className="block text-[#8E7E76]">Average response time &lt; 2 hours</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-3 border-t border-[#F0E8E1]">
              <a
                href="https://wa.me/?text=Hello%20Maya!%20I'm%20reaching%20out%20from%20the%20Twist%20%26%20Bloom%20website%20regarding%20handmade%20crafts."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-[#234A31] bg-[#E8F3EB] hover:bg-[#D9EBDE] border border-[#C5DDCB] transition-all shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 text-[#2E553B]" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8DFD8] shadow-2xs flex items-center justify-between">
            <span className="text-xs font-semibold text-[#2C2420]">
              Follow Studio Craft Journey:
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F3EBE4] text-[#5F524A] hover:text-[#D97C65] transition-colors"
                aria-label="Twist & Bloom on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#F3EBE4] text-[#5F524A] hover:text-[#D97C65] transition-colors"
                aria-label="Twist & Bloom on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8DFD8] shadow-2xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#487352] mx-auto" />
                <h3 className="text-xl font-serif font-bold text-[#2C2420]">
                  Message Sent With Love!
                </h3>
                <p className="text-xs sm:text-sm text-[#685850] max-w-md mx-auto">
                  Thank you for reaching out. Maya will review your message and reply via email or WhatsApp shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5F524A] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5F524A] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="eleanor@example.com"
                      className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#5F524A] mb-1">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5F524A] mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                    >
                      <option value="General Question">General Question</option>
                      <option value="Bulk / Wedding Favors">Bulk / Wedding Favors</option>
                      <option value="Custom Urgent Order">Custom Urgent Order</option>
                      <option value="Collaboration / Workshop">Collaboration / Workshop</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5F524A] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you'd like to ask or create..."
                    className="w-full p-3 text-xs border border-[#DDD3CB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D97C65]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-semibold text-white bg-[#D97C65] hover:bg-[#C66B54] transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
