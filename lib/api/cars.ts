import { clientGet, clientPost, ClientFetchOptions } from "@/utils/client";
import { endpoints } from "@/lib/constants/endpoints";
import { transformCarDetails } from "../transformers/transformCarDetails";

export type CarDetailsResponse = Record<string, unknown>;
export type CarDetailsPayload = Record<string, unknown>;

export async function getCarDetails(
  options?: ClientFetchOptions
): Promise<CarDetailsResponse | null> {
  return clientGet<CarDetailsResponse>(endpoints.carDetails, options, transformCarDetails);
}

export async function postCarDetails(
  payload: CarDetailsPayload,
  options?: ClientFetchOptions
): Promise<CarDetailsResponse | null> {
  return clientPost<CarDetailsResponse, CarDetailsPayload>(
    endpoints.carDetailsSubmit,
    payload,
    options,
    transformCarDetails
  );
}
