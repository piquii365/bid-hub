export interface FirebaseIdentities {
  "google.com"?: string[];
  email?: string[];
  [key: string]: any;
}

declare global {
  namespace Express {
    interface FirebaseAuthToken {
      name: string;
      picture: string;
      iss: string;
      aud: string;
      auth_time: number;
      user_id: string;
      sub: string;
      iat: number;
      exp: number;
      email: string;
      email_verified: boolean;
      firebase: {
        identities: FirebaseIdentities;
        sign_in_provider: string;
      };
      uid: string;
    }

    interface Request {
      user?: FirebaseAuthToken;
    }
  }
}
