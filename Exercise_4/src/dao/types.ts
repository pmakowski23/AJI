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

export type Category = {
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  createCategory: Category;
  createOrder: Order;
  createProduct: Product;
  createUser: User;
  updateCategory?: Maybe<Category>;
  updateOrder?: Maybe<Order>;
  updateProduct?: Maybe<Product>;
  updateUser?: Maybe<User>;
};


export type MutationCreateCategoryArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateOrderArgs = {
  products?: Maybe<Array<Product>>;
  state: OrderState;
  username: User;
};


export type MutationCreateProductArgs = {
  category: Category;
  description: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  weight: Scalars['Int'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  phoneNumber?: Maybe<Scalars['Int']>;
  role: Role;
  username: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  categoryId?: Maybe<Scalars['ID']>;
  data?: Maybe<UpdateCategoryInput>;
};


export type MutationUpdateOrderArgs = {
  data?: Maybe<UpdateOrderInput>;
  orderId?: Maybe<Scalars['ID']>;
};


export type MutationUpdateProductArgs = {
  data?: Maybe<UpdateProductInput>;
  productId?: Maybe<Scalars['ID']>;
};


export type MutationUpdateUserArgs = {
  data?: Maybe<UpdateUserInput>;
  userId: Scalars['ID'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Order = {
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  products?: Maybe<Array<Product>>;
  state: OrderState;
  username: User;
};

export enum OrderState {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Fullfield = 'FULLFIELD',
  NotApproved = 'NOT_APPROVED'
}

export type Product = {
  category: Category;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  weight: Scalars['Int'];
};

export type Query = {
  Category?: Maybe<Category>;
  Order?: Maybe<Order>;
  Product?: Maybe<Product>;
  User?: Maybe<User>;
  allCategories: Array<Category>;
  allOrders: Array<Order>;
  allProducts: Array<Product>;
  allUsers: Array<User>;
};


export type QueryCategoryArgs = {
  categoryId: Scalars['ID'];
};


export type QueryOrderArgs = {
  orderId: Scalars['ID'];
};


export type QueryProductArgs = {
  productId: Scalars['ID'];
};


export type QueryUserArgs = {
  userId: Scalars['ID'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UpdateCategoryInput = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateOrderInput = {
  products?: Maybe<Array<Product>>;
  state?: Maybe<OrderState>;
  username?: Maybe<User>;
};

export type UpdateProductInput = {
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Int']>;
};

export type UpdateUserInput = {
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type User = Node & {
  email: Scalars['String'];
  id: Scalars['ID'];
  phoneNumber: Scalars['String'];
  role: Role;
  username: Scalars['String'];
};

import { ObjectId } from 'mongodb';
export type CategoryDbObject = {
  description: string,
  _id: ObjectId,
  name: string,
};

export type OrderDbObject = {
  createdAt: Date,
  _id: ObjectId,
  products?: Maybe<Array<ProductDbObject['_id']>>,
  state: string,
  username: UserDbObject['_id'],
};

export type ProductDbObject = {
  category: CategoryDbObject['_id'],
  description: string,
  _id: ObjectId,
  name: string,
  price: number,
  weight: number,
};

export type UserDbObject = {
  email: string,
  _id: ObjectId,
  phoneNumber: string,
  role: string,
  username: string,
};
