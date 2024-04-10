import { IsNotEmpty, IsString } from 'class-validator';

export class FormDataDTO {
    @IsNotEmpty({"message": "FormId should not be empty"})
    @IsString()
    formId: number;

    @IsNotEmpty({"message": "uniqueId should not be empty"})
    @IsString()
    uniqueId: string;

    @IsNotEmpty({"message": "formFieldId should not be empty"})
    @IsString()
    formFieldId: number;

    @IsNotEmpty({"message": "Form value should not be empty"})
    @IsString()
    fieldValue: string;
}
