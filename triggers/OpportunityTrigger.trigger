trigger OpportunityTrigger on Opportunity (before insert,before update) {
	
	for (Opportunity opp : Trigger.new) {
        if (opp.Amount != null) {
            if (opp.Amount > 50000) {
                opp.StageName = 'Closed Won';
            } else {
                opp.StageName = 'Prospecting';
            }
        }
    }

}