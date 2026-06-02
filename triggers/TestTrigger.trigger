trigger TestTrigger on Contact (before insert) {

    if(trigger.isBefore){
        List<Contact> conList = [SELECT Id, FirstName, LastName FROM Contact];
        for (Contact obj : conList) {
            System.debug(obj.Id+ ' ' + obj.FirstName + ' ' + obj.LastName);
        }

    }

}