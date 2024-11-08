export const patient_data = [
  {
    // id: 1,
    provider: 'Appleseed, John',
    clinic_name: 'Eye Dudes',
    clinic_location: 'CA',
    provider_paperwork_up_to_date: false,
    surgeon: 'Brimhall',
    patient_first_name: 'Vanilla',
    patient_last_name: 'Sugarpie',
    patient_dob: new Date(),
    provider_status: 'High Risk',

    date_referral_received: new Date('1/11/18'),
    date_comanager_aware: new Date('1/11/18'),
    date_first_contact_attempt: new Date('1/11/18'),
    contact_attempt_notes: 'NOTES',
    date_appointment_set: new Date('4/3/18'),

    initial_appointment_completed: false,
    consultation_report_sent: false,
    comanagement: false,
    reason_no_comanagement: 'Reason',
    surgery_scheduled: false,
    reason_no_surgery_scheduled: 'Reason',
    left_eye: false,
    right_eye: false,
    both_eyes: false,
    first_surgery_scheduled: false,
    second_surgery_scheduled: false,
    first_eye_completed: false,
    second_eye_compeleted: false,
    surgery_delay: false,
    surgical_delay_reason: 'Reason',
    delay_letter_sent: false,
    transfer_of_care_letter: false,

    date_post_op_visit: '',
    post_op_note_received: false,
    billed_wholly_by_referrer: false,
    amount_paid_by_noncomm: 10,
    amount_paid_by_comm: 10,
    check_number: 1001,
    check_delivered: false,
    check_delivery_paperwork: 's3.aws.image.here',
    reason_not_referred_back: 'Reason',
    contacted_referrer_about_reason: 'Reason',
    referral_completed: false,
    referral_canceled: false,
    notes: '',
  },
  {
    // id: 1,
    provider: 'Appleseed, John',
    clinic_name: 'Eye Dudes',
    clinic_location: 'CA',
    provider_paperwork_up_to_date: false,
    surgeon: 'Brimhall',
    patient_first_name: 'Vanilla',
    patient_last_name: 'Sugarpie',
    patient_dob: new Date(),
    provider_status: 'High Risk',

    date_referral_received: new Date('1/11/18'),
    date_comanager_aware: new Date('1/11/18'),
    date_first_contact_attempt: new Date('1/11/18'),
    contact_attempt_notes: 'NOTES',
    date_appointment_set: new Date('4/3/18'),

    initial_appointment_completed: false,
    consultation_report_sent: false,
    comanagement: false,
    reason_no_comanagement: 'Reason',
    surgery_scheduled: false,
    reason_no_surgery_scheduled: 'Reason',
    left_eye: false,
    right_eye: false,
    both_eyes: false,
    first_surgery_scheduled: false,
    second_surgery_scheduled: false,
    first_eye_completed: false,
    second_eye_compeleted: false,
    surgery_delay: false,
    surgical_delay_reason: 'Reason',
    delay_letter_sent: false,
    transfer_of_care_letter: false,

    date_post_op_visit: Date.now(),
    post_op_note_received: false,
    billed_wholly_by_referrer: false,
    amount_paid_by_noncomm: 10,
    amount_paid_by_comm: 10,
    check_number: 1001,
    check_delivered: false,
    check_delivery_paperwork: 's3.aws.image.here',
    reason_not_referred_back: 'Reason',
    contacted_referrer_about_reason: 'Reason',
    referral_completed: false,
    referral_canceled: false,
    notes: '',
  },
];

