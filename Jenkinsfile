@Library('github.com/kekru-cd-microservice-swarm-example/jenkins-shared@master')
import steps.CDMain

def cdMain
def commentsserviceWebport
def commentsserviceImageName
def borderproxyPort
def stack

try{
    node {
        stage('Preparation') {
            git 'https://github.com/kekru-cd-microservice-swarm-example/commentsservice'

            cdMain = new CDMain(steps)
            cdMain.init()
        }

        stage('Build') {
            commentsserviceImageName = cdMain.buildAndPush('commentsservice')
        }

        stage('Starte Testumgebung') {

            stack = cdMain.startTestenvironment()
            sh './docker service update --replicas 1 --image ' + commentsserviceImageName + ' ' + stack.fullServiceName('commentsservice')

            borderproxyPort = stack.getBorderproxyPort()
            commentsserviceWebport = stack.getPublishedPort('commentsservice', 8080)
            echo '8080 -> ' + commentsserviceWebport
            cdMain.waitForTCP(commentsserviceWebport)
       }
    }


    stage ('Manuelle Tests'){
        def userInput = input(
            id: 'userInput', message: 'Testversion erreichbar unter http://10.1.6.210:'+borderproxyPort+'/newspage/ Live Deployment?'
        )

    }

}finally{    
    node {
        stage ('Entferne Testumgebung'){
            stack.removeStack()
        }
    }
}

node {
    stage ('Live Deployment'){
        cdMain.deployInProduction('commentsservice', commentsserviceImageName)
    }
}
