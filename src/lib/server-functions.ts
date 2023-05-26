import 'server-only';
import { headers } from 'next/headers';
import { HeaderFullPathKey } from '@/middleware';
import { color } from './logger/chalk';

export function __devconsoleLog(obj?: any) {
  if (process.env.NODE_ENV === 'development') {
    color.yellow(obj);
  }
}

export function getFullPath() {
  return headers().get(HeaderFullPathKey)
}

export function getPath() {
  return headers().get('x-invoke-path');
}

export function getHost() {
  return headers().get('host');
}

export function getReferer() {
  return headers().get('referer');
}

export function getQuery() {
  const url = new URL(getFullPath()!)
  return url.searchParams
}

export function debug_printHeaders() {
  // @ts-ignore
  for (const pair of headers().entries()) {
    console.log(`${pair[0]} => ${pair[1]}`);
  }
}
