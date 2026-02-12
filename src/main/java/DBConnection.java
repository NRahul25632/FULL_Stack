import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/attdendance_management_system";
        String user = "root";       // your mysql username
        String password = "rahul17032005";   // your mysql password

        try {
            Connection con = DriverManager.getConnection(url, user, password);
            System.out.println("✅ Database Connected Successfully");

            con.close();
        } catch (Exception e) {
            System.out.println("❌ Connection Failed");
            e.printStackTrace();
        }
    }
}

