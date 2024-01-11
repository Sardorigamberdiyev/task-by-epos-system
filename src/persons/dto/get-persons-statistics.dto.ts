import { IsNumberString, MaxLength, MinLength } from 'class-validator';

export class GetPersonsStatisticsDTO {
    @IsNumberString({}, { message: 'Должен быть строка виде чисел' })
    @MaxLength(4, { message: 'Максимальная длина 4 символа' })
    @MinLength(4, { message: 'Минимальная длина 4 символа' })
    startYear: string;

    @IsNumberString({}, { message: 'Должен быть строка виде чисел' })
    @MaxLength(4, { message: 'Максимальная длина 4 символа' })
    @MinLength(4, { message: 'Минимальная длина 4 символа' })
    endYear: string;
}
