import type { Prisma, Board, BoardMember, User, Session } from '@prisma/client';

export type TUserBoardRoles = 'guest' | 'owner' | 'admin' | 'member';

export type PopulatedUser = Prisma.UserGetPayload<{
  include: {
    subs: true;
  };
  select: {
    subs: {
      select: {
        boardId: true;
      };
    };
  };
}>;

export type TUser = PopulatedUser & User;

export type PopulatedBoardMember = {
  include: {
    user: true;
  };
};
export type TBoardMember<
  T extends Prisma.BoardMemberArgs = PopulatedBoardMember,
> = BoardMember & Prisma.BoardMemberGetPayload<T>;

export type TBoardPermissions = {
  invite_members: boolean;
};

export type PopulatedMembersAndOwner = {
  include: {
    members: {
      include: {
        user: true;
      };
    };
    owner: true;
  };
};

export type TBoard<T extends Prisma.BoardArgs = PopulatedMembersAndOwner> =
  Board & Prisma.BoardGetPayload<T>;

export type TEditableUserProps =
  | Required<Pick<TUser, 'displayName'>>
  | Required<Pick<TUser, 'imageURL'>>;

export type TNotificationActionData = {
  boardId: string;
};
export type TNotePriority = 'conflict' | 'warning' | 'notification';

export type TNoteTypes = 'option' | 'info';
export type TActions = 'board_invite';

export interface INotification {
  id: string;
  type: TNoteTypes;
  text: string;
  recipient: TUser;
  priority: TNotePriority;
  action: TActions;
  actionData: TNotificationActionData;
}

export interface ISession extends Session {}
