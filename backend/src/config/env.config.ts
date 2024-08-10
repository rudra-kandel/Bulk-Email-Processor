import Joi from 'joi';
import dotenv from 'dotenv'
dotenv.config()

// All env variables used by the app should be defined in this file.

// To define new env:
// 1. Add env variable to .env.local file;
// 2. Provide validation rules for your env in envsSchema;
// 3. Make it visible outside of this module in export section;
// 4. Access your env variable only via config file.
// Do not use process.env object outside of this file.

const envsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'integration', 'development')
      .default('development')
      .required(),
    PORT: Joi.number().default(8080),
    JWT_SECRET_TOKEN: Joi.string().required(),
    SALT_ROUNDS: Joi.number().default(17),
    DB_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_USER_NAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    ALLOWED_DOMAINS: Joi.string().required(),
    // REDIS_PORT: Joi.number().required(),
    // REDIS_HOST: Joi.string().required(),
    // REDIS_PASSWORD: Joi.string().required()
  })
  .unknown(true);

const { value: envVars, error } = envsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);
console.log("pro", process.env.NODE_ENV)
if (error) {
  throw new Error(
    `Config validation error: ${error.message}. \n
     This app requires env variables to work properly`,
  );
}

// map env vars and make it visible outside module
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  dbPort: envVars.DB_PORT,
  host: envVars.DB_HOST,
  user: envVars.DB_USER_NAME,
  password: envVars.DB_PASSWORD,
  databaseName: envVars.DB_NAME,
  jwtSecret: envVars.JWT_SECRET_TOKEN,
  allowedDomains: envVars.ALLOWED_DOMAINS,
  saltRounds: envVars.SALT_ROUNDS,
  redisPort: envVars.REDIS_PORT,
  redisHost: envVars.REDIS_HOST,
  redisPassword: envVars.REDIS_PASSWORD
};
