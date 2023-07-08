export type TUserBoardRoles = 'guest' | 'owner' | 'admin' | 'member';

export interface TUser {
  _id?: unknown;
  id: string;
  username: string;
  displayName?: string;
  email: string;
  subs: string[] | TBoard[];
  imageURL?: string;
  nameAlias: string;
  pendingInvites: string[];
}

export type TBoardMember = {
  role: TUserBoardRoles;
  user: TUser;
  isPending: boolean;
};

export type TBoardPermissions = {
  invite_members: boolean;
};

export type TBoardMember = {
  role: TUserBoardRoles;
  user: TUser;
  isPending: boolean;
};

export type TBoard = {
  id: string;
  title: string;
  bg: string;
  owner: TUser;
  ownerId?: string;
  members: TBoardMember[];
};

export type TNotificationActionData = {
  boardId: string;
};
export type TNotePriority = 'conflict' | 'warning' | 'notification';
export type TActions = 'board_invite';
export type TNoteTypes = 'option' | 'info';

export const notePriorityEnum = [
  'conflict',
  'warning',
  'notification',
] as const;
export const noteActionsEnum = ['board_invite'] as const;
export const noteTypesEnum = ['option', 'info'] as const;

export interface INotification {
  id: string;
  type: TNoteTypes;
  text: string;
  recipient: TUser;
  priority: TNotePriority;
  action: TActions;
  actionData: TNotificationActionData;
}

export interface IPassword {
  id: string;
  user: Schema.Types.ObjectId;
  pw: string;
}

export interface ISession {
  id: string;
  sessionToken: string;
  userId: Schema.Types.ObjectId | TUser;
  expires: Date;
}

export type TBoardMember = {
  role: TUserBoardRoles;
  user: TUser;
  isPending: boolean;
};

export type TEditableUserProps =
  | Required<Pick<TUser, 'displayName'>>
  | Required<Pick<TUser, 'imageURL'>>;
