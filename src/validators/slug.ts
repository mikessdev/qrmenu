export function validateSlug(text: string): string {
  const regex = /^[a-z0-9-]/;
  let result: string = '';

  for (const letter of text.split('')) {
    if (!regex.test(letter)) {
      result = `Letra ou Caractere '${letter}' não é permitido!`;
      break;
    }
  }

  return result;
}
