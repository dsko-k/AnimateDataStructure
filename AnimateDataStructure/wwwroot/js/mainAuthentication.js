import { Authentication } from './Authentication/Authentication.js';

export function initFormsModal()
{
    const authentication = new Authentication();
    authentication.addAuthenticationHandlers();
}