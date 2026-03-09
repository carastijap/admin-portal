"use client";

import * as React from "react";
import {
  getManualBookingFieldEditability,
  ManualBookingApiResponse,
  ManualBookingFieldEditability,
} from "../types";

const EMPTY_FIELD_EDITABILITY: ManualBookingFieldEditability = {
  carNumberPlateEditable: false,
  carChassisNumberEditable: false,
  carDefleetDateEditable: false,
  carOwnerEditable: false,
};

async function fetchManualBookingData(): Promise<ManualBookingApiResponse> {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return {
    customerSearch: "japeth-naval",
    carMake: "chevrolet",
    carModel: "tahoe",
    carTrim: "z71",
    carYear: "2024",
    carCategory: "suv",
    availableCarId: "car-1",
    carDuration: "12-months",
    price: "10999",
    supplierPrice: "9999",
    discountAmount: "500",
    carColor: "Pearl White",
    numberPlate: null,
    chassisNumber: "CHS-99882211",
    defleetDate: "2026-08-15",
    owner: null,
    basicMileageAllowance: "2500",
    depositOption: "refundable",
    depositFeeWaived: false,
    depositFees: {
      refundable: "5999",
      "no-deposit": "550",
    },
    insurancePackage: "comprehensive",
    insurancePackagePrices: {
      comprehensive: "450",
      standard: "300",
      basic: "0",
    },
    driverFeeWaived: false,
    additionalDriverFeePerDriver: "150",
    driverCount: 0,
    extraKmPackage: "km-1000",
    extraKmPackagePrices: {
      "km-500": "250",
      "km-1000": "450",
      "km-2000": "800",
      "km-unlimited": "1500",
    },
    extraKmWaived: false,
    deliveryMethod: "delivery",
    deliveryAddress: "Dubai Mall, Financial Center Rd, Downtown Dubai",
    startFees: "399",
    tintingFees: "0",
    upfrontFees: "0",
    voucherCode: "WELCOME2026",
  };
}

export function useManualBookingApiData(
  initialApiData?: ManualBookingApiResponse | null
) {
  const [apiData, setApiData] = React.useState<ManualBookingApiResponse | null>(
    initialApiData ?? null
  );
  const [fieldEditability, setFieldEditability] =
    React.useState<ManualBookingFieldEditability>(
      initialApiData
        ? getManualBookingFieldEditability(initialApiData)
        : EMPTY_FIELD_EDITABILITY
    );

  React.useEffect(() => {
    if (initialApiData) return;

    let isMounted = true;

    fetchManualBookingData().then((data) => {
      if (!isMounted) return;
      setApiData(data);
      setFieldEditability(getManualBookingFieldEditability(data));
    });

    return () => {
      isMounted = false;
    };
  }, [initialApiData]);

  return {
    apiData,
    fieldEditability,
  };
}
