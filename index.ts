import app from './src/app';
import { connectToDB } from './src/config/mongoose'; // Import the mongoose configuration file
import { validateEnv } from './src/config/env.config';
connectToDB()
const port = validateEnv().port || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});