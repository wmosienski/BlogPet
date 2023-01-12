import { ICountryRepository } from "@Database/interfaces/country.repository.interface";
import { CountryDBO } from "@DBO/country.dbo";
import { injectable } from "inversify";
import { pg } from "./pg";
import procedures from "./procedures";
import functions from "./functions";

@injectable()
export class CountryRepository implements ICountryRepository {
    async create(countryDBO: CountryDBO): Promise<undefined | number> {
        const result = await pg().func(functions.country.create, [countryDBO.name, countryDBO.code]);

        return result.length && result[0]?.create_country || undefined;
    }

    async read(id: number): Promise<CountryDBO | null> {
        const countryDBOs: CountryDBO[] = await pg().func(functions.country.read, [id]);

        return countryDBOs.length ? countryDBOs[0] : null;
    }

    async update(countryDBO: CountryDBO): Promise<void> {
        return await pg().proc(procedures.country.update, [countryDBO.id, countryDBO.name, countryDBO.code])
    }
    
    async delete(id: number): Promise<void> {
        return await pg().proc(procedures.country.delete, [id])
    }
}