import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const About = () => {
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
            <h1 className="heading-1 mb-4">{t('about.title')}</h1>
            <p className="text-xl max-w-2xl mx-auto">{t('about.subtitle')}</p>
          </motion.div>
        </section>
        {/* Company Story & Mission */}
        <section className="section bg-white">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-2 mb-4">{t('about.ourStoryTitle')}</h2>
              <p className="paragraph mb-6">{t('about.ourStory')}</p>
              <h3 className="heading-3 mb-2">{t('about.missionTitle')}</h3>
              <p className="paragraph">{t('about.mission')}</p>
            </motion.div>
            <motion.img
              src="/images/farm.jpg"
              alt="Ganssi Farm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-lg shadow-lg w-full object-cover h-80"
            />
          </div>
        </section>
        {/* Location & Practices */}
        <section className="section bg-gray-50">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <motion.img
              src="/images/uludag.jpg"
              alt="Uludağ Mountain"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-lg shadow-lg w-full object-cover h-80"
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="heading-3 mb-2">{t('about.locationTitle')}</h3>
              <p className="paragraph mb-6">{t('about.location')}</p>
              <h3 className="heading-3 mb-2">{t('about.practicesTitle')}</h3>
              <p className="paragraph">{t('about.practices')}</p>
            </motion.div>
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

export default About;
