#!/bin/sh
set -e
# this scripts is to make the container shutdown faster
# references:
# - https://www.ctl.io/developers/blog/post/gracefully-stopping-docker-containers/
# - https://dirask.com/posts/Bash-forward-SIGTERM-to-child-processes-DkBqq1

PIDS_FILE="/tmp/pids"
run() {
    echo "$*"                # feedback of execution
    "$@" &                   # async execution
    pid=$!                   # save pid
    echo "$pid" >>$PIDS_FILE # store pid
    wait "$pid"              # await pid
}

terminate() {
    # forward TERM signal to all subprocesses whose pid reside on $PIDS_FILE
    xargs -f $PIDS_FILE -I{} "kill -TERM '{}' 2> /dev/null"
}
trap terminate TERM

run npm install
run npm dev
