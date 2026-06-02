public class AccountManager {
    public Id createAccount(String accountName){
        if(String.isBlank(accountName) || accountName == null){
            return null;
            //throw new Exception('String value is Empty');
        }
        Account acc = new Account();
        acc.Name = accountName;
        insert acc;
        return acc.Id;
    }
}