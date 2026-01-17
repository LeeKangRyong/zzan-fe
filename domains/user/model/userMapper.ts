import type { User, UserApiResponse } from './userModel';

const DEFAULT_PROFILE_IMAGE = require('@/assets/images/example_image.png');

const formatBirthForDisplay = (birth: string | null): string => {
  if (!birth) return '';
  return birth.replace(/-/g, '.');
};

export const mapApiUserToUser = (apiUser: UserApiResponse): User => ({
  id: apiUser.id,
  name: apiUser.name || '사용자',
  profileImage: apiUser.profileImageUrl
    ? { uri: apiUser.profileImageUrl }
    : DEFAULT_PROFILE_IMAGE,
  profileImageUrl: apiUser.profileImageUrl,
  emptyAlcoholCount: 0,
  birthDate: formatBirthForDisplay(apiUser.birth),
  birth: apiUser.birth,
  phone: apiUser.phone || '',
  email: apiUser.email || '',
  role: apiUser.role,
});

export const mapUserToApiRequest = (
  user: User
): Partial<UserApiResponse> => ({
  name: user.name,
  birth: user.birth,
  phone: user.phone,
  email: user.email,
});
