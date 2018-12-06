import * as crypto from 'crypto';
import 'should';

import md5, { cache } from '../src';

describe('md5', () => {
  it('work', async () => {
    const rawData = 'hello, world!';
    const secureString = crypto.createHash('md5').update(rawData).digest('hex');
    const md5String = md5(rawData);
    md5String.should.be.equals(secureString);
  });

  it('make use of cache', async () => {
    const rawData = 'another, world!';
    const secureString = crypto.createHash('md5').update(rawData).digest('hex');

    md5(rawData).should.be.equals(secureString);
    cache.hits().count.should.be.equals(0);

    md5(rawData).should.be.equals(secureString);
    cache.hits().count.should.be.equals(1);

    md5(rawData).should.be.equals(secureString);
    cache.hits().count.should.be.equals(2);
  });
});
