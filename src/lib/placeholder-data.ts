import { faker } from '@faker-js/faker';
const providerTypes = ['ophthalmologist', 'optometrist'];
const statuses = ['High-Risk', 'Low-Risk', 'New Referral', 'Normal'];
const specialties = [
  'cataract',
  'glaucoma',
  'retina',
  'pediatrics',
  'cornea',
  'refractive',
  'oculoplastics',
  'neuro-ophthalmology',
  'low vision',
  'contact lenses',
  'general',
  'other',
];
const surgeryType = [
  'cataract',
  'LASIK',
  'PRK',
  'RK',
  'AK',
  'LRI',
  'IOL',
  'glaucoma',
  'cornea',
  'retina',
  'pediatrics',
  'oculoplastics',
  'neuro-ophthalmology',
  'low vision',
  'contact lenses',
  'general',
  'other',
];
const eyes = ['left', 'right', 'both'];
const clinicTypes = ['ophthalmology', 'optometry'];

const randomName = () => faker.person.fullName(); // Rowan Nikolaus
const randomEmail = () => faker.internet.email(); // Kassandra.Haley@erich.biz
const randomDate = () => faker.date.recent(); // 2018-07-17T20:58:00.000Z
const randomBirthDate = () =>
  faker.date.birthdate().toISOString().substring(0, 10); // 1995-12-20
const randomNumber = () => Number(faker.string.numeric({ length: 4 })); // 10
const randomUserName = () => faker.internet.userName(); // 10
const randomImage = () => faker.image.avatar(); // 10
const randomID = () => faker.string.nanoid(25); // long 25 character string
const randomProviderType = () => faker.helpers.arrayElement(providerTypes);
const randomStatus = () => faker.helpers.arrayElement(statuses);
// select two random elements from the specialties array
const randomSpecialty = () => faker.helpers.arrayElements(specialties, 2);
const randomBoolean = () => faker.datatype.boolean(0.25);
const randomSurgeryType = () => faker.helpers.arrayElement(surgeryType);
const randomString = () => faker.lorem.sentence();
const randomEyes = () => faker.helpers.arrayElement(eyes);

// Patient

function createRandomPatient() {
  return {
    id: randomID(),
    firstName: randomName(),
    lastName: randomName(),
    dob: randomBirthDate(),
    email: randomEmail(),
    phoneNumber: faker.phone.number(),
  };
}
// User
function createRandomUser() {
  return {
    id: randomID(),
    firstName: randomName(),
    lastName: randomName(),
    username: randomUserName(),
    email: randomEmail(),
  };
}
// Provider
function createRandomProvider() {
  return {
    id: randomID(),
    image: randomImage(),
    firstName: randomName(),
    lastName: randomName(),
    specialties: [`${randomSpecialty()}`],
    type: randomProviderType(),
    status: randomStatus(),
  };
}
// Clinic
function createRandomClinic() {
  return {
    id: randomID(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    email: faker.internet.email(),
    state: faker.location.state(),
    name: faker.company.name(),
    phoneNumber: faker.phone.number(),
    type: `${faker.helpers.arrayElement(clinicTypes)}`, // displays as {optometry} in db...need to change that
    zipCode: faker.location.zipCode(),
  };
}

// PreOperationData
function createPatientContactData() {
  return {
    id: randomID(),
    contactNotes: faker.lorem.sentence(),
    dateAttemptedFirstContact: randomDate(),
    dateComanagerAware: randomDate(),
    dateInitialAppointmentScheduled: randomDate(),
    dateReferralReceived: randomDate(),
  };
}
// OperationData
function createPreOperationData() {
  return {
    id: randomID(),
    consultationReportSent: randomBoolean(),
    delayInSurgery: randomBoolean(),
    delayReason: randomString(),
    delayLetterSent: randomBoolean(),
    eyesToBeDone: randomEyes(), // left | right | both
    firstEyeSurgeryDate: randomDate(),
    firstEyeSurgeryType: randomSurgeryType(), // cataract, LASIK, etc.
    initialAppointmentCompleted: randomBoolean(),
    isComanage: randomBoolean(),
    reasonNotComanage: randomString(),
    reasonNoSurgeryScheduled: randomString(),
    secondEyeSurgeryDate: randomDate(),
    secondEyeSurgeryType: randomSurgeryType(), // cataract, LASIK, etc.
    surgeryScheduled: randomBoolean(), // could be calculated from date_surgery_scheduled != null
  };
}
// PostOperation

function createPostOperationData() {
  return {
    id: randomID(),
    amountToBePaidFromInsurance: randomNumber(),
    amountToPayProvider: randomNumber(),
    checkNumber: randomNumber(),
    checkDelivered: randomBoolean(),
    checkDeliveryPaperwork: randomBoolean(),
    contactedReferrer: randomBoolean(),
    generalNotes: randomString(),
    postOpVisitDate: randomDate(),
    postOpVisitType: faker.helpers.arrayElement([
      '1 day',
      '1 week',
      '1 month',
      '3 months',
      '6 months',
      '1 year',
    ]),
    reasonNotReferredBack: randomString(),
    referredBackToOriginalClinic: randomBoolean(),
    referralCompleted: randomBoolean(),
    referralCanceled: randomBoolean(),
    referralCanceledReason: randomString(),
    transferOfCare: randomBoolean(),
    transferOfCareDate: randomDate(),
    typeOfInsurance: faker.helpers.arrayElement([
      'commercial',
      'non-commercial',
    ]),
  };
}

const clinics = Array.from({ length: 5 }, createRandomClinic);
const patientContactData = Array.from({ length: 5 }, createPatientContactData);
const patients = Array.from({ length: 5 }, createRandomPatient);
const preOperationData = Array.from({ length: 5 }, createPreOperationData);
const postOperationData = Array.from({ length: 5 }, createPostOperationData);
const providers = Array.from({ length: 5 }, createRandomProvider);
const users = Array.from({ length: 5 }, createRandomUser);

export {
  clinics,
  patientContactData,
  patients,
  preOperationData,
  postOperationData,
  providers,
  users,
};
