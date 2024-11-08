// These fields are from schema.prisma from ProviderClinic model
export const providerClinicConsentFieldName = 'consentFormOnFile';

export const providerClinicDemographicsFieldName = 'hasDemographics';

export const providerClinicW9FieldName = 'hasW9';

export const uploadFileNames: { [key: string]: string } = {
  consentFormOnFile: 'Consent form',
  hasDemographics: 'Demographics',
  hasW9: 'W9',
};
