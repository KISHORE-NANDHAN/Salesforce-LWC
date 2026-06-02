public class AccountHandle {
    public static void populateTotalContacts(){
        List<Account> accList = [Select Id,Name,(Select id from Contacts Where Id != null) from Account where CreatedDate = Last_Month];
    	System.debug(accList);
        for(Account acc:accList){
            acc.Total_Contacts__c= acc.Contacts.size();
            System.debug(acc.Name+' '+acc.Contacts.size());
        }
        update accList;
        
        /*for(Account acc : accList){
            Integer counter = 0;
            for(Contact con : acc.Contact){
                counter++;
            }
            acc.Total_Contacts__c = counter;
        }
     	update accList;*/
    }
}