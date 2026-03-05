export type AdditionalDriver = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type InsurancePackageId = "comprehensive" | "standard" | "basic";
type ExtraKmPackageId = "km-500" | "km-1000" | "km-2000" | "km-unlimited";
type DepositOption = "refundable" | "no-deposit";

export type ManualBookingFormValues = {
  customerSearch: string;
  carMake: string;
  carModel: string;
  carTrim: string;
  carYear: string;
  carCategory: string;
  availableCarId: string;
  carDuration: string;
  carPrice: string;
  carSupplierPrice: string;
  carDiscountAmount: string;
  carColor: string;
  carNumberPlate: string;
  carChassisNumber: string;
  carDefleetDate: string;
  carOwner: string;
  carMileageAllowance: string;
  depositOption: DepositOption;
  depositFeeWaived: boolean;
  depositFees: Record<DepositOption, string>;
  depositFeeAmount: string;
  insurancePackage: InsurancePackageId;
  insuranceWaived: boolean;
  insurancePackagePrices: Record<InsurancePackageId, string>;
  insuranceAppliedPrice: string;
  driverFeeWaived: boolean;
  additionalDriverFeePerDriver: string;
  driverCount: number;
  additionalDriversAppliedFee: string;
  additionalDrivers: AdditionalDriver[];
  extraKmPackage: ExtraKmPackageId;
  extraKmWaived: boolean;
  extraKmPackagePrices: Record<ExtraKmPackageId, string>;
  extraKmAppliedPrice: string;
  deliveryMethod: string;
  deliveryDate: string;
  deliveryCity: string;
  deliveryAddress: string;
  deliveryTimeSlot: string;
  pickupLocation: string;
  deliveryFeeWaived: boolean;
  startFeesBase: string;
  startFeesWaived: boolean;
  startFees: string;
  tintingFees: string;
  upfrontFees: string;
  useWalletCredit: boolean;
  voucherCode: string;
  paymentMethod: string;
  savedCard: string;
};

export type ManualBookingFieldEditability = {
  carNumberPlateEditable: boolean;
  carChassisNumberEditable: boolean;
  carDefleetDateEditable: boolean;
  carOwnerEditable: boolean;
};

export type ManualBookingApiResponse = {
  customerSearch?: string | null;
  carMake?: string | null;
  carModel?: string | null;
  carTrim?: string | null;
  carYear?: string | null;
  carCategory?: string | null;
  availableCarId?: string | null;
  carDuration?: string | null;
  price?: string | number | null;
  supplierPrice?: string | number | null;
  discountAmount?: string | number | null;
  carColor?: string | null;
  numberPlate?: string | null;
  chassisNumber?: string | null;
  defleetDate?: string | null;
  owner?: string | null;
  basicMileageAllowance?: string | number | null;
  depositOption?: DepositOption | null;
  depositFeeWaived?: boolean | null;
  depositFees?: Partial<Record<DepositOption, string | number | null>> | null;
  insurancePackage?: InsurancePackageId | null;
  insuranceWaived?: boolean | null;
  insurancePackagePrices?: Partial<Record<InsurancePackageId, string | number | null>> | null;
  driverFeeWaived?: boolean | null;
  additionalDriverFeePerDriver?: string | number | null;
  driverCount?: number | null;
  extraKmPackage?: ExtraKmPackageId | null;
  extraKmWaived?: boolean | null;
  extraKmPackagePrices?: Partial<Record<ExtraKmPackageId, string | number | null>> | null;
  deliveryMethod?: string | null;
  deliveryDate?: string | null;
  deliveryCity?: string | null;
  deliveryAddress?: string | null;
  deliveryTimeSlot?: string | null;
  pickupLocation?: string | null;
  deliveryFeeWaived?: boolean | null;
  startFees?: string | number | null;
  startFeesWaived?: boolean | null;
  tintingFees?: string | number | null;
  upfrontFees?: string | number | null;
  useWalletCredit?: boolean | null;
  voucherCode?: string | null;
  paymentMethod?: string | null;
  savedCard?: string | null;
};

