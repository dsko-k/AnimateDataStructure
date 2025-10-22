using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace AnimateDataStructure.Core.Services.LoggingService
{
    public class TreeControllerLogger : ITreeControllerLogger
    {
        // Inject ILogger (Serilog-backed)
        private readonly ILogger<TreeControllerLogger> logger;

        private const string InputDataLogTemplate = "INPUT_DATA: Controller='{ControllerName}' Action='{ActionName}' received data: {JsonData}";
        private const string InputDataLogError = "LOGGING FAILURE: Failed to serialize and log input data for Controller='{ControllerName}' Action='{ActionName}'";

        public TreeControllerLogger(ILogger<TreeControllerLogger> logger)
        {
            this.logger = logger;
        }


        public void LogInputData<TData>(string controllerName, string actionName, TData data)
            where TData : class
        {
            try
            {
                var jsonString = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = false });

                logger.LogInformation(InputDataLogTemplate, controllerName, actionName, jsonString);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, InputDataLogError, controllerName, actionName);
            }
        }

    }
}