export const demographicPatientData = [
  {
    id: 1, // not editable, from db
    provider: 'Appleseed, John', // string
    clinic_name: 'Eye Dudes', // string
    clinic_location: 'CA', // singleSelect from list of clinics...or states?
    provider_paperwork_up_to_date: false, // boolean
    surgeon: 'Brimhall', // singleSelect; list of surgeons for that practice
    patient_first_name: 'Vanilla', // string
    patient_last_name: 'Sugarpie', // string
    patient_dob: new Date('1/1/54'), // date
    provider_status: 'High Risk', // string use a valueFormatter here
  },
  {
    id: 2, // not editable, from db
    provider: 'Stark, Tony', // string
    clinic_name: 'Eye Bros', // string
    clinic_location: 'CA', // singleSelect from list of clinics...or states?
    provider_paperwork_up_to_date: false, // boolean
    surgeon: 'Brimhall', // singleSelect; list of surgeons for that practice
    patient_first_name: 'Clea', // string
    patient_last_name: 'Rogansan', // string
    patient_dob: new Date('1/5/74'), // date
    provider_status: 'High Risk', // string use a valueFormatter here
  },
  {
    id: 3, // not editable, from db
    provider: 'Stark, Tony', // string
    clinic_name: 'Eye Bros', // string
    clinic_location: 'CA', // singleSelect from list of clinics...or states?
    provider_paperwork_up_to_date: false, // boolean
    surgeon: 'Brimhall', // singleSelect; list of surgeons for that practice
    patient_first_name: 'Clea', // string
    patient_last_name: 'Rogansan', // string
    patient_dob: new Date('1/5/74'), // date
    provider_status: 'High Risk', // string use a valueFormatter here
  },
  {
    id: 4, // not editable, from db
    provider: 'Pippa', // string
    clinic_name: 'Silly Laser', // string
    clinic_location: 'CA', // singleSelect from list of clinics...or states?
    provider_paperwork_up_to_date: false, // boolean
    surgeon: 'Brimhall', // singleSelect; list of surgeons for that practice
    patient_first_name: 'Clea', // string
    patient_last_name: 'Rogansan', // string
    patient_dob: new Date('1/5/74'), // date
    provider_status: 'High Risk', // string use a valueFormatter here
  },
  {
    id: 23, // not editable, from db
    provider: 'James, Lebron', // string
    clinic_name: 'Champ Eyes', // string
    clinic_location: 'CA', // singleSelect from list of clinics...or states?
    provider_paperwork_up_to_date: false, // boolean
    surgeon: 'Brimhall', // singleSelect; list of surgeons for that practice
    patient_first_name: 'Clea', // string
    patient_last_name: 'Rogansan', // string
    patient_dob: new Date('1/5/74'), // date
    provider_status: 'High Risk', // string use a valueFormatter here
  },
  {
    id: 6, // not editable, from db
    provider: 'Loki', // string
    clinic_name: 'Avenger Eye', // string
    clinic_location: 'CA', // singleSelect from list of clinics...or states?
    provider_paperwork_up_to_date: false, // boolean
    surgeon: 'Brimhall', // singleSelect; list of surgeons for that practice
    patient_first_name: 'Clea', // string
    patient_last_name: 'Rogansan', // string
    patient_dob: new Date('1/5/74'), // date
    provider_status: 'High Risk', // string use a valueFormatter here
  },
];

export const preOpPatientData = [
  {
    // id: 2,
    date_referral_received: new Date('1/10/18'), // date
    date_comanager_aware: new Date('1/11/18'), // date
    date_first_contact_attempt: new Date('1/11/18'), // date
    contact_attempt_notes: 'NOTES', // string
    date_appointment_set: new Date('4/3/18'), // date
  },
  {
    // id: 3,
    date_referral_received: new Date('1/10/18'), // date
    date_comanager_aware: new Date('1/11/18'), // date
    date_first_contact_attempt: new Date('1/11/18'), // date
    contact_attempt_notes: 'NOTES', // string
    date_appointment_set: new Date('4/3/18'), // date
  },
  {
    // id: 3,
    date_referral_received: new Date('1/10/18'), // date
    date_comanager_aware: new Date('1/11/18'), // date
    date_first_contact_attempt: new Date('1/11/18'), // date
    contact_attempt_notes: 'NOTES', // string
    date_appointment_set: new Date('4/3/18'), // date
  },
  {
    // id: 3,
    date_referral_received: new Date('1/10/18'), // date
    date_comanager_aware: new Date('1/11/18'), // date
    date_first_contact_attempt: new Date('1/11/18'), // date
    contact_attempt_notes: 'NOTES', // string
    date_appointment_set: new Date('4/3/18'), // date
  },
  {
    // id: 3,
    date_referral_received: new Date('1/10/18'), // date
    date_comanager_aware: new Date('1/11/18'), // date
    date_first_contact_attempt: new Date('1/11/18'), // date
    contact_attempt_notes: 'NOTES', // string
    date_appointment_set: new Date('4/3/18'), // date
  },
  {
    // id: 3,
    date_referral_received: new Date('1/10/18'), // date
    date_comanager_aware: new Date('1/11/18'), // date
    date_first_contact_attempt: new Date('1/11/18'), // date
    contact_attempt_notes: 'NOTES', // string
    date_appointment_set: new Date('4/3/18'), // date
  },
];

