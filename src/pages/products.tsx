import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaLeaf, FaCheckCircle, FaCertificate } from 'react-icons/fa';

const products = [
  {
    key: 'wholeGoose',
    image: '/images/whole_goose.jpg',
  },
  {
    key: 'gooseBreast',
    image: '/images/goose_breast.jpg',
  },
  {
    key: 'gooseLeg',
    image: '/images/goose_legs.jpg',
  },
];

const Products = () => {
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
            <h1 className="heading-1 mb-4">{t('products.title')}</h1>
            <p className="text-xl max-w-2xl mx-auto">{t('products.subtitle')}</p>
          </motion.div>
        </section>
        {/* Product Cards */}
        <section className="section bg-white">
          <div className="container grid md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="bg-gray-50 rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
              >
                <img src={product.image} alt={t(`products.${product.key}.title`)} className="w-full h-48 object-cover rounded mb-4" />
                <h3 className="heading-3 mb-2">{t(`products.${product.key}.title`)}</h3>
                <p className="paragraph mb-2">{t(`products.${product.key}.desc`)}</p>
                <span className="text-sm text-primary-600 font-semibold">{t(`products.${product.key}.packaging`)}</span>
              </motion.div>
            ))}
          </div>
        </section>
        {/* Certifications & Quality */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-start"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <FaCertificate className="text-green-500" /> {t('products.certificationsTitle')}
              </h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-center gap-2">
                  <FaLeaf className="text-green-600" />
                  <span><span className="font-semibold text-green-700">{t('products.cert1Highlight')}</span> {t('products.cert1Rest')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-600" />
                  <span><span className="font-semibold text-blue-700">{t('products.cert2Highlight')}</span> {t('products.cert2Rest')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-yellow-600" />
                  <span><span className="font-semibold text-yellow-700">{t('products.cert3Highlight')}</span> {t('products.cert3Rest')}</span>
                </li>
              </ul>
            </motion.div>
            {/* Quality Standards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-3xl font-bold mb-6">{t('products.qualityTitle')}</h2>
              <p className="text-lg mb-4">{t('products.qualityDesc')}</p>
              <p className="text-lg text-green-700 font-medium">{t('products.qualityDesc2')}</p>
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

export default Products;
