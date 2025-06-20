import { ids } from '@/utils/const';
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ids,
  // Used when no locale matches
  defaultLocale: 'en',
});