import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import OrderForm from '../../components/OrderForm';
import OrderProcess from '../../components/OrderProcess';

const OrderPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[40vh] bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-secondary-900/80" />
          <div className="relative h-full flex items-center justify-center text-center text-white">
            <div className="container mx-auto px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="heading-1 mb-4"
              >
                {t('order.pageTitle')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl max-w-2xl mx-auto"
              >
                {t('order.pageDescription')}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Order Form Section */}
        <section className="section bg-gray-50">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-stretch min-h-[70vh]">
              {/* Order Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6 h-full flex flex-col flex-1"
              >
                <h2 className="heading-2">{t('order.infoTitle')}</h2>
                <div className="prose prose-lg">
                  <p>{t('order.infoDescription')}</p>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-500 text-xl">✓</span>
                      <span>{t('order.infoPoint1')}</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-500 text-xl">✓</span>
                      <span>{t('order.infoPoint2')}</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="text-primary-500 text-xl">✓</span>
                      <span>{t('order.infoPoint3')}</span>
                    </li>
                  </ul>
                </div>
                <OrderProcess />
              </motion.div>

              {/* Order Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="h-full flex flex-col flex-1"
              >
                <OrderForm />
              </motion.div>
            </div>
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

export default OrderPage;
