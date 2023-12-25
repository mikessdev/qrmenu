export interface BrevoEmailBody {
  sender: email;
  to: email[];
  subject: string;
  htmlContent: string;
}

interface email {
  email: string;
  name: string;
}

export const sendEmailWithBrevo = async (emailBody: BrevoEmailBody) => {
  const url: string = import.meta.env.VITE_EMAIL_URL;
  const apiKey: string = import.meta.env.VITE_EMAIL_API_KEY;

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // prettier-ignore
        'accept': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify(emailBody)
    });
  } catch (error) {
    console.error(error);
  }
};
