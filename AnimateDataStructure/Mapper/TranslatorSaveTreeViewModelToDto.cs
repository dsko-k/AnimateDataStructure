using AnimateDataStructure.Core.DTOs.SaveNodesDTOs;
using AnimateDataStructure.Web.ViewModels.DataStructureOperationsViewModels.SaveTreeViewModels;

namespace AnimateDataStructure.Web.Mapper
{
    public class TranslatorSaveTreeViewModelToDto
    {
        public static TDto TranslateToSaveTreeDto<TViewModel, TDto>(TViewModel viewModel)
                where TViewModel : BaseSaveTreeViewModel, IHasAuthenticatedProperty
                where TDto : AbstractSaveTreeDto, IHasAuthenticatedProperty, new()
        {
            return new TDto
            {
                InputValue = viewModel.InputValue,
                TempGuid = viewModel.TempGuid,
                IsAuthenticated = viewModel.IsAuthenticated
            };
        }

        public static SaveRedBlackTreeDto TranslateToSaveRedBlackTreeDto(SaveRedBlackTreeViewModel saveRedBlackTreeNodesViewModel)
        {
            return new SaveRedBlackTreeDto
            {
                InputValue = saveRedBlackTreeNodesViewModel.InputValue,
                TempGuid = saveRedBlackTreeNodesViewModel.TempGuid,
                IsAuthenticated = saveRedBlackTreeNodesViewModel.IsAuthenticated
            };
        }
    }
}