export const OpPatientData = [
  {
    initial_appointment_completed: false,
    consultation_report_sent: false,
    comanagement: false,
    reason_no_comanagement:
      'Reason well the reasons are many. Let me count the ways. I dont like it when somebody has to watch over me and micromanage me',
    surgery_scheduled: false,
    reason_no_surgery_scheduled: 'Reason',
    left_eye: false,
    right_eye: false,
    both_eyes: false,
    first_surgery_scheduled: false,
    second_surgery_scheduled: false,
    first_eye_completed: false,
    second_eye_compeleted: false,
    surgery_delay: false,
    surgical_delay_reason: 'Reason',
    delay_letter_sent: false,
    transfer_of_care_letter: false,
  },
  {
    initial_appointment_completed: false,
    consultation_report_sent: false,
    comanagement: false,
    reason_no_comanagement: 'Reason',
    surgery_scheduled: false,
    reason_no_surgery_scheduled: 'Reason',
    left_eye: false,
    right_eye: false,
    both_eyes: false,
    first_surgery_scheduled: false,
    second_surgery_scheduled: false,
    first_eye_completed: false,
    second_eye_compeleted: false,
    surgery_delay: false,
    surgical_delay_reason: 'Reason',
    delay_letter_sent: false,
    transfer_of_care_letter: false,
  },
  {
    initial_appointment_completed: false,
    consultation_report_sent: false,
    comanagement: false,
    reason_no_comanagement: 'Reason',
    surgery_scheduled: false,
    reason_no_surgery_scheduled: 'Reason',
    left_eye: false,
    right_eye: false,
    both_eyes: false,
    first_surgery_scheduled: false,
    second_surgery_scheduled: false,
    first_eye_completed: false,
    second_eye_compeleted: false,
    surgery_delay: false,
    surgical_delay_reason: 'Reason',
    delay_letter_sent: false,
    transfer_of_care_letter: false,
  },
  {
    initial_appointment_completed: false,
    consultation_report_sent: false,
    comanagement: false,
    reason_no_comanagement: 'Reason',
    surgery_scheduled: false,
    reason_no_surgery_scheduled: 'Reason',
    left_eye: false,
    right_eye: false,
    both_eyes: false,
    first_surgery_scheduled: false,
    second_surgery_scheduled: false,
    first_eye_completed: false,
    second_eye_compeleted: false,
    surgery_delay: false,
    surgical_delay_reason: 'Reason',
    delay_letter_sent: false,
    transfer_of_care_letter: false,
  },
  {
    initial_appointment_completed: false,
    consultation_report_sent: false,
    comanagement: false,
    reason_no_comanagement: 'Reason',
    surgery_scheduled: false,
    reason_no_surgery_scheduled: 'Reason',
    left_eye: false,
    right_eye: false,
    both_eyes: false,
    first_surgery_scheduled: false,
    second_surgery_scheduled: false,
    first_eye_completed: false,
    second_eye_compeleted: false,
    surgery_delay: false,
    surgical_delay_reason: 'Reason',
    delay_letter_sent: false,
    transfer_of_care_letter: false,
  },
  {
    initial_appointment_completed: false,
    consultation_report_sent: false,
    comanagement: false,
    reason_no_comanagement: 'Reason',
    surgery_scheduled: false,
    reason_no_surgery_scheduled: 'Reason',
    left_eye: false,
    right_eye: false,
    both_eyes: false,
    first_surgery_scheduled: false,
    second_surgery_scheduled: false,
    first_eye_completed: false,
    second_eye_compeleted: false,
    surgery_delay: false,
    surgical_delay_reason: 'Reason',
    delay_letter_sent: false,
    transfer_of_care_letter: false,
  },
];

