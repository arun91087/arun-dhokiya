import { HttpStatus } from '@nestjs/common';
import { iResponseStatusMessage } from 'src/utils/response/response.interface';

export const responseName = {
    FORM_TYPE_CREATED: 'FORM_TYPE_CREATED',
    FORM_TYPE_FETCHED: 'FORM_TYPE_FETCHED',
    GET_ALL_FORM_TYPES: 'GET_ALL_FORM_TYPES',
    FORM_SUBMITED: 'FORM_SUBMITED',
};

export const responseInfo: Record<string, iResponseStatusMessage> = {
    FORM_TYPE_FETCHED: {
        message: 'Form Result fetched successfully',
        statusCode: HttpStatus.OK,
    },
    GET_ALL_FORM_TYPE: {
        message: 'Form fetched successfully',
        statusCode: HttpStatus.OK,
    },
    FORM_SUBMITED: {
        message: 'Form submitted successfully',
        statusCode: HttpStatus.OK,
    },
    FORM_TYPE_CREATED: {
        message: 'Form created successfully',
        statusCode: HttpStatus.CREATED,
    },
};
