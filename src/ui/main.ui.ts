import readlineSync from 'readline-sync';
import search from './search.ui';
import cache from '../files';

const menu: Array<string> = ['search pokemon by ID', 'search pokemon by Name'];

let isContinue = true;
const main = async () => {
  while (isContinue) {
    const index: number = readlineSync.keyInSelect(menu, 'Please select option(s)');

    switch (index) {
      case 0:
        await search(true);
        break;
      case 1:
        await search();
        break;
      case -1:
        isContinue = false;
        cache.closeFile();
        break;
      default: break;
    }
    console.clear();
  }
  console.log('✨  App terminated. Thanks for using the App 👍');
};

export default main;
