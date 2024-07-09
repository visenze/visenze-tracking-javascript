@Library('visenze-lib')_

def runDockerCmd(cmd) {
  return "docker run --rm -v ${WORKSPACE}:${WORKSPACE} -w ${WORKSPACE} node:16-bullseye-slim ${cmd}"
}

pipeline {
  agent {
    label "${params.AGENT_LABEL ?: 'build-arm64'}"
  }

  stages {
    stage('Test') {
      steps {
        script {
          sh runDockerCmd('npm ci')
          sh runDockerCmd('npm run write-version')
          sh runDockerCmd('npx tsc')
          sh runDockerCmd('npm run test-with-coverage')
        }
      }
    }
  }
}
