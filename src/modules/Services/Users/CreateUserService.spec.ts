



describe('CreateUserService', () => {
  beforeEach(() => {

    createUserService = new CreateUserService(

    );
  });

  it('Should be able to create a new shipper user', async () => {
    const { user, shipper, legal_person } = await createUser.execute({

    });

    expect(user).toHaveProperty('id');
  });
});
