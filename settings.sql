CREATE DATABASE musiccitydatabase;
CREATE USER musiccityuser WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE musiccitydatabase TO musiccityuser;
ALTER DATABASE musiccitydatabase OWNER TO musiccityuser;