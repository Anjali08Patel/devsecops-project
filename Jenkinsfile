pipeline {
    agent any
    tools {
       sonarQubeScanner 'sonar-scanner'
    }
    stages {
       stage('Checkout'){
         steps{
            checkout scm
         }
      }
    stage('Verify Files'){
      steps{
         sh '''
         pwd
         ls -la
         ls -la backend
        '''
       }

    }
    stage('SonarQube Scan'){
      steps {
         dir('backend'){
           script {
               def scannerHome = tool 'sonar-scanner'
           withSonarQubeEnv('sonarqube') {
              sh "${scannerHome}/bin/sonar-scanner"
}
     }
}
}
}
}
}

