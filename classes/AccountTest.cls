@isTest
public class AccountTest {
    public static Account utility(String accName){
        Account acc = new Account( Name = accName);
        return acc;
    }
    @isTest
    public static void test1(){
    	Account acount = utility('Infosys');
        
        Test.startTest();
        insert acount;
        Test.stopTest();
        
        Contact con = [Select Id,LastName, AccountId from Contact Where AccountId =: acount.Id ];
        
        System.assertNotEquals(null,con,'The Contact is not created');
        System.assertEquals(acount.Name, con.LastName, 'LastName mismatch');
		System.assertEquals(acount.Id, con.AccountId, 'AccountId mismatch');     
    }
    @isTest
    public static void test2(){
    	Account acount = utility('Test');
        
        Test.startTest();
        insert acount;
        Test.stopTest();
        
        List<Contact> conList = [Select Id,LastName, AccountId from Contact Where AccountId =: acount.Id ];
     	System.assertEquals(0,conList.size(),'The Contact is created instead it shouldn\'t have created');
        
    }
    @isTest
    public static void test3(){
        
        List<Account> accList = new List<Account>{
            utility('Cognizant'),
            utility('Test'),
            utility('Infosys'),
            utility('Meta'),
        	utility('Google')
        };
            
        Test.startTest();
        insert accList;
        Test.stopTest();
        
        Set<Id> accIds = new Set<Id>();
        for(Account acc : accList){
            accIds.add(acc.Id);
        }
        
        List<Contact> conList= [Select Id,LastName, AccountId from Contact Where AccountId =: accIds];
     	System.assertEquals(4,conList.size(),'Invalid number of accounts has been created');
        for(Contact con : conList){
            System.assertNotEquals('Test', con.LastName, 'Contact should not be created for Test account');
        }
        
    }
}