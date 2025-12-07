namespace AnimateDataStructure.Core.Services.LoggingService
{
    public interface ITreeControllerLogger
    {
        /// <summary>
        /// Logs the input data received by a controller action.
        /// </summary>
        /// <param name="controllerType">⭐️ The runtime Type object of the derived controller.</param>
        /// <typeparam name="TData">The type of the input view model.</typeparam>
        /// <param name="actionName">The name of the controller action (e.g., "SaveNodes").</param>
        /// <param name="data">The input view model object.</param>
        Task LogInputData<TData>(string controllerName, string actionName, TData data)
        where TData : class;
    }
}
