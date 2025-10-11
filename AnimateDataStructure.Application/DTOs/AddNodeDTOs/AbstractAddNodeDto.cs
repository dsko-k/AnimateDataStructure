

namespace AnimateDataStructure.Application.DTOs.AddNodeDTOs
{
    public abstract class AbstractAddNodeDto
    {
        public string InputValue { get; set; }

        public string TempGuid { get; set; }

        public bool IsAuthenticated { get; set; }
    }
}
