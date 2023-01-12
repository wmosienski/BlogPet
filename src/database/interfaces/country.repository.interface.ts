import { CountryDBO } from "@DBO/country.dbo";

export interface ICountryRepository {
    create(countryDBO: CountryDBO): Promise<undefined | number>;
    read(id: number): Promise<CountryDBO | null>;
    update(countryDBO: CountryDBO): Promise<void>;
    delete(id: number): Promise<void>;
}