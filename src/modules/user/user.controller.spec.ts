import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    getUserProfile: jest.fn(),
    updateUserProfile: jest.fn(),
    deleteUserProfile: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserProfile', () => {
    it('should call UserService.getUserProfile and return the result', async () => {
      const mockUserProfile = { email: `john@email.com`, password: `john123` };
      mockUserService.getUserProfile.mockResolvedValue(mockUserProfile)

      const response = await controller.getUserProfile(`123`);
      expect(mockUserService.getUserProfile).toHaveBeenCalledWith(`123`);
      expect(response).toEqual(mockUserProfile);
    })
  })
});
