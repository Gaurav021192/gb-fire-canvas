export interface Roles {
   admin?: boolean;
   subscriber?: boolean;
}

export interface User {
   uid: string;
   email: string;
   displayName: string;
   photoURL: string;
   emailVerified: boolean;
   roles: Roles;
}