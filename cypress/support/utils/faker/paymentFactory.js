import { faker } from '@faker-js/faker'

export function generatePaymentData() {
  const futureDate = faker.date.future();
  const dateExpiryMonth = String(futureDate.getMonth() + 1).padStart(2, '0');
  const dateExpiryYear = String(futureDate.getFullYear());

  const generateCardNumber = faker.finance.creditCardNumber
    ? faker.finance.creditCardNumber()
    : '4111111111111111'

  return {
    nameCard: faker.person.fullName(),
    cardNumber: String(generateCardNumber).replace(/\D/g, ''),
    numberCVC: String(faker.finance.creditCardCVV()),
    dateExpiryMonth,
    dateExpiryYear
  }
}