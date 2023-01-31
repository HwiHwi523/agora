/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    stages {
      stage('stop web service') {
        steps {
          script {
            try {
            echo 'stop web service container'
            sh 'docker stop server'
            sh 'docker stop client'
            }catch (e) {
            echo 'no container running'
            }
          }
        }
      }
      stage('prune container') {
        steps {
          script {
            try {
            sh 'docker container prune -y'
            } catch (e) {
            echo 'no container stopped'
            }
          }
        }
      }
      stage('remove images') {
        steps {
          script {
            try {
            sh 'docker rmi agora:server'
            sh 'docker rmi agora:client'
            } catch (e) {
            echo 'no images exist'
            }
          }
        }
      }
        stage('client build') {
      steps {
        echo 'client dockerfile build......'
        sh 'docker build -f client/Dockerfile -t agora:client .'
        echo 'client build success ........'
      }
      post {
        success {
          echo 'client build success'
        }
        failure {
          echo 'client build failed'
        }
      }
        }
    stage('server build') {
      steps {
        sh 'docker build -f server/Dockerfile -t agora:server .'
      }
      post {
        success {
          echo 'server build success'
        }
        failure {
          echo 'server build failed'
        }
      }
    }
    stage('server run') {
      steps {
        sh 'docker run --name server -d -p 9999:9999 -e USE_PROFILE=prod -e HOST_NAME=stg-yswa-kr-practice-db-master.mariadb.database.azure.com -e SCHEMA=s08p12a705 -e USERNAME=S08P12A705 -e PASSWORD=ifjOylnDQP -e JWT_SECRET=OISDUHFLWKEJRO agora:server'
      }
      post {
        success {
          echo 'server run success'
        }
        failure {
          echo 'server run failed'
        }
      }
    }
    stage('client run') {
      steps {
        sh 'docker run --name client -d -p 3000:3000  agora:client'
      }
      post {
        success {
          echo 'client run success'
        }
        failure {
          echo 'client run failed'
        }
      }
    }
    }
}
