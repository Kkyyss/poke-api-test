import main from './ui/main.ui';
import cache from './files';

(async () => {
  console.log('initializing...');
  await cache.cacheFile();
  console.log('program started');
  main();
})();
