using AnimateDataStructure.Core.ValidationErrors;

namespace AnimateDataStructure.Core.Results
{
    public class ServiceResult
    {
        public bool IsSuccess { get; private set; }

        public string? ErrorKey { get; private set; }

        public string? ErrorMessage { get; private set; }


        private ServiceResult(bool isSuccess, string? errorKey = null, string? errorMessage = null)
        {
            IsSuccess = isSuccess;
            ErrorKey = errorKey;
            ErrorMessage = errorMessage;
        }


        public static ServiceResult Success()
        {
            return new ServiceResult(true);
        }


        public static ServiceResult Failure(string errorKey, string errorMessage)
        {
            return new ServiceResult(false, errorKey, errorMessage);
        }

        public static ServiceResult UserNotFound()
        {
            return new ServiceResult(false, ValidationErrorKeys.UserNotFound, ValidationErrorMessages.ErrorMap[ValidationErrorKeys.UserNotFound]);
        }


        public static ServiceResult CreateFailureResult(string errorKey, string rawData)
        {
            if (ValidationErrorMessages.ErrorMap.TryGetValue(errorKey, out var messageTemplate))
            {
                var formattedMessage = string.Format(messageTemplate, rawData);
                return Failure(errorKey, formattedMessage);
            }

            // Fallback for unmapped or invalid keys
            return Failure(ValidationErrorKeys.UnexpectedError, ValidationErrorMessages.ErrorMap[ValidationErrorKeys.UnexpectedError]);
        }
    }
}
