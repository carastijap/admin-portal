"use client";

import { FormAutocomplete } from "@/components/form";
import { customerSearchItems } from "./data";

export function CustomerSearchSection() {
  return (
    <>
      <h2 className="text-lg font-semibold">User information</h2>
      <FormAutocomplete
        name="customerSearch"
        items={[...customerSearchItems]}
        placeholder="Search by name, email or phone..."
      />
    </>
  );
}
