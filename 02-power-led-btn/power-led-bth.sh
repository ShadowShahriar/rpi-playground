#! /bin/sh

### BEGIN INIT INFO
# Provides:          power-led-btn.py
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
### END INIT INFO

SOURCE_CODE="power-led-btn.py"

case "$1" in
  start)
    echo "Starting listener..."
    python /usr/local/bin/$SOURCE_CODE &
    ;;
  stop)
    echo "Stopping listener..."
    pkill -f /usr/local/bin/$SOURCE_CODE
    ;;
  *)
    exit 1
    ;;
esac

exit 0