trigger LeadTrigger on Lead (before insert,before update) {
    if(Trigger.isBefore && Trigger.isUpdate){
        LeadSanitizer.santizeLeads(trigger.new);
    }
    if(Trigger.isBefore && Trigger.isInsert){
        LeadSanitizer.santizeLeads(trigger.new);
    }
}