import { IsNotEmpty, IsString } from 'class-validator';

export class DynamicFieldDto {
    @IsNotEmpty({"message": "Title should not be empty"})
    @IsString()
    title: string;

    [key: string]: string;
}
