import { ICountryRepository } from "@Database/interfaces/country.repository.interface";
import { CountryDBO } from "@DBO/country.dbo";
import { injectable } from "inversify";
import { pg } from "./pg";
import procedures from "./procedures"

@injectable()
export class CountryRepository implements ICountryRepository {
    async create(countryDBO: CountryDBO): Promise<void> {
        return await pg().proc(procedures.country.create, [countryDBO.name, countryDBO.code])
    }    
}