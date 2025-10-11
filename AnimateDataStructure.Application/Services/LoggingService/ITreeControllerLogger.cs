using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AnimateDataStructure.Application.Services.LoggingService
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
        void LogInputData<TData>(string controllerName, string actionName, TData data)
            where TData : class;
    }
}
