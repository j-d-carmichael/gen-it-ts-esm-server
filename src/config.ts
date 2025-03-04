import dotenv from 'dotenv';
import { ProcEnvHelper } from 'proc-env-helper';

dotenv.config();

/**
 * Add and remove config that you need.
 */
export default {
  // Swagger file
  loadSwaggerUIRoute: ProcEnvHelper.getOrSetDefault('LOAD_SWAGGER_UI_ROUTE', false),
  swaggerBasicAuth: [
    {
      basicAuthUname: String(ProcEnvHelper.getOrSetDefault('SWAGGER_BASIC_AUTH_UNAME', 'user')),
      basicAuthPword: String(ProcEnvHelper.getOrSetDefault('SWAGGER_BASIC_AUTH_PWORD', 'password')),
    },
  ],

  // Instance
  env: ProcEnvHelper.getOrSetDefault('ENVIRONMENT', 'production'),
  port: ProcEnvHelper.getOrSetDefault('PORT', 8000),

  // Cors white list of URLs
  corsWhiteList: ProcEnvHelper.getOrSetDefault('CORS_WHITELIST', '*'),

  // Authentication
  jwtAccessSecret: ProcEnvHelper.getOrSetDefault('JWT_ACCESS_SECRET', '32165987oiudsc8sdv'),
  apiKey: ProcEnvHelper.getOrSetDefault('API_KEY', false),

  // Request worker config - allThreadsCount = processes * threadsPerProcess
  requestWorker: {
    processes: Number.parseInt(ProcEnvHelper.getOrSetDefault('REQUEST_WORKER_PROCESSES', 1), 10),
    threadsPerProcess: Number.parseInt(ProcEnvHelper.getOrSetDefault('REQUEST_WORKER_THREADS_PER_PROCESS', 10), 10),
    timeoutMs: Number.parseInt(
      ProcEnvHelper.getOrSetDefault('REQUEST_WORKER_TIMEOUT_MS', 300000), // 5 minutes
      10
    ),
    silent: true, // disable thread / proc start logs
  },
};
