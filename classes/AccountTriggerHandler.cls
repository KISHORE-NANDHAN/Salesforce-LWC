public class AccountTriggerHandler {
    public static void handleBeforeInsertUpdate(List<Account> accounts){
        if(!accounts.isEmpty()){
            for(Account acc : accounts){
                if(acc.Name.contains('test')){
                    acc.addError('The Account name should contain test');
                    System.debug('error creating record');
                }
            }
        }
    }
}