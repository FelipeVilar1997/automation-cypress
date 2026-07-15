export function parsePriceToNumber(value) {
  if (value === undefined || value === null || value === '') {
    return 0
  }

  const text = String(value).toLowerCase().trim()

  if (text.includes('free')) {
    return 0
  }

  const match = text.match(/\d+([,.]\d+)?/)

  if (!match) {
    throw new Error(`Valor monetário inválido: "${value}"`)
  }

  return Number(match[0].replace(',', '.'))
}

export function parseQuantityToNumber(value) {
  const quantity = Number(String(value).trim())

  if (Number.isNaN(quantity)) {
    throw new Error(`Quantidade inválida: "${value}"`)
  }

  return quantity
}