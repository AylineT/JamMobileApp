# Créer la database

1. psql -h db -U postgres -d fastapi_dev
`CREATE DATABASE MobileMusician;`
puis
`\q`
puis

`psql -h db -U postgres -d fastapi_dev -f ./sql/01_init.sql`
`psql -h db -U postgres -d fastapi_dev -f ./sql/02_fakedata.sql`