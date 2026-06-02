public class ContactManager {
    public static List<Contact> getContactsByAccount(Id accountId){
        if(accountId == null){
            throw new CustomException('Account Id should not be null');
        }
        List<Contact> conList = [Select Id,LastName from Contact Where AccountId =: accountId Order by LastName DESC Limit 5];
        
       	System.debug(conList);
        
        return conList;
    }
}