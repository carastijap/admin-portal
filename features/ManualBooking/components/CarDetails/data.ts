"use client";

export const availableCars = [
  {
    id: "car-1",
    image:
      "https://carasti-staging.s3.ap-south-1.amazonaws.com/user-documents/1760953815Tahoe_1.png",
    color: "Pearl White",
    numberPlate: "A 12345 Dubai",
    defleetDate: "2026-08-15",
    rates: [
      { term: "12 months", price: "5,999 AED" },
      { term: "24 months", price: "5,499 AED" },
      { term: "36 months", price: "4,999 AED" },
    ],
  },
  {
    id: "car-1a",
    image:
      "https://carasti-staging.s3.ap-south-1.amazonaws.com/user-documents/1760953815Tahoe_1.png",
    color: "Black",
    numberPlate: "A 12345 Dubai",
    defleetDate: "2026-08-29",
    rates: [
      { term: "12 months", price: "5,999 AED" },
      { term: "24 months", price: "5,499 AED" },
      { term: "36 months", price: "4,999 AED" },
    ],
  },
  {
    id: "car-2",
    image:
      "https://carasti-staging.s3.ap-south-1.amazonaws.com/user-documents/1760953815Tahoe_1.png",
    color: "Shadow Grey",
    numberPlate: "B 67890 Dubai",
    defleetDate: "2026-11-20",
    rates: [
      { term: "12 months", price: "5,899 AED" },
      { term: "24 months", price: "5,399 AED" },
    ],
  },
  {
    id: "car-3",
    image:
      "https://carasti-staging.s3.ap-south-1.amazonaws.com/user-documents/1760953815Tahoe_1.png",
    color: "Midnight Black",
    numberPlate: "C 11223 Abu Dhabi",
    defleetDate: "2027-02-10",
    rates: [
      { term: "12 months", price: "6,199 AED" },
      { term: "24 months", price: "5,699 AED" },
      { term: "36 months", price: "5,199 AED" },
    ],
  },
] as const;
