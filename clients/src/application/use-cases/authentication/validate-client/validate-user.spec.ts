import { ValidateUserUseCase } from ".";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { UserRepository } from "@domain/repositories/user";
import { UserRepositoryStub } from "@test/stubs/repositories/user";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { Access } from "@domain/entities/access";
import { UserWithSchoolId } from "@domain/entities/user";

describe("Validate User Use Case", () => {
  let sut: ValidateUserUseCase;
  let userRepository: UserRepository;
  let exceptionsService: ExceptionsAdapter;

  const ACCESS = {
    userId: "123",
    expirationTestDate: undefined
  } as Access;

  const USER_DEACTIVATED = {
    id: "123",
    deletedAt: new Date()
  } as UserWithSchoolId;

  const USER_ACTIVE = {
    id: "123",
    deletedAt: null
  } as UserWithSchoolId;

  beforeEach(() => {
    userRepository = new UserRepositoryStub();
    exceptionsService = new ExceptionsServiceStub();

    sut = new ValidateUserUseCase(exceptionsService, userRepository);
  });

  it("should return access if the user exists, is valid, and active", async () => {
    jest.spyOn(userRepository, "findById").mockResolvedValue(USER_ACTIVE);

    const result = await sut.validate(ACCESS);

    expect(result).toBe(USER_ACTIVE);
    expect(userRepository.findById).toHaveBeenCalledWith(ACCESS.userId);
  });

  it("should throw a notFound exception if the user does not exist", async () => {
    jest.spyOn(userRepository, "findById").mockResolvedValue(null);
    jest.spyOn(exceptionsService, "notFound");

    await sut.validate(ACCESS);

    expect(exceptionsService.notFound).toHaveBeenCalledWith({
      message: "User not found"
    });
  });

  it("should throw an unauthorized exception if the user has been deactivated", async () => {
    jest.spyOn(userRepository, "findById").mockResolvedValue(USER_DEACTIVATED);
    jest.spyOn(exceptionsService, "unauthorized");

    await sut.validate(ACCESS);

    expect(exceptionsService.unauthorized).toHaveBeenCalledWith({
      message: "User has been deactivated"
    });
  });

  it("should throw a badRequest exception if the trial period has expired", async () => {
    const expiredAccess = {
      ...ACCESS,
      expirationTestDate: new Date(Date.now() - 86400000)
    };

    jest.spyOn(userRepository, "findById").mockResolvedValue(USER_ACTIVE);
    jest.spyOn(exceptionsService, "badRequest");

    await sut.validate(expiredAccess);

    expect(exceptionsService.badRequest).toHaveBeenCalledWith({
      message: "Trial period expired"
    });
  });
});
