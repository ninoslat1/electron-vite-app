import { toast } from "react-toastify";
import { SQLocal } from "sqlocal"

export const initializeDatabase = async () => {
    const db = new SQLocal("bromousr.sqlite3")

    try {
        const isTableExist = await db.sql`
        SELECT name from sqlite_master WHERE type='table' AND name='myuser'
    `

        if(isTableExist.length === 0){
            await db.sql`
                CREATE TABLE myuser (
                    ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    UserCode TEXT NOT NULL DEFAULT '',
                    UserName TEXT NOT NULL DEFAULT '',
                    Password TEXT NOT NULL DEFAULT '',
                    Position TEXT NOT NULL DEFAULT '',
                    Telephone TEXT NOT NULL DEFAULT '',
                    Email TEXT NOT NULL DEFAULT '',
                    Handphone TEXT NOT NULL DEFAULT '',
                    GroupID INTEGER NOT NULL DEFAULT 0,
                    LogIn INTEGER NOT NULL DEFAULT 0,
                    SecurityCode TEXT NOT NULL DEFAULT '',
                    Status INTEGER NOT NULL DEFAULT 0,
                    CustomerID INTEGER NOT NULL DEFAULT 0,
                    IsManager INTEGER DEFAULT NULL,
                    LocationID INTEGER DEFAULT NULL,
                    UNIQUE(UserCode),
                    UNIQUE(UserName)
                )
            `;

            await db.sql`
                INSERT INTO myuser (ID, UserCode, UserName, Password, Position, Telephone, Email, Handphone, GroupID, LogIn, SecurityCode, Status, CustomerID, IsManager, LocationID)
                VALUES
                    (1000, 'NINO', 'NINO1234', 'MQAyADMANAA=', 'Staff', '', '', '', 0, 0, '', 0, 8, NULL, NULL),
                    (1003, 'dor', 'dor', 'MQAyADMANAA=', 'petugas', '', '', '', 1000, 0, '', 0, 0, NULL, NULL),
                    (1004, 'MUJI', 'MUJIONO', 'NwA0ADEANAAxADEANQA=', 'NOPE', '', '', '', 1005, 0, 'MQAyADMANAA1ADYANwA4AA==', 0, 0, NULL, NULL),
                    (1005, 'RND', 'RND', 'cwBhAHAAMQAyADMA', 'RND', '', '', '', 1001, 0, '', 0, 0, NULL, NULL)
            `;

            toast.success('Database initialized.')
        }
    } catch (err){
        const message = (err as Error).message|| 'Unknown error initializing database';
        toast.error(`Database error: ${message}`);
    }
}