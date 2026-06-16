pipeline {
    agent any
    stages {
        stage('Checkout Code'){
          steps {
               git branch: 'main', url: 'https://github.com/Anjali08Patel/devsecops-project.git'
          }
      }
      stage('Docker Build') {
        steps {
          sh 'docker build -t devsecops-backend:v1 backend'
        }
      }
      stage ('Docker Run Test'){
        steps {
          sh 'docker run -d -p 5000:5000 --name test-container devsecops-backend:v1'
        }
      }
      stage ('Cleanup'){
        steps {
          sh 'docker rm -f test-container || true'
        }
     }
} 
}
