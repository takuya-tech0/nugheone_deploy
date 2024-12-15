import mysql.connector
from mysql.connector import Error
from typing import Dict, Any
from pathlib import Path

class MySQLConnector:
    def __init__(self, config: Dict[str, Any]):
        """
        MySQL接続を管理するクラス
        
        Args:
            config (Dict[str, Any]): データベース接続設定
        """
        self.config = config
        self.connection = None

    def connect(self):
        """データベースに接続"""
        try:
            if not self.connection or not self.connection.is_connected():
                self.connection = mysql.connector.connect(**self.config)
                print("MySQL データベースに接続しました")
        except Error as e:
            print(f"Error: {e}")
            raise

    def disconnect(self):
        """データベース接続を閉じる"""
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("MySQL 接続を閉じました")

    def execute_query(self, query: str):
        """
        SQLクエリを実行
        
        Args:
            query (str): 実行するSQLクエリ
        """
        try:
            self.connect()
            cursor = self.connection.cursor()
            cursor.execute(query)
            self.connection.commit()
            print(f"クエリを実行しました: {query[:100]}...")
        except Error as e:
            print(f"Error: {e}")
            raise
        finally:
            if cursor:
                cursor.close()

def create_tables(connector: MySQLConnector):
    """
    すべてのテーブルを作成
    
    Args:
        connector (MySQLConnector): データベース接続オブジェクト
    """
    tables = [
        """
        CREATE TABLE IF NOT EXISTS users (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            name VARCHAR(100) NOT NULL,
            auth_provider VARCHAR(50),
            auth_provider_id VARCHAR(255),
            line_user_id VARCHAR(255) UNIQUE,
            line_notification_enabled BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_email (email),
            INDEX idx_line_user (line_user_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """,
        """
        CREATE TABLE IF NOT EXISTS properties (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            owner_id BIGINT UNSIGNED NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            address TEXT NOT NULL,
            latitude DECIMAL(10, 8),
            longitude DECIMAL(11, 8),
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (owner_id) REFERENCES users(id),
            INDEX idx_owner (owner_id),
            INDEX idx_location (latitude, longitude)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """,
        """
        CREATE TABLE IF NOT EXISTS property_photos (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            property_id BIGINT UNSIGNED NOT NULL,
            photo_data MEDIUMBLOB,
            photo_url VARCHAR(255),
            content_type VARCHAR(100),
            file_size INT UNSIGNED,
            display_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
            is_main BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (property_id) REFERENCES properties(id),
            INDEX idx_property_order (property_id, display_order)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """,
        """
        CREATE TABLE IF NOT EXISTS amenities (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            icon VARCHAR(255),
            category VARCHAR(50),
            is_active BOOLEAN DEFAULT TRUE,
            INDEX idx_category (category)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """,
        """
        CREATE TABLE IF NOT EXISTS property_amenities (
            property_id BIGINT UNSIGNED NOT NULL,
            amenity_id BIGINT UNSIGNED NOT NULL,
            description TEXT,
            PRIMARY KEY (property_id, amenity_id),
            FOREIGN KEY (property_id) REFERENCES properties(id),
            FOREIGN KEY (amenity_id) REFERENCES amenities(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """,
        """
        CREATE TABLE IF NOT EXISTS rooms (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            property_id BIGINT UNSIGNED NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            capacity SMALLINT UNSIGNED NOT NULL,
            price_per_night DECIMAL(10, 2) NOT NULL,
            is_active BOOLEAN DEFAULT TRUE,
            FOREIGN KEY (property_id) REFERENCES properties(id),
            INDEX idx_property (property_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """,
        """
        CREATE TABLE IF NOT EXISTS reservations (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            room_id BIGINT UNSIGNED NOT NULL,
            user_id BIGINT UNSIGNED NOT NULL,
            check_in DATE NOT NULL,
            check_out DATE NOT NULL,
            total_price DECIMAL(10, 2) NOT NULL,
            status ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (room_id) REFERENCES rooms(id),
            FOREIGN KEY (user_id) REFERENCES users(id),
            INDEX idx_room_dates (room_id, check_in, check_out),
            INDEX idx_user (user_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """,
        """
        CREATE TABLE IF NOT EXISTS user_favorites (
            user_id BIGINT UNSIGNED NOT NULL,
            property_id BIGINT UNSIGNED NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, property_id),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (property_id) REFERENCES properties(id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """,
        """
        CREATE TABLE IF NOT EXISTS reviews (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            property_id BIGINT UNSIGNED NOT NULL,
            user_id BIGINT UNSIGNED NOT NULL,
            reservation_id BIGINT UNSIGNED NOT NULL,
            rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
            comment TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (property_id) REFERENCES properties(id),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (reservation_id) REFERENCES reservations(id),
            UNIQUE KEY uniq_reservation_review (reservation_id),
            INDEX idx_property_rating (property_id, rating)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """,
        """
        CREATE TABLE IF NOT EXISTS notification_settings (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id BIGINT UNSIGNED NOT NULL,
            notification_type ENUM('reservation_confirmed', 'check_in_reminder', 'check_out_reminder', 'reservation_cancelled') NOT NULL,
            is_enabled BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            UNIQUE KEY uniq_user_notification (user_id, notification_type)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """,
        """
        CREATE TABLE IF NOT EXISTS notification_logs (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            user_id BIGINT UNSIGNED NOT NULL,
            reservation_id BIGINT UNSIGNED,
            notification_type ENUM('reservation_confirmed', 'check_in_reminder', 'check_out_reminder', 'reservation_cancelled') NOT NULL,
            status ENUM('success', 'failed') NOT NULL,
            error_message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (reservation_id) REFERENCES reservations(id),
            INDEX idx_user_notification (user_id, notification_type),
            INDEX idx_reservation (reservation_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        """
    ]

    for table_query in tables:
        connector.execute_query(table_query)

def main():
    """メイン実行関数"""
    # データベース接続設定
    config = {
        'host': 'tech0-db-step4-studentrdb-3.mysql.database.azure.com',
        'user': 'tech0gen7student',
        'password': 'vY7JZNfU',
        'database': 'sembaapp',
        'client_flags': [mysql.connector.ClientFlag.SSL],
        'ssl_ca': 'C:\\Users\\takuya.oshima\\sembaapp\\DigiCertGlobalRootCA.crt.pem'
    }

    # SSL証明書の存在確認
    if not Path(config['ssl_ca']).exists():
        raise FileNotFoundError(f"SSL証明書が見つかりません: {config['ssl_ca']}")
    
    # データベース接続オブジェクトを作成
    connector = MySQLConnector(config)
    
    try:
        # テーブルを作成
        create_tables(connector)
        print("すべてのテーブルの作成が完了しました")
    except Exception as e:
        print(f"エラーが発生しました: {e}")
    finally:
        # 接続を閉じる
        connector.disconnect()

if __name__ == "__main__":
    main()