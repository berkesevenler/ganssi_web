import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Contact = () => {
  const { t } = useTranslation('common');
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
                [Map Placeholder]
              </div>
            </motion.div>
            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 rounded-lg shadow-lg p-6 space-y-4"
              onSubmit={e => e.preventDefault()}
            >
              <h3 className="heading-3 mb-2">{t('contact.formTitle')}</h3>
              <input type="text" placeholder={t('contact.formName')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required />
              <input type="email" placeholder={t('contact.formEmail')} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required />
              <textarea placeholder={t('contact.formMessage')} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required />
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
