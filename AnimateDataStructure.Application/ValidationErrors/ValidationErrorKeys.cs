namespace AnimateDataStructure.Application.ValidationErrors
{
    public static class ValidationErrorKeys
    {
        // DO NOT DELETE:
        // Validation Nodes Error Keys
        public static readonly string DuplicateValues = "DuplicateValues";
        public static readonly string ExistingValue = "ExistingValue";

        // Validation User Service-Level Error Keys
        public static readonly string UserNotFound = "UserNotFound";

        public static readonly string UnexpectedError = "UnexpectedError";

        public static readonly string MaxHeapViolation = "MaxHeapViolation";
        public static readonly string MinHeapViolation = "MinHeapViolation";

        // Tree structure Error Keys
        public static readonly string BSTViolation = "BSTViolation";
        public static readonly string AVLBalanceViolation = "AVLBalanceViolation";

        public static readonly string RBTRedRootViolation = "RBTRedRootViolation";
        public static readonly string RBTRedNodeHasRedChildViolation = "RBTRedNodeHasRedChildViolation";
    }
}
