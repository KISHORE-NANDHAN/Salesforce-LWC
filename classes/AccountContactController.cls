public with sharing class AccountContactController {
    
    @AuraEnabled
    public static String saveAccountWithOptionalContact(
        String accName,
        String accEmail,
        String accIndustry,
        String accWebsite,
        Boolean createContact,
        String conFirstName,
        String conLastName,
        String conEmail,
        String conPhone
    ) {
        try {
            // Create Account
            Account acc = new Account();
            acc.Name = accName;
            acc.Industry = accIndustry;
            acc.Website = accWebsite;

            // Optional: custom email field if exists
            // acc.Email__c = accEmail;

            insert acc;

            // Check if contact needs to be created
            if (createContact && conLastName != null) {
                Contact con = new Contact();
                con.FirstName = conFirstName;
                con.LastName = conLastName;
                con.Email = conEmail;
                con.Phone = conPhone;
                con.AccountId = acc.Id;

                insert con;
            }

            return 'SUCCESS';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}