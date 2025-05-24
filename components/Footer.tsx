import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import Image from 'next/image';
import { useState } from 'react';
import { sendNewsletterEmail } from '../lib/emailService';

const Footer = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNewsletterStatus({ type: null, message: '' });
    try {
      const result = await sendNewsletterEmail(newsletterEmail);
      if (result.success) {
        setNewsletterStatus({ type: 'success', message: t('footer.newsletterSuccess') });
        setNewsletterEmail('');
      } else {
        setNewsletterStatus({ type: 'error', message: t('footer.newsletterError') });
      }
    } catch {
      setNewsletterStatus({ type: 'error', message: t('footer.newsletterError') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: FiInstagram, href: 'https://instagram.com/ganssi', label: 'Instagram' },
    { icon: FiFacebook, href: 'https://facebook.com/ganssi', label: 'Facebook' },
    { icon: FiTwitter, href: 'https://twitter.com/ganssi', label: 'Twitter' },
  ];

  const footerLinks = [
    { href: '/about', label: t('nav.about') },
    { href: '/products', label: t('nav.products') },
    { href: '/order', label: t('nav.order') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/ganssi_logo.png"
                alt="Ganssi Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
                priority
              />
              <h3 className="text-2xl font-display font-bold gradient-text">Ganssi</h3>
            </div>
            <p className="text-gray-400">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <FiMapPin className="w-5 h-5" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FiPhone className="w-5 h-5" />
                <span>{t('footer.phone')}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FiMail className="w-5 h-5" />
                <span>{t('footer.email')}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.newsletter')}</h4>
            <p className="text-gray-400 mb-4">{t('footer.newsletterDescription')}</p>
            <form className="space-y-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder')}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary-500"
                required
              />
              {newsletterStatus.type && (
                <div
                  className={`p-2 rounded-md text-sm mb-2 ${
                    newsletterStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}
                >
                  {newsletterStatus.message}
                </div>
              )}
              <button
                type="submit"
                className="w-full btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('footer.submitting') : t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            © {currentYear} Ganssi. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
