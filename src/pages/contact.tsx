import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { sendContactEmail } from '../../lib/emailService';

const Contact = () => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    try {
      const result = await sendContactEmail(formData);
      if (result.success) {
        setStatus({
          type: 'success',
          message: t('contact.successMessage'),
        });
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setStatus({
          type: 'error',
          message: result.message,
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: t('contact.errorMessage'),
      });
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[40vh] bg-gradient-to-r from-primary-700 to-secondary-700 flex items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="heading-1 mb-4">{t('contact.title')}</h1>
            <p className="text-xl max-w-2xl mx-auto">{t('contact.subtitle')}</p>
          </motion.div>
        </section>
        {/* Contact Info & Form */}
        <section className="section bg-white">
          <div className="container grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="heading-2 mb-4">{t('contact.infoTitle')}</h2>
              <ul className="space-y-4 text-gray-700">
                <li><strong>{t('contact.address')}:</strong> {t('footer.address')}</li>
                <li><strong>{t('contact.phone')}:</strong> {t('footer.phone')}</li>
                <li><strong>{t('contact.email')}:</strong> {t('footer.email')}</li>
              </ul>
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '12px' }}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=29.1709642,40.0899221,29.1909642,40.1099221&layer=mapnik&marker=40.0999221,29.1809642"
                  title="Ganssi Location Map"
                />
              </div>
            </motion.div>
            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 rounded-lg shadow-lg p-6 space-y-4"
              onSubmit={handleSubmit}
            >
              <h3 className="heading-3 mb-2">{t('contact.formTitle')}</h3>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.formName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.formEmail')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.formMessage')}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
              {status.type && (
                <div
                  className={`p-4 rounded-md ${
                    status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}
                >
                  {status.message}
                </div>
              )}
              <button type="submit" className="w-full btn-primary">{t('contact.formSubmit')}</button>
            </motion.form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Contact;
