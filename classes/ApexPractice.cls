public class ApexPractice {
    public static void queryAccountInsertOpportunity(){
        List<Account> accList = [Select Id, Name from Account where createdDate = this_year];
        
        List<Opportunity> oppList = new List<Opportunity>();
        
        for(Account acc : accList){
            Opportunity opp = new Opportunity();
            opp.AccountId = acc.Id;
            opp.Name = acc.Name;
            opp.CloseDate = System.today();
            opp.StageName = 'Prospecting';
            
            oppList.add(opp);
        }
        Insert oppList;
    }

}