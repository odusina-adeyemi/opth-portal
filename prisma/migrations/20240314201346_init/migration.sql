-- CreateTable
CREATE TABLE "clinics" (
    "id" SERIAL NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "email" TEXT,
    "insurance_payment_id" INTEGER,
    "state" TEXT,
    "name" TEXT,
    "phone_number" TEXT,
    "providerIds" INTEGER[],
    "type" TEXT,
    "userIds" INTEGER[],
    "zip_code" TEXT,

    CONSTRAINT "clinics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insurance_payments" (
    "id" SERIAL NOT NULL,
    "amount_payable" INTEGER,
    "amount_paid_to_provider" INTEGER,
    "amount_receivable_insurance" INTEGER,
    "check_number" INTEGER,
    "check_delivered" BOOLEAN,
    "check_delivery_paperwork" TEXT,
    "date_insurance_paid" DATE,
    "date_paid_provider" DATE,
    "insurance_company" TEXT,
    "is_commercial_insurance" BOOLEAN,
    "patient_id" INTEGER,

    CONSTRAINT "insurance_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operations" (
    "id" SERIAL NOT NULL,
    "clinic_id" INTEGER,
    "consultation_report_sent" BOOLEAN,
    "delay_in_surgery" BOOLEAN,
    "delay_reason" TEXT,
    "delay_letter_sent" BOOLEAN,
    "eyes_to_be_done" TEXT,
    "first_eye_surgery_date" DATE,
    "first_eye_surgery_type" TEXT,
    "initial_appointment_completed" BOOLEAN,
    "is_comanage" BOOLEAN,
    "patient_id" INTEGER,
    "reason_not_comanage" TEXT,
    "reason_no_surgery_scheduled" TEXT,
    "second_eye_surgery_date" DATE,
    "second_eye_surgery_type" TEXT,
    "surgery_scheduled" BOOLEAN,
    "transfer_of_care" BOOLEAN,
    "transfer_of_care_date" DATE,

    CONSTRAINT "operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" SERIAL NOT NULL,
    "clinic_id" INTEGER,
    "dob" DATE,
    "email" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "operation_id" INTEGER,
    "phone_number" TEXT,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_operations" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER,
    "clinic_id" INTEGER,
    "provider_id" INTEGER,
    "amount_to_be_paid_non_commercial_insurance" INTEGER,
    "check_number" INTEGER,
    "check_delivered" BOOLEAN,
    "check_delivery_paperwork" TEXT,
    "commercial_amount_paid" INTEGER,
    "contacted_referrer" BOOLEAN,
    "insurance_amount_to_be_paid" INTEGER,
    "general_notes" TEXT,
    "reason_not_referred_back" TEXT,
    "referred_back_to_original_clinic" BOOLEAN,
    "referral_completed" BOOLEAN,
    "referral_canceled" BOOLEAN,
    "referral_canceled_reason" TEXT,
    "type_of_insurance" TEXT,
    "post_op_visit_date" DATE,
    "post_op_visit_type" TEXT,

    CONSTRAINT "post_operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pre_operations" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER,
    "clinic_id" INTEGER,
    "provider_id" INTEGER,
    "contact_notes" TEXT,
    "date_attempted_first_contact" DATE,
    "date_comanager_aware" DATE,
    "date_initial_appointment_scheduled" DATE,
    "date_referral_received" DATE,

    CONSTRAINT "pre_operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "image" TEXT,
    "insurance_payment_id" INTEGER,
    "last_name" TEXT,
    "specialty" TEXT,
    "status" TEXT,
    "type" TEXT,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "clinic_id" INTEGER,
    "first_name" TEXT,
    "last_name" TEXT,
    "username" TEXT,
    "email" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClinicToProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_OperationToProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PatientToProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_email_key" ON "patients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ClinicToProvider_AB_unique" ON "_ClinicToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_ClinicToProvider_B_index" ON "_ClinicToProvider"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OperationToProvider_AB_unique" ON "_OperationToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_OperationToProvider_B_index" ON "_OperationToProvider"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PatientToProvider_AB_unique" ON "_PatientToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientToProvider_B_index" ON "_PatientToProvider"("B");

-- AddForeignKey
ALTER TABLE "clinics" ADD CONSTRAINT "clinics_insurance_payment_id_fkey" FOREIGN KEY ("insurance_payment_id") REFERENCES "insurance_payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insurance_payments" ADD CONSTRAINT "insurance_payments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_operations" ADD CONSTRAINT "post_operations_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_operations" ADD CONSTRAINT "post_operations_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_operations" ADD CONSTRAINT "post_operations_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pre_operations" ADD CONSTRAINT "pre_operations_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pre_operations" ADD CONSTRAINT "pre_operations_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pre_operations" ADD CONSTRAINT "pre_operations_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "providers" ADD CONSTRAINT "providers_insurance_payment_id_fkey" FOREIGN KEY ("insurance_payment_id") REFERENCES "insurance_payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToProvider" ADD CONSTRAINT "_ClinicToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClinicToProvider" ADD CONSTRAINT "_ClinicToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OperationToProvider" ADD CONSTRAINT "_OperationToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OperationToProvider" ADD CONSTRAINT "_OperationToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToProvider" ADD CONSTRAINT "_PatientToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToProvider" ADD CONSTRAINT "_PatientToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
