import { LoginUseCase, LoginUseCaseParams } from ".";
import { AccessRepository } from "@domain/repositories/access";
import { TokenAdapter } from "@domain/adapters/token";
import { CryptographyAdapter } from "@domain/adapters/cryptography";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { ValidateUserUseCase } from "../validate-client";
import { AccessRepositoryStub } from "@test/stubs/repositories/access";
import { TokenServiceStub } from "@test/stubs/adapters/token";
import { CryptographyServiceStub } from "@test/stubs/adapters/cryptography";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import { Access } from "@domain/entities/access";
import { UserRepository } from "@domain/repositories/user";
import { UserRepositoryStub } from "@test/stubs/repositories/user";
import { UserWithSchoolId } from "@domain/entities/user";
import { ValidateSchoolUseCase } from "../validate-school";
import { SchoolRepository } from "@domain/repositories/school";
import { SchoolRepositoryStub } from "@test/stubs/repositories/school";
import { SchoolDomainRepository } from "@domain/repositories/school-domain";
import { SchoolDomainRepositoryStub } from "@test/stubs/repositories/school-domain";
import { School } from "@domain/entities/school";

describe("LoginUseCase with ValidateUserUseCase", () => {
  let sut: LoginUseCase;
  let accessRepository: AccessRepository;
  let userRepository: UserRepository;
  let tokenService: TokenAdapter;
  let cryptographyService: CryptographyAdapter;
  let exceptionsService: ExceptionsAdapter;
  let validateUserUseCase: ValidateUserUseCase;
  let validateSchoolUseCase: ValidateSchoolUseCase;
  let schoolRepository: SchoolRepository;
  let schoolDomainRepository: SchoolDomainRepository;

  const LOGIN_PARAMS: LoginUseCaseParams = {
    email: "test@email.com",
    password: "password123",
    domain: "www.domain.com"
  };

  const ACCESS = {
    userId: "123",
    email: "test@email.com",
    password: "hashedPassword",
    expirationTestDate: undefined
  } as Access;

  const USER = {
    id: "123"
  } as UserWithSchoolId;

  const ACCESS_TOKEN = "generatedToken";

  beforeEach(() => {
    accessRepository = new AccessRepositoryStub();
    userRepository = new UserRepositoryStub();
    tokenService = new TokenServiceStub();
    cryptographyService = new CryptographyServiceStub();
    exceptionsService = new ExceptionsServiceStub();
    schoolRepository = new SchoolRepositoryStub();
    validateUserUseCase = new ValidateUserUseCase(
      exceptionsService,
      userRepository
    );
    validateSchoolUseCase = new ValidateSchoolUseCase(
      exceptionsService,
      schoolRepository
    );
    schoolDomainRepository = new SchoolDomainRepositoryStub();
    sut = new LoginUseCase(
      accessRepository,
      tokenService,
      cryptographyService,
      exceptionsService,
      validateUserUseCase,
      validateSchoolUseCase,
      schoolDomainRepository
    );
  });

  const SCHOOL = {
    id: "123",
    name: "School Name"
  } as School;

  it("should return the access token when login is successful", async () => {
    jest
      .spyOn(accessRepository, "findByEmailAndSchoolId")
      .mockResolvedValue(ACCESS);
    jest.spyOn(cryptographyService, "compare").mockResolvedValue(true);
    jest.spyOn(tokenService, "generateToken").mockResolvedValue(ACCESS_TOKEN);
    jest.spyOn(validateUserUseCase, "validate").mockResolvedValue(USER);
    jest
      .spyOn(schoolDomainRepository, "findSchoolByDomain")
      .mockResolvedValue(SCHOOL);

    const result = await sut.login(LOGIN_PARAMS);

    expect(result).toStrictEqual({ accessToken: ACCESS_TOKEN });
  });

  it("should call wrongCredentials if email is not found", async () => {
    jest
      .spyOn(accessRepository, "findByEmailAndSchoolId")
      .mockResolvedValue(null);
    jest.spyOn(exceptionsService, "wrongCredentials");
    jest
      .spyOn(schoolDomainRepository, "findSchoolByDomain")
      .mockResolvedValue(SCHOOL);

    await sut.login(LOGIN_PARAMS);

    expect(exceptionsService.wrongCredentials).toHaveBeenCalled();
  });

  it("should call wrongCredentials if password is invalid", async () => {
    jest
      .spyOn(accessRepository, "findByEmailAndSchoolId")
      .mockResolvedValue(ACCESS);
    jest.spyOn(cryptographyService, "compare").mockResolvedValue(false);
    jest.spyOn(exceptionsService, "wrongCredentials");
    jest
      .spyOn(schoolDomainRepository, "findSchoolByDomain")
      .mockResolvedValue(SCHOOL);

    await sut.login(LOGIN_PARAMS);

    expect(exceptionsService.wrongCredentials).toHaveBeenCalled();
  });

  it("should not generate a token if validateUserUseCase returns void", async () => {
    jest
      .spyOn(accessRepository, "findByEmailAndSchoolId")
      .mockResolvedValue(ACCESS);
    jest.spyOn(cryptographyService, "compare").mockResolvedValue(true);
    jest.spyOn(validateUserUseCase, "validate").mockResolvedValue(undefined);
    jest
      .spyOn(schoolDomainRepository, "findSchoolByDomain")
      .mockResolvedValue(SCHOOL);

    const result = await sut.login(LOGIN_PARAMS);

    expect(result).toBeUndefined();
  });

  it("should not generate a token if validateSchoolUseCase returns void", async () => {
    jest
      .spyOn(accessRepository, "findByEmailAndSchoolId")
      .mockResolvedValue(ACCESS);
    jest.spyOn(cryptographyService, "compare").mockResolvedValue(true);
    jest.spyOn(validateUserUseCase, "validate").mockResolvedValue(undefined);
    jest
      .spyOn(schoolDomainRepository, "findSchoolByDomain")
      .mockResolvedValue(null);

    const result = await sut.login(LOGIN_PARAMS);

    expect(result).toBeUndefined();
  });

  it("should call badRequest if school is not found", async () => {
    jest
      .spyOn(schoolDomainRepository, "findSchoolByDomain")
      .mockResolvedValue(null);
    jest.spyOn(exceptionsService, "badRequest");
    jest
      .spyOn(schoolDomainRepository, "findSchoolByDomain")
      .mockResolvedValue(null);

    await sut.login(LOGIN_PARAMS);

    expect(exceptionsService.badRequest).toHaveBeenCalled();
  });
});
