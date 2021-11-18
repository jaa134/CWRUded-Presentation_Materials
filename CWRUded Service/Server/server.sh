if [ $1 = "run" ]
then
    if [ $2 = "debug" ]
    then
        export DEBUG='my-application'
    fi
    export ENVIRONMENT='dev'
    npm install
    npm start
fi

if [ $1 = "deploy" ]
then

fi