trigger AccountTrigger on Account (before insert, before update, after insert) {
    /*if(Trigger.isBefore && Trigger.isInsert || Trigger.isUpdate){
        AccountTriggerHandler.handleBeforeInsertUpdate(Trigger.new);
    } */
    if(Trigger.isAfter && Trigger.isInsert){
        List<Contact> contacts = new List<Contact>();
        for (Account acc : Trigger.new) {
            if (acc.Name != 'Test') {
                contacts.add(new Contact(
                    LastName = acc.Name,
                    AccountId = acc.Id
                ));
            }
        }
        if (!contacts.isEmpty()) {
            insert contacts;
        }
    }
    
}