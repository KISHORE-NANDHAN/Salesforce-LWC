public class AccountContactHandler {
    //Trigger before insert
    public static void handleContactInsert(List<Contact> conList){
        if(!conList.isEmpty()){
            for(Contact con : conList){
                if(String.isBlank(con.Email)){
                    con.Email = 'test@example.com';
                }
            }
        }
    }
}