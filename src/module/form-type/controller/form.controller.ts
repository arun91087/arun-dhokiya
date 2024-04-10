import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, ValidationPipe } from '@nestjs/common';
import { FormService } from '../service/form.service';
import { Response as ResponseCustom } from 'src/utils/response/response.decorator';
import { responseName } from '../response/response.constants';

@Controller()
export class FormController {
    constructor(private formService: FormService) {}

    /*  Create Form with dynamic values */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ResponseCustom(responseName.FORM_TYPE_CREATED)
    async createForm(@Body(ValidationPipe) dynamicFieldDto: any) {
        return await this.formService.createForm(dynamicFieldDto);
    }

    /* Fill Dynamic form with values.  */
    @Post('fill-data')
    @HttpCode(HttpStatus.CREATED)
    @ResponseCustom(responseName.FORM_SUBMITED)
    async submitForm(@Body() formDataDTO: any, @Query() query: any) {
        return await this.formService.submitForm(query.title, formDataDTO);
    }

    /* Get form values by form name */
    @Get('get-data')
    @HttpCode(HttpStatus.CREATED)
    @ResponseCustom(responseName.FORM_TYPE_FETCHED)
    async getForm(@Query() query: any) {
        return await this.formService.getForm(query.title);
    }
}
