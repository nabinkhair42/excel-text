export const logger = {
  info: (message: string, data?: any) => {
    console.log('\x1b[36m%s\x1b[0m', '🔵 INFO:', message);
    if (data) console.log(data);
  },
  success: (message: string, data?: any) => {
    console.log('\x1b[32m%s\x1b[0m', '✅ SUCCESS:', message);
    if (data) console.log(data);
  },
  error: (message: string, error?: any) => {
    console.log('\x1b[31m%s\x1b[0m', '❌ ERROR:', message);
    if (error) console.error(error);
  },
  warn: (message: string, data?: any) => {
    console.log('\x1b[33m%s\x1b[0m', '⚠️ WARNING:', message);
    if (data) console.log(data);
  }
}; 