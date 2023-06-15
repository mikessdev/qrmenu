export function validateEmptyText(text: string): string {
    return text === "" || !text.trim() ? 'Você precisa preencher esse campo!' : '';   
}