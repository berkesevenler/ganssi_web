import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

interface EmailData {
  name: string;
  email: string;
  address: string;
  quantity: number;
  message?: string;
}

export const sendEmail = async (data: {
  name: string;
  email: string;
  address: string;
  quantity: number;
  message?: string;
}) => {
  try {
    const response = await fetch('https://formsubmit.co/berkeseveenlr@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        address: data.address,
        quantity: data.quantity,
        message: data.message || '',
        _subject: 'New Ganssi Order',
        _template: 'table',
        _captcha: 'false',
      }),
    });

    if (response.ok) {
      return { success: true, message: 'Order submitted successfully!' };
    } else {
      return { success: false, message: 'Failed to submit order.' };
    }
  } catch (error) {
    return { success: false, message: 'Failed to submit order.' };
  }
};

export const sendContactEmail = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  try {
    const response = await fetch('https://formsubmit.co/berkeseveenlr@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        _subject: 'New Ganssi Contact Message',
        _template: 'table',
        _captcha: 'false',
      }),
    });

    if (response.ok) {
      return { success: true, message: 'Contact message submitted successfully!' };
    } else {
      return { success: false, message: 'Failed to submit contact message.' };
    }
  } catch (error) {
    return { success: false, message: 'Failed to submit contact message.' };
  }
};
