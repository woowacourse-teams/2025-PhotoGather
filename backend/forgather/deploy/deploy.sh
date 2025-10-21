#!/bin/bash

# ========================================
# 무중단 배포 스크립트 (Blue-Green Deployment)
# ========================================

JAR_NAME="forgather-0.0.1-SNAPSHOT.jar"
BLUE_PORT=8080
GREEN_PORT=8081
APP_LOG_DIR="/home/ubuntu/2025-PhotoGather/logs"
BODY_LOG_DIR="/home/ubuntu/2025-PhotoGather/logs/body"
ERROR_LOG_DIR="/home/ubuntu/2025-PhotoGather/logs/error"
JAR_PATH="/home/ubuntu/2025-PhotoGather/$JAR_NAME"

PROD_NGINX_CONF="/etc/nginx/sites-available/api.forgather.me.conf"
DEV_NGINX_CONF="/etc/nginx/sites-available/api.dev.forgather.me.conf"

HEALTH_CHECK_URL="http://localhost"
HEALTH_CHECK_PATH="/actuator/health"
MAX_RETRY=30
RETRY_INTERVAL=1
ALERT_SCRIPT="/home/ubuntu/alert.sh"  # 알림 스크립트 경로

# ========================================
# 1. 현재 실행 중인 포트 확인 (Blue 포트)
# ========================================
echo "🔍 현재 실행 중인 애플리케이션 포트 확인..."

BLUE_PID=$(sudo lsof -t -i:$BLUE_PORT)
GREEN_PID=$(sudo lsof -t -i:$GREEN_PORT)

if [ -n "$BLUE_PID" ]; then
    CURRENT_PORT=$BLUE_PORT
    TARGET_PORT=$GREEN_PORT
    echo "✅ Blue 포트($BLUE_PORT) 실행 중 → Green 포트($GREEN_PORT)로 배포"
elif [ -n "$GREEN_PID" ]; then
    CURRENT_PORT=$GREEN_PORT
    TARGET_PORT=$BLUE_PORT
    echo "✅ Green 포트($GREEN_PORT) 실행 중 → Blue 포트($BLUE_PORT)로 배포"
else
    # 최초 배포: 기본적으로 Blue 포트에 배포
    CURRENT_PORT=0
    TARGET_PORT=$BLUE_PORT
    echo "ℹ️  실행 중인 애플리케이션 없음 → Blue 포트($BLUE_PORT)로 최초 배포"
fi

# ========================================
# 2. 새 버전을 Target 포트에서 실행
# ========================================
echo "🔐 jar 실행 권한 및 소유자 변경..."
sudo chown ubuntu:ubuntu "$JAR_PATH"
sudo chmod 744 "$JAR_PATH"

echo "📁 로그 디렉토리 생성..."
sudo -u ubuntu mkdir -p "$APP_LOG_DIR" # 이미 존재하는 경우 넘어감
sudo -u ubuntu mkdir -p "$BODY_LOG_DIR" # 이미 존재하는 경우 넘어감
sudo -u ubuntu mkdir -p "$ERROR_LOG_DIR" # 이미 존재하는 경우 넘어감

echo "🚀 새 버전 애플리케이션 실행 (포트: $TARGET_PORT)..."
sudo -u ubuntu nohup java -jar "$JAR_PATH" --server.port=$TARGET_PORT 1> /dev/null 2>&1 &

sleep 3  # 프로세스 시작 대기

# ========================================
# 3. Target 포트 헬스체크
# ========================================
echo "🏥 헬스체크 시작 (최대 ${MAX_RETRY}초)..."

HEALTH_CHECK_SUCCESS=false

for i in $(seq 1 $MAX_RETRY); do
    HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}" ${HEALTH_CHECK_URL}:${TARGET_PORT}${HEALTH_CHECK_PATH})

    if [ "$HTTP_STATUS" == "200" ]; then
        echo "✅ 헬스체크 성공! (${i}초 소요)"
        HEALTH_CHECK_SUCCESS=true
        break
    else
        echo "⏳ 헬스체크 대기 중... (${i}/${MAX_RETRY}초) - HTTP Status: $HTTP_STATUS"
        sleep $RETRY_INTERVAL
    fi
