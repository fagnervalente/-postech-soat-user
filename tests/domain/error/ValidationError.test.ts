import { test, expect } from 'vitest';
import ValidationError from '../../../src/domain/error/ValidationError';

test("Creating Validation Error with valid object", () => {
    const mockedGenericError = {
        message: "Generic Error Message"
    }

    const validationError = ValidationError.create(mockedGenericError);
    expect(validationError.message).equal(mockedGenericError.message);
})

test("Creating Validation Error with invalid object", () => {
    const validationError = ValidationError.create({});
    expect(validationError.message).equal('An validation error occurred');
})