export function validateEmptyText(text: string): string {
  return text === '' || !text.trim() ? 'Campo obrigatório!' : '';
}
