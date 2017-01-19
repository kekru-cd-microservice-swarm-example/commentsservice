@Library('github.com/kekru-cd-microservice-swarm-example/jenkins-shared@master')
import steps.CDMain

def an
def commentsserviceWebport
def commentsserviceImageName


node {
   def commit_id    
  
   stage('Preparation') {

      git 'https://github.com/kekru-cd-microservice-swarm-example/commentsservice'
      
      an = new CDMain(steps)
      an.init()
   }

   stage('Build') {

      commentsserviceImageName = an.buildAndPush('commentsservice')
   }
   stage('Starte Testumgebung') {

        def t = an.startTestenvironment()
        sh './docker service update --replicas 1 --image ' + commentsserviceImageName + ' ' + t.fullServiceName('commentsservice')


        commentsserviceWebport = t.getPublishedPort('commentsservice', 8080)
        echo '8080 -> ' + commentsserviceWebport
        an.waitForTCP(commentsserviceWebport)
   }
}


stage ('Manuelle Tests'){
    def userInput = input(
        id: 'userInput', message: 'Erfolgreich getestete Version erreichbar unter http://10.1.6.210:'+commentsserviceWebport+' Live Deployment?', parameters: [
            [$class: 'TextParameterDefinition', defaultValue: 'uat', description: 'Environment', name: 'env'],
            [$class: 'TextParameterDefinition', defaultValue: 'uat1', description: 'Target', name: 'target']
        ]
    )

    echo ("Env: "+userInput['env'])
    echo ("Target: "+userInput['target'])

}

node {
    stage ('Live Deployment'){
        an.deployInProduction('commentsservice', commentsserviceImageName)
    }
}
