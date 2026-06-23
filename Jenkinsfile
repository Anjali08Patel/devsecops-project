pipeline {
    agent any
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
   stage('Docker build'){
   steps{
      dir('backend'){
      sh'''
      docker build \
      -t devsecops-backend:${BUILD_NUMBER} .
      '''
    }
   }
 }
  stage('List Image'){
  steps{
     sh '''
     docker images
     '''
    }
  }
   stage('ESLint'){
    steps {
      dir('backend'){
        sh '''
        npm install
        npx eslint .
        '''
       }
     }
   }
  stage('NPM Audit'){
  steps{
    dir('backend'){
    sh '''
    npm audit
     '''
    }
   }
  }
}
}
