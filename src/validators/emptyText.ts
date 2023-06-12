export function validateEmptyText(text: string): string {
    return text === "" ? 'Você precisa preencher esse campo' : '';   
}