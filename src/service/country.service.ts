import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { CountryCreateDTO } from '@DTO/country/country-create.dto';
import { ICountryService } from './interfaces';
import { CountryEntity } from '@Entity/country.entity';
import { ICountryRepository } from '@Database/interfaces/country.repository.interface';
import { DI_TYPES } from 'DI_TYPES';
import { CountryDBO } from '@DBO/country.dbo';
import { mapCountryCreateDTOToCountryEntity, mapCountryDBOToCountryEntity, mapCountryEntityToCountryDBO } from '@Mappers/user/country.mapper';

@injectable()
export class CountryService implements ICountryService {

    private readonly _countryRepository: ICountryRepository;

    constructor(
        @inject(DI_TYPES.CountryRepository) countryRepository: ICountryRepository,
    ) {
        this._countryRepository = countryRepository;
    }

    public async create(countryCreateDTO: CountryCreateDTO): Promise<void> {
        const countryEntity: CountryEntity = mapCountryCreateDTOToCountryEntity(countryCreateDTO);

        const countryDBO: CountryDBO = mapCountryEntityToCountryDBO(countryEntity);

        await this._countryRepository.create(countryDBO);

    }

}