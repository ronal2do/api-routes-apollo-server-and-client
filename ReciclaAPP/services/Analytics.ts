
import * as Amplitude from '@amplitude/analytics-react-native';

import { TrackingOptions } from './AnalyticsUtils';
import { ENV } from '../environment';

let isInitialized = false;
const apiKey = ENV.AMPLITUDE;

export const events = {
  BOOTSTRAP: 'BOOTSTRAP',
  START_GAME: 'START_GAME',
  ERROR: 'ERROR',
  // user
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT',
  USER_CREATED_ACCOUNT: 'USER_CREATED_ACCOUNT',
  USER_RESET_PASSWORD: 'USER_RESET_PASSWORD',
  USER_FORGET_PASSWORD: 'USER_FORGET_PASSWORD',
  USER_LINKED_SOCIAL: 'USER_LINKED_SOCIAL',
  USER_UPDATED_EMAIL: 'USER_UPDATED_EMAIL',
  USER_UPDATED_PROFILE: 'USER_UPDATED_PROFILE',
  USER_UPDATED_LINKS: 'USER_UPDATED_SOCIAL_LINKS',
  USER_UPDATED_LIKE: 'USER_UPDATED_LIKE',
  USER_UPDATED_PRIVACY: 'USER_UPDATED_PRIVACY',
  USER_REMOVED_PROJECT: 'USER_REMOVED_PROJECT',
  USER_OPENED_CREATION: 'USER_OPENED_CREATION',
  USER_UPDATED_SETTINGS: 'USER_UPDATED_SETTINGS',
  USER_OPEN_LINK: 'USER_OPEN_LINK',
  USER_PAGE_VIEW: 'USER_PAGE_VIEW',
  // quizz
  QUESTION_SEQUENCE_NEW: 'QUESTION_SEQUENCE_NEW',
  QUESTION_SEQUENCE_END: 'QUESTION_SEQUENCE_END',
  QUESTION_SEQUENCE_NO_QUESTIONS: 'QUESTION_SEQUENCE_NO_QUESTIONS',
  QUESTION_RESPONSE: 'QUESTION_RESPONSE',
};

export function initialize(): void {
  if (isInitialized || !apiKey) {
    return;
  }

  Amplitude.init(apiKey);
  isInitialized = true;
}

export function identify(id: string | null, options?: TrackingOptions) {
  initialize();

  if (id) {
    Amplitude.setUserId(id);
  }
}

export function track(event: string, options?: TrackingOptions): void {
  initialize();
  Amplitude.logEvent(event);
}

export default {
  events,
  initialize,
  identify,
  track,
};