import * as crypto from 'crypto';
import LRU from '@zcorky/lru';

export const cache = new LRU<string, string>(2500);

const freshMd5 = (data: string) => {
  return crypto.createHash('md5').update(data).digest('hex');
}

export default function md5(data: string) {
  if (cache.hasKey(data)) {
    return cache.get(data) as string;
  }
  
  const seceretData = freshMd5(data);
  cache.set(data, seceretData);
  return seceretData;
}