const asString = (value: string | number | null | undefined, fallback = "") =>
  value === null || value === undefined ? fallback : String(value);

export const getManualBookingInitialValues = (): ManualBookingFormValues => ({
  customerSearch: "",
  carMake: "",
  carModel: "",
  carTrim: "",
  carYear: "",
  carCategory: "",
  availableCarId: "car-1",
  carDuration: "",
  carPrice: "",
  carSupplierPrice: "",
  carDiscountAmount: "",
  carColor: "",
  carNumberPlate: "",
  carChassisNumber: "",
  carDefleetDate: "",
  carOwner: "",
  carMileageAllowance: "",
  depositOption: "refundable",
  depositFeeWaived: false,
  depositFees: {
    refundable: "5999",
    "no-deposit": "450",
  },
  depositFeeAmount: "5999",
  insurancePackage: "comprehensive",
  insuranceWaived: false,
  insurancePackagePrices: {
    comprehensive: "450",
    standard: "300",
    basic: "0",
  },
  insuranceAppliedPrice: "450",
  driverFeeWaived: false,
  additionalDriverFeePerDriver: "150",
  driverCount: 0,
  additionalDriversAppliedFee: "0",
  additionalDrivers: [],
  extraKmPackage: "km-1000",
  extraKmWaived: false,
  extraKmPackagePrices: {
    "km-500": "250",
    "km-1000": "450",
    "km-2000": "800",
    "km-unlimited": "1500",
  },
  extraKmAppliedPrice: "450",
  deliveryMethod: "delivery",
  deliveryDate: "",
  deliveryCity: "",
  deliveryAddress: "",
  deliveryTimeSlot: "",
  pickupLocation: "",
  deliveryFeeWaived: false,
  startFeesBase: "399",
  startFeesWaived: false,
  startFees: "399",
  tintingFees: "0",
  upfrontFees: "0",
  useWalletCredit: false,
  voucherCode: "",
  paymentMethod: "",
  savedCard: "",
});

