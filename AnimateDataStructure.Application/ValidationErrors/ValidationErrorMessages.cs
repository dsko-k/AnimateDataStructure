namespace AnimateDataStructure.Core.ValidationErrors
{
    public static class ValidationErrorMessages
    {
        public static readonly Dictionary<string, string> ErrorMap = new()
        {
            // Node Validation Errors
            { "DuplicateValues", "Duplicate values in input: {0}" },
            { "ExistingValue", "Value {0} already exists in the tree" },

            // Service-level Errors
            { "UserNotFound", "User not found" },
            { "UnexpectedError", "An unexpected validation error occurred" },

            // Tree structure vialation
            { "BSTViolation",  "Value {0} violates the tree ordering" },
            { "AVLBalanceViolation",  "Node with value {0} violates the AVL balance property" },
            { "MinHeapViolation", "Min Heap Property Violation: Parent node value {0} is greater than its child" },
            { "MaxHeapViolation", "Max Heap Property Violation: Parent node value {0} is less than its child" },
            {"RBTRedRootViolation", "The root node {0} must be black" },
            {"RBTRedNodeHasRedChildViolation",  "Red node {0} has a red child"}
        };
    }
}
