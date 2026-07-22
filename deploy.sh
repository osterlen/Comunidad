#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
msg="${1:-Update Visiones / CUPA Inspira}"
git add -A
git status -sb
git commit -m "$msg" || { echo "Nothing to commit"; exit 0; }
git push
echo "Pushed. Live in ~30s: https://elgorila.org/cupainspira/"
