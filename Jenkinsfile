@Library('github.com/kekru-cd-microservice-swarm-example/jenkins-shared@master')
import steps.CDMain

def cdMain
def commentsserviceWebport
def commentsserviceImageName
def borderproxyPort

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

            def t = cdMain.startTestenvironment()
            sh './docker service update --replicas 1 --image ' + commentsserviceImageName + ' ' + t.fullServiceName('commentsservice')

            borderproxyPort = t.getBorderproxyPort()
            commentsserviceWebport = t.getPublishedPort('commentsservice', 8080)
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
