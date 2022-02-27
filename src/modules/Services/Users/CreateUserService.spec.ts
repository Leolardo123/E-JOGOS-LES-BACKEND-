import FakePlacesTypesRepository from "@modules/Repositories/Addresses/fakes/FakePlacesTypesRepository";
import FakeAddressesRepository from "@modules/Repositories/Addresses/fakes/FakeAddressesRepository";
import FakeAddressesTypesRepository from "@modules/Repositories/Addresses/fakes/FakeAddressesTypesRepository";
import FakePersonsRepository from "@modules/Repositories/Users/fakes/FakePersonsRepository";
import FakePhonesRepository from "@modules/Repositories/Users/fakes/FakePhonesRepository";
import FakeUsersRepository from "@modules/Repositories/Users/fakes/FakeUsersRepository";
import FakeHashProvider from "shared/container/providers/HashProvider/fakes/FakeHashProvider";
import FakeIdGeneratorProvider from "shared/container/providers/IdGeneratorProvider/fakes/FakeIdGeneratorProvider";
import FakeRepositoryUtils from "shared/container/providers/RepositoryUtilsProvider/fakes/FakeRepositoryUtils";
import CreateUserService from "./CreateUserService";
import { PlacesTypesEnum } from "shared/enum/PlacesTypesEnum";
import { GenderTypesEnum } from "shared/enum/GenderTypesEnum";
import { AddressesTypesEnum } from "shared/enum/AddressesTypesEnum";




let usersRepository = new FakeUsersRepository;
let personsRepository: FakePersonsRepository;
let phonesRepository: FakePhonesRepository;
let addresesRepository: FakeAddressesRepository;
let addressesTypesRepository: FakeAddressesTypesRepository;
let placesTypesRepository: FakePlacesTypesRepository;
let hashProvider: FakeHashProvider;
let idGeneratorProvider: FakeIdGeneratorProvider;
let repositoryUtils: FakeRepositoryUtils;

let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {

    usersRepository = new FakeUsersRepository;
    personsRepository = new FakePersonsRepository;
    phonesRepository = new FakePhonesRepository;
    addresesRepository = new FakeAddressesRepository;
    addressesTypesRepository = new FakeAddressesTypesRepository;
    placesTypesRepository = new FakePlacesTypesRepository;
    hashProvider = new FakeHashProvider;
    idGeneratorProvider = new FakeIdGeneratorProvider;
    repositoryUtils = new FakeRepositoryUtils;

    createUserService = new CreateUserService(
      usersRepository,
      personsRepository,
      phonesRepository,
      addresesRepository,
      addressesTypesRepository,
      placesTypesRepository,
      hashProvider,
      idGeneratorProvider,
      repositoryUtils
    );
  });

  it('Should be able to create a new shipper user', async () => {


    const { user } = await createUserService.execute({
      user: {
          email: 'email@mailserv.com',
          password: '123',
      },
      person: {
          name: 'Rafael Santos',
          cpf: '556434534',
          cellphone: 12343242342,
          birth_date: '22/06/2000',
          gender_id: GenderTypesEnum.Masculine,
          phone: {
              ddd: 55,
              number: 12312323 
          }
      },
      address: {
          cep: '234-52534542',
          place: 'Uma rua em algum lugar',
          number: 1,
          city: 'Uma Cidade',
          state: 'Um Estado',
          country: 'Um País',
          complement: '',
          neighborhood: 'Um Bairro',
          address_type_id: AddressesTypesEnum.DeliveryPayment,
          place_type_id: PlacesTypesEnum.House,
      }
    })

    expect(user).toHaveProperty('id');
  });
});
