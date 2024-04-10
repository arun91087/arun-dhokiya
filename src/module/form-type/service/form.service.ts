import { Injectable } from '@nestjs/common';
import { FormRepository } from '../repository/form.repository';
import { FormFieldRepository } from '../repository/formField.repository';
import { DynamicFieldDto } from '../dto/createForm.dto';
import { FormDataDTO } from '../dto/formData.dto';
import { FormDataRepository } from '../repository/formData.repository';

import { v4 as uuid } from 'uuid';

@Injectable()
export class FormService {
    constructor(
        private formRepository: FormRepository,
        private formFieldRepository: FormFieldRepository,
        private formDataRepository: FormDataRepository,
    ) { }

    /**
     * Submit list of fileds with datatype to create a dynamic form
     * i.e phone_numner : number
     * Function will add form type and and form fields.
     * @param dynamicFieldDto 
     * @returns 
     */

    async createForm(dynamicFieldDto: DynamicFieldDto) {
        const { title } = dynamicFieldDto;
        // Create a new Form
        const form = await this.formRepository.create({ title });

        for (const field of Object.keys(dynamicFieldDto)) {
            console.log(field, dynamicFieldDto[field]);
            if (field !== 'title') {
                const type = dynamicFieldDto[field];
                console.log(`Field name: ${field}, Field value: ${type}`);

                await this.formFieldRepository.create({
                    fieldName: field,
                    fieldType: type,
                    formId: form.id,
                });
            }
        }

        return { form };
    }

    /**
     * Receive title for form type and submit all form data.
     * @param formTitle 
     * @param bodyData 
     */

    async submitForm(formTitle: string, bodyData: any) {
        const form = await this.formRepository.findByTitle(formTitle);
        if (!form) {
            throw new Error('form_title_not_found');
        }

        const uniqueId = uuid();
        form.formFields.forEach(formField => {
            const key = formField.fieldName;
            const fieldValue = bodyData[key];
            if (fieldValue) {
                
                console.log(typeof fieldValue, formField.fieldType);
                if (typeof fieldValue !== formField.fieldType) {
                    throw new Error(`FieldTypeError: Invalid value provided form field of ${formField.fieldName}.`)
                }
                const formData: FormDataDTO = { formId: form.id, formFieldId: formField.id, fieldValue, uniqueId };
                this.formDataRepository.create(formData);
            }
        });

        return true;;
    }

    /**
     * Receive title for form type and returns form result data.
     * @param formTitle 
     * @param bodyData 
     */
    async getForm(formTitle: string): Promise<any> {
        const form = await this.formRepository.findByTitle(formTitle);
        if (!form) {
            throw new Error('form_title_not_found');
        }

        const formDataResult = await this.formDataRepository.findByFormId(form.id);
        if (!formDataResult) {
            return [];
        }

        return this.createJsonResponse(formDataResult);
    }

    /* Create a JSON for list of form data */ 
    createJsonResponse  (formDataResult: any): any {
        const returnResult: any = {};
    
        if (formDataResult) {
            for (const key in formDataResult) {
                const { uniqueId, fieldValue, formField } = formDataResult[key];
                const fieldName = formField.fieldName;
        
                if (!returnResult[uniqueId]) {
                    returnResult[uniqueId] = {};
                }
        
                returnResult[uniqueId][fieldName] = fieldValue;
            }
        }
        
        return returnResult;
    };
}
