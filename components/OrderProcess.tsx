import { useTranslation } from 'next-i18next';
import { FaCheckCircle, FaClipboardList, FaBoxOpen, FaTruck, FaHome } from 'react-icons/fa';

export default function OrderProcess() {
  const { t } = useTranslation('common');
  const orderSteps = [
    {
      icon: <FaClipboardList className="text-primary-600 w-7 h-7" />,
      title: t('orderProcess.step1Title'),
      desc: t('orderProcess.step1Desc'),
    },
    {
      icon: <FaCheckCircle className="text-green-600 w-7 h-7" />,
      title: t('orderProcess.step2Title'),
      desc: t('orderProcess.step2Desc'),
    },
    {
      icon: <FaBoxOpen className="text-yellow-600 w-7 h-7" />,
      title: t('orderProcess.step3Title'),
      desc: t('orderProcess.step3Desc'),
    },
    {
      icon: <FaTruck className="text-blue-600 w-7 h-7" />,
      title: t('orderProcess.step4Title'),
      desc: t('orderProcess.step4Desc'),
    },
    {
      icon: <FaHome className="text-purple-600 w-7 h-7" />,
      title: t('orderProcess.step5Title'),
      desc: t('orderProcess.step5Desc'),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h3 className="text-2xl font-bold mb-6 text-primary-700">{t('orderProcess.title')}</h3>
      <ol className="space-y-6">
        {orderSteps.map((step, idx) => (
          <li key={idx} className="flex items-start gap-4">
            <div>{step.icon}</div>
            <div>
              <div className="font-semibold text-lg">{step.title}</div>
              <div className="text-gray-600">{step.desc}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
} 