import { IsNotEmpty, IsString } from 'class-validator';

export class FormDTO {
    @IsNotEmpty({"message": "Title should not be empty"})
    @IsString()
    title: string;
}
