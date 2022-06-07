import { Country } from "../constants/countryModel";
import { ValidationError } from "../constants/validationErrorModel";

const JWT_API_URL = import.meta.env.VITE_JWT_API_URL;

interface ErrorResponse {
  status: "error";
  message: ValidationError[];
  result: "";
}
interface SuccessResponse<T> {
  status: "success";
  result: T;
}
export type APIResponse<T> = ErrorResponse | SuccessResponse<T>;

const toSuccess = <T>(result: T): SuccessResponse<T> => ({
  status: "success",
  result,
});

const toAPIResponse = async <T>(
  response: Response
): Promise<APIResponse<T>> => {
  const json = await response.json();
  if (response.status === 200) return toSuccess(json);
  return { status: "error", message: json.detail, result: "" };
};

const jwtAPI = {
  getSummary: async (): Promise<APIResponse<any>> => {
    const response = await fetch(`${JWT_API_URL}/summary`);
    return await toAPIResponse(response);
  },
  getCountries: async (countryCount: number): Promise<APIResponse<any>> => {
    const response = await fetch(`${JWT_API_URL}/countries?limit=${countryCount}&sort=asc&order_by=country`);
    return await toAPIResponse(response);
  },
  getCities: async (country: Country): Promise<APIResponse<any>> => {
    const response = await fetch(`${JWT_API_URL}/cities?limit=${country.cities}&country=${country.code}&sort=asc`);
    return await toAPIResponse(response);
  },
  getLocations: async (cityName: string): Promise<APIResponse<any>> => {
    const response = await fetch(`${JWT_API_URL}/locations?city=${cityName}`);
    return await toAPIResponse(response);
  },
};

export default jwtAPI;
