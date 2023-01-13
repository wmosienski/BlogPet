import { CountryCreateDTO } from "@DTO/country/country-create.dto";
import { CountryEntity } from "@Entity/country.entity";
import { CountryDBO } from "@DBO/country.dbo";
import { CountryUpdateDTO } from "@DTO/country/country-update.dto";
import { CountryReadDTO } from "@DTO/country/country-read.dto";

export const mapCountryCreateDTOToCountryEntity = (countryCreateDTO: CountryCreateDTO): CountryEntity => {
    const countryEntity = new CountryEntity();
    countryEntity.name = countryCreateDTO.name;
    countryEntity.code = countryCreateDTO.code;
    return countryEntity;
}

export const mapCountryUpdateDTOToCountryEntity = (countryUpdateDTO: CountryUpdateDTO): CountryEntity => {
    const countryEntity = new CountryEntity();
    countryEntity.id = countryUpdateDTO.id;
    countryEntity.name = countryUpdateDTO.name;
    countryEntity.code = countryUpdateDTO.code;
    return countryEntity;
}

export const mapCountryEntityToCountryDBO = (countryEntity: CountryEntity): CountryDBO => {
    const countryDBO = new CountryDBO();
    countryDBO.id = countryEntity.id;
    countryDBO.name = countryEntity.name;
    countryDBO.code = countryEntity.code;
    return countryDBO;
}

export const mapCountryEntityToCountryDTO = (countryEntity: CountryEntity): CountryReadDTO => {
    const countryDTO = new CountryReadDTO();
    countryDTO.id = countryEntity.id;
    countryDTO.name = countryEntity.name;
    countryDTO.code = countryEntity.code;
    return countryDTO;
}

export const mapCountryDBOToCountryEntity = (countryDBO: CountryDBO): CountryEntity => {
    const countryEntity = new CountryEntity();
    countryEntity.id = countryDBO.id;
    countryEntity.name = countryDBO.name;
    countryEntity.code = countryDBO.code;
    return countryEntity;
}

export const updateCountryDBOWithCountryEntity = (countryDBO: CountryDBO, countryEntity: CountryEntity): CountryDBO => {
    countryDBO.name = countryEntity.name ? countryEntity.name : countryDBO.name;
    countryDBO.code = countryEntity.code ? countryEntity.code : countryDBO.code;
    return countryDBO;
}