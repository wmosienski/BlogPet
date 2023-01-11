import { CountryDBO } from "@DBO/country.dbo";

export interface ICountryRepository {
    create(user: CountryDBO): Promise<void>;
}