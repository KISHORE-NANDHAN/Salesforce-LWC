public with sharing class AccountFetch {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String accName) {
        return [SELECT Id, Name FROM Account Where Name Like :('%'+accName+'%') LIMIT 5];
    }
}