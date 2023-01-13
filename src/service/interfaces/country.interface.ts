import { CountryCreateDTO } from "@DTO/country/country-create.dto";
import { CountryReadDTO } from "@DTO/country/country-read.dto";
import { CountryUpdateDTO } from "@DTO/country/country-update.dto";

export interface ICountryService {

    create: (countryCreateDTO: CountryCreateDTO) => Promise<number>;
    
    read: (id: number) => Promise<CountryReadDTO>;

    update: (countryUpdateDTO: CountryUpdateDTO) => Promise<void>;

    delete: (id: number) => Promise<void>;

}
