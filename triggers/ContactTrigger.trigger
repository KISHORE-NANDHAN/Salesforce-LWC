trigger ContactTrigger on Contact (before insert) {
    if(Trigger.isBefore && Trigger.isInsert){
        AccountContactHandler.handleContactInsert(Trigger.new);
    }
}