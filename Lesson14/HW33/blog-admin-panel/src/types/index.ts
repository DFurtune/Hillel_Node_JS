export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
}

export interface AuthToken {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenPayload {
    userId: string;
    tokenId: string;
}