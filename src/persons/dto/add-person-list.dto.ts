import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { AddPersonDTO } from './add-person.dto';
import { Type } from 'class-transformer';
import 'reflect-metadata';

export class AddPersonListDTO {
    @ArrayMinSize(1, { message: 'Минимальная длина массива 1' })
    @IsArray({ message: 'Должен быть массивом' })
    @ValidateNested({ each: true })
    @Type(() => AddPersonDTO)
    personList: AddPersonDTO[];
}
