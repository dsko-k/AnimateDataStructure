using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace AnimateDataStructure.Core.Services.LoggingService
{
    public class TreeControllerLogger : ITreeControllerLogger
    {
        private readonly ILogger<TreeControllerLogger> logger; // Inject ILogger (Serilog-backed)

        private const string InputDataLogTemplate = "INPUT_DATA: Controller='{ControllerName}' Action='{ActionName}' received data: {JsonData}";
        private const string InputDataLogError = "LOGGING FAILURE: Failed to serialize and log input data for Controller='{ControllerName}' Action='{ActionName}'";

        public TreeControllerLogger(ILogger<TreeControllerLogger> logger)
        {
            this.logger = logger;
        }


        public Task LogInputData<TData>(string controllerName, string actionName, TData data)
        where TData : class
        {
            // Offload the synchronous work (serialization and logging) to a thread pool thread
            return Task.Run(() =>
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
            });
        }
    }
}
