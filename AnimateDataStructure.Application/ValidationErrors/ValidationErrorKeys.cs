namespace AnimateDataStructure.Core.ValidationErrors
{
    public static class ValidationErrorKeys
    {
        // Validation Nodes Error Keys
        public static readonly string DuplicateValues = "DuplicateValues";
        public static readonly string ExistingValue = "ExistingValue";

        // Validation User Service-Level Error Keys
        public static readonly string UserNotFound = "UserNotFound";
        public static readonly string UnexpectedError = "UnexpectedError";

        // Tree structure Error Keys
        public static readonly string BSTViolation = "BSTViolation";
        public static readonly string AVLBalanceViolation = "AVLBalanceViolation";
        public static readonly string MaxHeapViolation = "MaxHeapViolation";
        public static readonly string MinHeapViolation = "MinHeapViolation";
        public static readonly string RBTRedRootViolation = "RBTRedRootViolation";
        public static readonly string RBTRedNodeHasRedChildViolation = "RBTRedNodeHasRedChildViolation";
    }
}
