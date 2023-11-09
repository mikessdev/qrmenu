export function validateConfirmPassword(firstPassword: string, secondPassowrd: string): string {
  return firstPassword != secondPassowrd ? 'As senhas ainda não coincidem!' : '';
}

export function validatePassword(password: string) {
  const fewCharacters: boolean = !password.match(/.{6,}/);
  const capitalLetters: boolean = !password.match(/[A-Z]{1,}/);
  const numbers: boolean = !password.match(/[0-9]{1,}/);

  if (fewCharacters) {
    return 'Senha muito curta.';
  }

  if (capitalLetters || numbers) {
    return 'Senha fraca.';
  }

  return '';
}
