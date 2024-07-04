KEYS=$(echo $ENV_KEYS | tr "," "\n")
# [DB, PORT]
VALUES=$(echo $ENV_VALUES | tr "," "\n")
# [SQLSERVER, 80]
set -- $VALUES;

for i in $KEYS; 
do 
    # sed -i "s|$i|$1|g" "/app/.env.yml"; 
    echo $i=$1 >> .env
    shift; 
done; 


# KEY DB,PORT
# VALUE sqlserver,80