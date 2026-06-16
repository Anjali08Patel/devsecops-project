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
      step{
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
           withSonarQubeEnv('sonarqube') {
              sh '''
              sonar-scanner
              '''
     }
}
}
}
}
}

