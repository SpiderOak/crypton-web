#!/bin/sh
RUNDIR="$(dirname "$0")"
cd $RUNDIR

exec node $RUNDIR/app.js
