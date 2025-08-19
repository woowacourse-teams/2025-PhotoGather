#!/bin/bash

JAR_NAME="forgather-0.0.1-SNAPSHOT.jar"
PORT=8080
LOG_DIR="/home/ubuntu/2025-PhotoGather/logs"
JAR_PATH="/home/ubuntu/2025-PhotoGather/$JAR_NAME"
LOG_FILE="$LOG_DIR/prod.log"

echo "🛑 기존 $PORT 포트 프로세스 종료 시도..."
PID=$(sudo lsof -t -i:$PORT)

if [ -n "$PID" ]; then
  echo "🔍 PID $PID 종료 중..."
  kill -9 $PID
  echo "✅ 프로세스 종료 완료"
else
  echo "ℹ️  $PORT 포트에 실행 중인 프로세스 없음"
fi

echo "🔐 jar 실행 권한 및 소유자 변경..."
sudo chown ubuntu:ubuntu "$JAR_PATH"
sudo chmod 744 "$JAR_PATH"

echo "📁 로그 디렉토리 생성..."
sudo -u ubuntu mkdir -p "$LOG_DIR"

echo "🚀 ubuntu 사용자로 애플리케이션 실행 (포트: $PORT)..."
sudo -u ubuntu nohup java -jar "$JAR_PATH" --server.port=$PORT &

echo "✅ 배포 완료. 로그: $LOG_FILE"