export const postOpPatientData = [
  {
    date_post_op_visit: '',
    post_op_note_received: false,
    billed_wholly_by_referrer: false,
    amount_paid_by_noncomm: 10, // number, valueFormatter
    amount_paid_by_comm: 10, // number, valueFormatter
    check_number: 1001, // number
    check_delivered: false,
    check_delivery_paperwork: 's3.aws.image.here',
    reason_not_referred_back: 'Reason',
    contacted_referrer_about_reason: 'Reason',
    referral_completed: false,
    referral_canceled: false,
    notes: '', // string
  },
  {
    date_post_op_visit: '',
    post_op_note_received: false,
    billed_wholly_by_referrer: false,
    amount_paid_by_noncomm: 10, // number, valueFormatter
    amount_paid_by_comm: 10, // number, valueFormatter
    check_number: 1001, // number
    check_delivered: false,
    check_delivery_paperwork: 's3.aws.image.here',
    reason_not_referred_back: 'Reason',
    contacted_referrer_about_reason: 'Reason',
    referral_completed: false,
    referral_canceled: false,
    notes: '', // string
  },
  {
    date_post_op_visit: '',
    post_op_note_received: false,
    billed_wholly_by_referrer: false,
    amount_paid_by_noncomm: 10, // number, valueFormatter
    amount_paid_by_comm: 10, // number, valueFormatter
    check_number: 1001, // number
    check_delivered: false,
    check_delivery_paperwork: 's3.aws.image.here',
    reason_not_referred_back: 'Reason',
    contacted_referrer_about_reason: 'Reason',
    referral_completed: false,
    referral_canceled: false,
    notes: '', // string
  },
  {
    date_post_op_visit: '',
    post_op_note_received: false,
    billed_wholly_by_referrer: false,
    amount_paid_by_noncomm: 10, // number, valueFormatter
    amount_paid_by_comm: 10, // number, valueFormatter
    check_number: 1001, // number
    check_delivered: false,
    check_delivery_paperwork: 's3.aws.image.here',
    reason_not_referred_back: 'Reason',
    contacted_referrer_about_reason: 'Reason',
    referral_completed: false,
    referral_canceled: false,
    notes: '', // string
  },
  {
    date_post_op_visit: '',
    post_op_note_received: false,
    billed_wholly_by_referrer: false,
    amount_paid_by_noncomm: 10, // number, valueFormatter
    amount_paid_by_comm: 10, // number, valueFormatter
    check_number: 1001, // number
    check_delivered: false,
    check_delivery_paperwork: 's3.aws.image.here',
    reason_not_referred_back: 'Reason',
    contacted_referrer_about_reason: 'Reason',
    referral_completed: false,
    referral_canceled: false,
    notes: '', // string
  },
  {
    date_post_op_visit: '',
    post_op_note_received: false,
    billed_wholly_by_referrer: false,
    amount_paid_by_noncomm: 10, // number, valueFormatter
    amount_paid_by_comm: 10, // number, valueFormatter
    check_number: 1001, // number
    check_delivered: false,
    check_delivery_paperwork: 's3.aws.image.here',
    reason_not_referred_back: 'Reason',
    contacted_referrer_about_reason: 'Reason',
    referral_completed: false,
    referral_canceled: false,
    notes: '', // string
  },
];
