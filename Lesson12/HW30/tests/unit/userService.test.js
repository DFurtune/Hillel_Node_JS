const userService = require('../../services/userService');
const { User } = require('../../db');

jest.mock('../../db', () => ({
  User: {
    findByPk: jest.fn(),
  },
}));

describe('UserService.getUserById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user with correct ID', async () => {
    User.findByPk.mockResolvedValue({ id: 1, name: 'John Doe' });
    const user = await userService.getUserById(1);
    expect(user).toEqual({ id: 1, name: 'John Doe' });
  });

  it('should handle non-existing user', async () => {
    User.findByPk.mockResolvedValue(null);
    const user = await userService.getUserById(999);
    expect(user).toBeNull();
  });

  it('should throw error on DB failure', async () => {
    User.findByPk.mockRejectedValue(new Error('DB Error'));
    await expect(userService.getUserById(1)).rejects.toThrow('DB Error');
  });
});