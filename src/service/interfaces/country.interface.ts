import { CountryCreateDTO } from "@DTO/country/country-create.dto";

export interface ICountryService {

    create: (countryCreateDTO: CountryCreateDTO) => Promise<void>;

}