export const mapApiResponseToManualBookingForm = (
  apiData: ManualBookingApiResponse
): ManualBookingFormValues => {
  const initialValues = getManualBookingInitialValues();

  const depositOption = apiData.depositOption ?? initialValues.depositOption;
  const depositFees = {
    refundable: asString(apiData.depositFees?.refundable, initialValues.depositFees.refundable),
    "no-deposit": asString(
      apiData.depositFees?.["no-deposit"],
      initialValues.depositFees["no-deposit"]
    ),
  };
  const depositFeeWaived = Boolean(apiData.depositFeeWaived);

  const insurancePackage = apiData.insurancePackage ?? initialValues.insurancePackage;
  const insurancePackagePrices = {
    comprehensive: asString(
      apiData.insurancePackagePrices?.comprehensive,
      initialValues.insurancePackagePrices.comprehensive
    ),
    standard: asString(
      apiData.insurancePackagePrices?.standard,
      initialValues.insurancePackagePrices.standard
    ),
    basic: asString(apiData.insurancePackagePrices?.basic, initialValues.insurancePackagePrices.basic),
  };
  const insuranceWaived = Boolean(apiData.insuranceWaived);

  const extraKmPackage = apiData.extraKmPackage ?? initialValues.extraKmPackage;
  const extraKmPackagePrices = {
    "km-500": asString(apiData.extraKmPackagePrices?.["km-500"], initialValues.extraKmPackagePrices["km-500"]),
    "km-1000": asString(
      apiData.extraKmPackagePrices?.["km-1000"],
      initialValues.extraKmPackagePrices["km-1000"]
    ),
    "km-2000": asString(
      apiData.extraKmPackagePrices?.["km-2000"],
      initialValues.extraKmPackagePrices["km-2000"]
    ),
    "km-unlimited": asString(
      apiData.extraKmPackagePrices?.["km-unlimited"],
      initialValues.extraKmPackagePrices["km-unlimited"]
    ),
  };
  const extraKmWaived = Boolean(apiData.extraKmWaived);

  const additionalDriverFeePerDriver = asString(
    apiData.additionalDriverFeePerDriver,
    initialValues.additionalDriverFeePerDriver
  );
  const driverCount = Math.min(2, Math.max(0, Number(apiData.driverCount ?? initialValues.driverCount) || 0));
  const driverFeeWaived = Boolean(apiData.driverFeeWaived);

  const startFeesBase = asString(apiData.startFees, initialValues.startFeesBase);
  const startFeesWaived = Boolean(apiData.startFeesWaived);

  return {
    ...initialValues,
    customerSearch: asString(apiData.customerSearch),
    carMake: asString(apiData.carMake),
    carModel: asString(apiData.carModel),
    carTrim: asString(apiData.carTrim),
    carYear: asString(apiData.carYear),
    carCategory: asString(apiData.carCategory),
    availableCarId: asString(apiData.availableCarId, initialValues.availableCarId),
    carDuration: asString(apiData.carDuration),
    carPrice: asString(apiData.price),
    carSupplierPrice: asString(apiData.supplierPrice),
    carDiscountAmount: asString(apiData.discountAmount),
    carColor: asString(apiData.carColor),
    carNumberPlate: asString(apiData.numberPlate),
    carChassisNumber: asString(apiData.chassisNumber),
    carDefleetDate: asString(apiData.defleetDate),
    carOwner: asString(apiData.owner),
    carMileageAllowance: asString(apiData.basicMileageAllowance),
    depositOption,
    depositFeeWaived,
    depositFees,
    depositFeeAmount: depositFeeWaived ? "0" : depositFees[depositOption],
    insurancePackage,
    insuranceWaived,
    insurancePackagePrices,
    insuranceAppliedPrice: insuranceWaived ? "0" : insurancePackagePrices[insurancePackage],
    driverFeeWaived,
    additionalDriverFeePerDriver,
    driverCount,
    additionalDriversAppliedFee: driverFeeWaived
      ? "0"
      : String((Number(additionalDriverFeePerDriver) || 0) * driverCount),
    extraKmPackage,
    extraKmWaived,
    extraKmPackagePrices,
    extraKmAppliedPrice: extraKmWaived ? "0" : extraKmPackagePrices[extraKmPackage],
    deliveryMethod: asString(apiData.deliveryMethod, initialValues.deliveryMethod),
    deliveryDate: asString(apiData.deliveryDate),
    deliveryCity: asString(apiData.deliveryCity),
    deliveryAddress: asString(apiData.deliveryAddress),
    deliveryTimeSlot: asString(apiData.deliveryTimeSlot),
    pickupLocation: asString(apiData.pickupLocation),
    deliveryFeeWaived: Boolean(apiData.deliveryFeeWaived),
    startFeesBase,
    startFeesWaived,
    startFees: startFeesWaived ? "0" : startFeesBase,
    tintingFees: asString(apiData.tintingFees, initialValues.tintingFees),
    upfrontFees: asString(apiData.upfrontFees, initialValues.upfrontFees),
    useWalletCredit: Boolean(apiData.useWalletCredit),
    voucherCode: asString(apiData.voucherCode, initialValues.voucherCode),
    paymentMethod: asString(apiData.paymentMethod),
    savedCard: asString(apiData.savedCard),
  };
};

export const getManualBookingFieldEditability = (
  apiData: ManualBookingApiResponse
): ManualBookingFieldEditability => ({
  carNumberPlateEditable: apiData.numberPlate == null,
  carChassisNumberEditable: apiData.chassisNumber == null,
  carDefleetDateEditable: apiData.defleetDate == null,
  carOwnerEditable: apiData.owner == null,
});