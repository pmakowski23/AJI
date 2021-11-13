export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Mutation = {
  createUser: User;
  updateUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  role: Role;
  username: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data?: Maybe<UpdateUserInput>;
  userId: Scalars['ID'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Query = {
  User?: Maybe<User>;
  allUsers: Array<User>;
};


export type QueryUserArgs = {
  userId: Scalars['ID'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UpdateUserInput = {
  email?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type User = Node & {
  email: Scalars['String'];
  id: Scalars['ID'];
  role: Role;
  username: Scalars['String'];
};

import { ObjectId } from 'mongodb';
export type UserDbObject = {
  email: string,
  _id: ObjectId,
  role: string,
  username: string,
};
