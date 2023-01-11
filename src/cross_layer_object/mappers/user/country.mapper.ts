import { CountryCreateDTO } from "@DTO/country/country-create.dto";
import { CountryEntity } from "@Entity/country.entity";
import { CountryDBO } from "@DBO/country.dbo";

export const mapCountryCreateDTOToCountryEntity = (countryCreateDTO: CountryCreateDTO): CountryEntity => {
    const countryEntity = new CountryEntity();
    countryEntity.name = countryCreateDTO.name;
    countryEntity.code = countryCreateDTO.code;
    return countryEntity;
}

export const mapCountryEntityToCountryDBO = (countryEntity: CountryEntity): CountryDBO => {
    const countryDBO = new CountryDBO();
    countryDBO.name = countryEntity.name;
    countryDBO.code = countryEntity.code;
    return countryDBO;
}

export const mapCountryDBOToCountryEntity = (countryDBO: CountryDBO): CountryEntity => {
    const countryEntity = new CountryEntity();
    countryEntity.name = countryDBO.name;
    countryEntity.code = countryDBO.code;
    return countryEntity;
}