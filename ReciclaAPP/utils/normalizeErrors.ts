interface Error {
  path: string;
  message: string;
}

export const normalizeErrors = (errors: Error[]) => {
  const errMap: { [key: string]: string } = {};

  errors.forEach(err => {
    errMap[err.path] = err.message;
  });

  return errMap;
};

export const errorsToHumans = (error: string) => {
  if(error === 'INVALID_PASSWORD') {
    return 'Senha inválida'
  }
  if(error === 'INVALID_EMAIL_PASSWORD') {
    return 'E-mail ou senha inválida'
  }
  if(error === 'EMAIL_ALREADY_IN_USE') {
    return 'E-mail em uso'
  }
  return error
}