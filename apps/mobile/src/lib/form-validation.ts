import * as Yup from "yup";

import {
  getCurrentCountryObj,
  validateCountryMobileNumber,
} from "@mobile/src/lib/CountryMobileRegex";

// Define individual schemas
const emailSchema = Yup.string()
  .email("Invalid email")
  .required("Email is required")
  .label("Email");

const passwordSchema = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .required("Password is required")
  .label("Password");

const strongPasswordSchema = Yup.string()
  .min(8)
  .max(32)
  .required()
  .test("strongPasswordTest", "Passwork is easy to guess", (value: any) => {
    switch (Boolean(value)) {
      case !/^(?=.*[a-z])/.test(value):
        return new Yup.ValidationError(
          `Password must include lowercase letter[a-z]`,
          null,
          "password"
        );
      case !/^(?=.*[A-Z])/.test(value):
        return new Yup.ValidationError(
          `Password must include uppercase letter[A-Z]`,
          null,
          "password"
        );
      case !/^(?=.*[0-9])/.test(value):
        return new Yup.ValidationError(
          `Password must include digit [0-9]`,
          null,
          "password"
        );
      case !/^(?=.*[!@#\$%\^&\*])/.test(value):
        return new Yup.ValidationError(
          `Password must include special [!@#$%^&*]`,
          null,
          "password"
        );
      default:
        return true;
    }
  })
  .label("Password");

const mobileSchema = Yup.string()
  .min(1, "Mobile number is required field")
  .max(19)
  .required()
  .label("Mobile")
  //@ts-ignore
  .test("strongPhoneTest", null, (value: any, ctx: any) => {
    const countryFormat: any =
      ctx?.parent?.country ??
      ctx?.parent?.currentCountry ??
      ctx?.options?.context?.country ??
      getCurrentCountryObj("in");

    const mobileWithCountryCode = countryFormat?.dialcode + value;

    const result = validateCountryMobileNumber(
      countryFormat?.shortcode,
      mobileWithCountryCode
    );

    if (result) {
      return true;
    } else {
      return new Yup.ValidationError(
        `Invalid mobile number for ${countryFormat?.name}`,
        null,
        "mobile"
      );
    }
  });

const countrySchema = Yup.mixed().required("Country is required");

export const registerFormSchema = Yup.object().shape({
  email: emailSchema,
  mobile: mobileSchema,
  password: passwordSchema,
  country: countrySchema,
  dropdown: Yup.string().required("Dropdown is required"),
});

export const loginFormSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema
});

export type ILoginForm = Yup.InferType<typeof loginFormSchema>;

export const mobileLoginFormSchema = Yup.object().shape({
  mobile: mobileSchema,
  country: countrySchema,
});

export const forgetPasswordFormSchema = Yup.object().shape({
  email: emailSchema,
});

export const resetPasswordFormSchema = Yup.object().shape({
  password: strongPasswordSchema,
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .label("Confirm password"),
});

//Contact add note form schema
export const AddNoteFormSchema = Yup.object().shape({
  contact_id: Yup.string().required("Contact is required"),
  context: Yup.string().required("Context is required"),
});

export type IAddNoteForm = Yup.InferType<typeof AddNoteFormSchema>;

// Contact add note form schema
export const ChangeLifeCycleStageForm = Yup.object().shape({
  lifecycle_stage: Yup.string().required("Stage is required"),
  lifecycle_stage_status: Yup.string().required("Status is required"),
  lost_reason: Yup.string(),
  other_lost_reason: Yup.string(),
});

export type IChangeLifeCycleStageForm = Yup.InferType<
  typeof ChangeLifeCycleStageForm
>;

export const AddContactFormSchema = Yup.object().shape({
  first_name: Yup.string(),
  last_name: Yup.string(),
  email: Yup.string()
    .email("Invalid email")
    .test("email-or-mobile-required", "Email is required", function (value) {
      return value || this.parent.mobile_phone_number;
    }),
  country: Yup.object(),  
  mobile_phone_number: Yup.string()
  .test(
    "email-or-mobile-required",
    "Mobile Phone Number is required",
    function (value) {
      return value || this.parent.email;
    }
  )
  .test("valid-mobile", "Invalid country code number", function (value) {
    const { country } = this.parent; // Access the country value dynamically
    if (value) {
      if (!country || !country.dialcode) {
        return this.createError({
          message: "Country selection is required for a valid mobile number",
        });
      }
      try {
        const countryCode = country.dialcode; // Extract the country code
        mobileSchema.validateSync(value, { context: { country } }); // Pass the country code to your schema
        return true;
      } catch (error: any) {
        return this.createError({ message: error.message });
      }
    }
    return true; // Skip if no mobile number is provided
  }),
});

export type IAddContactForm = Yup.InferType<typeof AddContactFormSchema>;

// Change Conatct Owner Form Schema
export const ChangeContactOwnerForm = Yup.object().shape({
  contact_owner: Yup.string().required("Contact Owner is required"),
});

export type IChangeContactOwnerForm = Yup.InferType<
  typeof ChangeContactOwnerForm
>;

export const ChangeContactPropertyForm = Yup.object().shape({
  contact_property: Yup.string().required("required"),
});

export type IChangeContactPropertyForm = Yup.InferType<
  typeof ChangeContactPropertyForm
>;

export const AddTaskFormSchema = Yup.object().shape({
  mark_as_completed: Yup.boolean(),
  task_title: Yup.string().required("Task title is required"),
  task_type: Yup.string().required("Task type is required"),
  task_date: Yup.date().required("Date and time are required"),
  related_to: Yup.string(),
  task_owner: Yup.string().required("Task owner is required"),
  task_time: Yup.string().nullable(),
  task_outcome: Yup.string()
    .nullable() // Ensures it's nullable by default
    .when("mark_as_completed", {
      is: true,
      then: (schema) => schema.required("Outcome is required"),
      otherwise: (schema) => schema.nullable(),
    }),
  task_description: Yup.string().nullable(),
  task_priority: Yup.string().nullable(),
});

export type IAddTaskForm = Yup.InferType<typeof AddTaskFormSchema>;
