export function checkImageSize(fileSize: number, limit: number) {
  return fileSize >= limit
    ? `A imagem precisa ser do formato JPEG ou PNG, com tamanho limite de: ${limit / 1000000}MB`
    : '';
}
