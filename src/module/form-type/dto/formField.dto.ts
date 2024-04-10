import { IsNotEmpty, IsString } from 'class-validator';

export class FormFieldDTO {
    @IsNotEmpty({"message": "uniqueId should not be empty"})
    @IsString()
    formId: number;

    @IsNotEmpty({"message": "Field Name should not be empty"})
    @IsString()
    fieldName: string;

    @IsNotEmpty({"message": "Field Type should not be empty"})
    @IsString()
    fieldType: string;
}
