import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    Validate,
} from 'class-validator';
import { ValidatorUntilCurrentYear } from '../../validators/validator.until-current-year';

export class AddPersonDTO {
    @IsString({ message: 'Должен быть строкой' })
    @IsNotEmpty({ message: 'Недолжен быть пустым' })
    fullname: string;

    @IsNumber({}, { message: 'Должен быть числом' })
    @Min(1900, { message: 'Минимальное значение года 1900' })
    @Validate(ValidatorUntilCurrentYear)
    birth_year: number;

    @IsNumber({}, { message: 'Должен быть числом' })
    @Min(1900, { message: 'Минимальное значение года 1900' })
    @IsOptional()
    @Validate(ValidatorUntilCurrentYear)
    death_year?: number | null;
}
