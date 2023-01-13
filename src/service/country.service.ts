import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { CountryCreateDTO } from '@DTO/country/country-create.dto';
import { ICountryService } from './interfaces';
import { CountryEntity } from '@Entity/country.entity';
import { ICountryRepository } from '@Database/interfaces/country.repository.interface';
import { DI_TYPES } from 'DI_TYPES';
import { CountryDBO } from '@DBO/country.dbo';
import { mapCountryCreateDTOToCountryEntity, mapCountryDBOToCountryEntity, mapCountryEntityToCountryDBO } from '@Mappers/country.mapper';
import { CountryUpdateDTO } from '@DTO/country/country-update.dto';
import { CountryReadDTO } from '@DTO/country/country-read.dto';
import { mapCountryEntityToCountryDTO, updateCountryDBOWithCountryEntity } from '@Mappers/country.mapper';
import { WrongData } from '@Errors/WrongData';
import { SomethingWentWrong } from '@Errors/SomethingWentWrong';

@injectable()
export class CountryService implements ICountryService {

    private readonly _countryRepository: ICountryRepository;

    constructor(
        @inject(DI_TYPES.CountryRepository) countryRepository: ICountryRepository,
    ) {
        this._countryRepository = countryRepository;
    }

    public async create(countryCreateDTO: CountryCreateDTO): Promise<number> {
        const countryEntity: CountryEntity = mapCountryCreateDTOToCountryEntity(countryCreateDTO);

        const countryDBO: CountryDBO = mapCountryEntityToCountryDBO(countryEntity);

        const createdId = await this._countryRepository.create(countryDBO);

        if (!createdId) {
            throw new SomethingWentWrong('cant create :(');
        }

        return createdId;
    }

    public async read(id: number): Promise<CountryReadDTO> {
        const countryDBO: CountryDBO | null =  await this._countryRepository.read(id);

        if (!countryDBO) {
            throw new WrongData('this id does not exist');
        }

        const countryEntity: CountryEntity = mapCountryDBOToCountryEntity(countryDBO);

        const countryReadDTO: CountryReadDTO = mapCountryEntityToCountryDTO(countryEntity);

        return countryReadDTO;
    }

    public async update(countryUpdateDTO: CountryUpdateDTO): Promise<void> {
        const countryDBO: CountryDBO | null =  await this._countryRepository.read(countryUpdateDTO.id);

        if (!countryDBO) {
            throw new WrongData('this id does not exist');
        }

        const countryEntity: CountryEntity = mapCountryDBOToCountryEntity(countryDBO);

        const countryDBOUpdated: CountryDBO = updateCountryDBOWithCountryEntity(countryDBO, countryEntity);

        return await this._countryRepository.update(countryDBOUpdated);
    }

    public async delete(id: number): Promise<void> {
        return await this._countryRepository.delete(id);
    }

}