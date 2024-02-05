import development from '@config/development';
import production from '@config/production';
import test from '@config/test.env';

const nodeENV = process.env.NODE_ENV || 'development';

const env = { production, development, test }[nodeENV];

const config = {
  api: {
    host: env.API_HOST,
    image_customer: env.API_GET_IMAGE_CUSTOMER,
    image_book: env.BOOK,
  },
  encryption: {
    cryptoSecret: env.CRYPTO_SECRET,
  },
};

export default config;
