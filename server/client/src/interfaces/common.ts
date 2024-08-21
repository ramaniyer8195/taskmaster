export interface NumberCardProps {
  number: number;
  heading: string;
  subHeading: string;
}

export enum Socials {
  FACEBOOK = "facebook",
  TWITTER = "twitter",
  GOOGLE = "google",
  LINKEDIN = "linkedin",
}

export interface SocialButtonProps {
  type: Socials;
}