done

# ========================================
# 4. 헬스체크 실패 시 롤백
# ========================================
if [ "$HEALTH_CHECK_SUCCESS" != "true" ]; then
    echo "❌ 헬스체크 실패! 새 버전 종료 및 기존 버전 유지"

    # 새로 띄운 애플리케이션 종료
    TARGET_PID=$(sudo lsof -t -i:$TARGET_PORT)
    if [ -n "$TARGET_PID" ]; then
        kill -9 $TARGET_PID
        echo "🛑 포트 $TARGET_PORT 프로세스 종료 완료"
    fi

    # 알림 스크립트 실행
    if [ -f "$ALERT_SCRIPT" ]; then
        bash "$ALERT_SCRIPT" "배포 실패: 헬스체크 타임아웃 (포트: $TARGET_PORT)"
    fi

    echo "💡 현재 포트($CURRENT_PORT)로 서비스 계속 제공 중"
    exit 1
fi

# ========================================
# 5. Nginx 설정 변경 (Green으로 전환)
# ========================================
echo "🔧 Nginx 설정 변경 중..."

# proxy_pass의 포트를 TARGET_PORT로 변경
sudo sed -i "s|proxy_pass http://localhost:[0-9]\+|proxy_pass http://localhost:$TARGET_PORT|g" "$DEV_NGINX_CONF"
sudo sed -i "s|proxy_pass http://localhost:[0-9]\+|proxy_pass http://localhost:$TARGET_PORT|g" "$PROD_NGINX_CONF"

# Nginx 설정 테스트
if sudo nginx -t; then
    echo "✅ Nginx 설정 검증 성공"
    sudo systemctl reload nginx
    echo "✅ Nginx 리로드 완료"
else
    echo "❌ Nginx 설정 오류! 변경 사항 롤백"

    # Nginx 설정 롤백
    if [ "$CURRENT_PORT" != "0" ]; then
        sudo sed -i "s|proxy_pass http://localhost:[0-9]\+|proxy_pass http://localhost:$CURRENT_PORT|g" "$DEV_NGINX_CONF"
        sudo sed -i "s|proxy_pass http://localhost:[0-9]\+|proxy_pass http://localhost:$CURRENT_PORT|g" "$PROD_NGINX_CONF"
        sudo systemctl reload nginx
    fi

    # 새 애플리케이션 종료
    TARGET_PID=$(sudo lsof -t -i:$TARGET_PORT)
    if [ -n "$TARGET_PID" ]; then
        kill -9 $TARGET_PID
    fi

    # 알림
    if [ -f "$ALERT_SCRIPT" ]; then
        bash "$ALERT_SCRIPT" "배포 실패: Nginx 설정 오류"
    fi

    exit 1
fi

# ========================================
# 6. 기존 버전(Blue) 종료
# ========================================
if [ "$CURRENT_PORT" != "0" ]; then
    echo "🛑 기존 버전 종료 중 (포트: $CURRENT_PORT)..."

    CURRENT_PID=$(sudo lsof -t -i:$CURRENT_PORT)
    if [ -n "$CURRENT_PID" ]; then
        kill -9 $CURRENT_PID
        echo "✅ 포트 $CURRENT_PORT 프로세스 종료 완료"
    fi
else
    echo "ℹ️  최초 배포이므로 종료할 기존 프로세스 없음"
fi

# ========================================
# 7. 배포 완료
# ========================================
echo ""
echo "═══════════════════════════════════════"
echo "🎉 무중단 배포 완료!"
echo "═══════════════════════════════════════"
echo "📍 현재 활성 포트: $TARGET_PORT"
echo "🌐 Nginx 프록시: localhost:$TARGET_PORT"
echo "═══════════════════════════════════════"
