import { UserRepository } from "@domain/repositories/user";
import { AuthenticatedRequest, RouteAuthenticationUseCase } from ".";
import { TokenAdapter } from "@domain/adapters/token";
import { UserRepositoryStub } from "@test/stubs/repositories/user";
import { TokenServiceStub } from "@test/stubs/adapters/token";
import { UserWithSchoolId } from "@domain/entities/user";

describe("Route Validator Use Case", () => {
  let sut: RouteAuthenticationUseCase;
  let userRepository: UserRepository;
  let tokenService: TokenAdapter;

  const REQUEST_WITH_TOKEN = {
    headers: { authorization: "Bearer 123" }
  } as AuthenticatedRequest;

  beforeEach(() => {
    userRepository = new UserRepositoryStub();
    tokenService = new TokenServiceStub();

    sut = new RouteAuthenticationUseCase(userRepository, tokenService);
  });

  it("should return false if the request does't has token", async () => {
    const resut = await sut.validate({} as AuthenticatedRequest);

    expect(resut).toBeFalsy();
  });

  it("should return false if the token isn't valid", async () => {
    jest.spyOn(tokenService, "getPayloadFromToken").mockResolvedValue(null);
    const resut = await sut.validate(REQUEST_WITH_TOKEN);

    expect(resut).toBeFalsy();
  });

  it("should return false if the user wasn't found", async () => {
    jest
      .spyOn(tokenService, "getPayloadFromToken")
      .mockResolvedValue({ id: "123" });
    jest.spyOn(userRepository, "findById").mockResolvedValue(null);
    const resut = await sut.validate(REQUEST_WITH_TOKEN);

    expect(resut).toBeFalsy();
  });

  it("should return true if the token is valid", async () => {
    jest
      .spyOn(tokenService, "getPayloadFromToken")
      .mockResolvedValue({ id: "123" });
    jest
      .spyOn(userRepository, "findById")
      .mockResolvedValue({ id: "USER_ID" } as UserWithSchoolId);

    const resut = await sut.validate(REQUEST_WITH_TOKEN);

    expect(resut).toBeTruthy();
    expect(tokenService.getPayloadFromToken).toHaveBeenCalledWith("123");
  });
});
