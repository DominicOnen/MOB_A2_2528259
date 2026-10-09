import { AVAILABILITY_OPTIONS, Availability } from '../data/content';

export type ProfileForm = {
  headline: string;
  bio: string;
  primarySkill: string;
  availability: Availability | '';
};

export type FormErrors = Partial<Record<keyof ProfileForm, string>>;

// At least three rules, each with its own field-level message.
export function validateProfile(form: ProfileForm): FormErrors {
  const errors: FormErrors = {};
  const headline = form.headline.trim();
  const bio = form.bio.trim();
  const skill = form.primarySkill.trim();

  // Rule 1: headline is required and 8-60 characters.
  if (headline.length === 0) errors.headline = 'Headline is required.';
  else if (headline.length < 8) errors.headline = 'Headline must be at least 8 characters.';
  else if (headline.length > 60) errors.headline = 'Headline must be 60 characters or fewer.';

  // Rule 2: bio is 30-280 characters.
  if (bio.length === 0) errors.bio = 'Short biography is required.';
  else if (bio.length < 30) errors.bio = `Biography needs at least 30 characters (now ${bio.length}).`;
  else if (bio.length > 280) errors.bio = `Biography must be 280 characters or fewer (now ${bio.length}).`;

  // Rule 3: primary skill is 2-30 characters and has no digits-only or symbol-only text.
  if (skill.length === 0) errors.primarySkill = 'Primary skill is required.';
  else if (skill.length < 2 || skill.length > 30) errors.primarySkill = 'Primary skill must be 2 to 30 characters.';
  else if (!/[A-Za-z]/.test(skill)) errors.primarySkill = 'Primary skill must contain letters.';

  // Rule 4: an availability status must be chosen.
  if (!AVAILABILITY_OPTIONS.includes(form.availability as Availability)) {
    errors.availability = 'Choose an availability status.';
  }
  return errors;
}

export function hasErrors(e: FormErrors): boolean {
  return Object.keys(e).length > 0;
}
