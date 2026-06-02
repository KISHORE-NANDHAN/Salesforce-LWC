public class ContactHandle {
    public static void queryContact(){
        List<Contact> conList = [Select Id,Name,Phone,Account.Id,Account.Phone from Contact where CreatedDate = This_Week];
        
        System.debug(conList);
        if(!conList.isEmpty()){
            for(Contact con : conList){
                if(con.Phone == null){
                    con.Phone = con.Account.Phone;
                    System.debug(con.Name+' is updated');
                }
            }
            update conList;
            System.debug('Last Line');
        }
    }
}