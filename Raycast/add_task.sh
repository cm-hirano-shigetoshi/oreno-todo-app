#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title task
# @raycast.mode silent

# Optional parameters:
# @raycast.icon 🤖
# @raycast.argument1 {"type": "text", "placeholder": "title"}
# @raycast.argument2 {"type": "text", "placeholder": "taskcode", "optional": true}
# @raycast.argument3 {"type": "text", "placeholder": "comment", "optional": true}

summary="$(iconv -f utf-8 -t utf-8-mac | iconv -f utf-8-mac -t utf-8 <<< $1)"
taskcode="$(iconv -f utf-8 -t utf-8-mac | iconv -f utf-8-mac -t utf-8 <<< $2)"
comment="$(iconv -f utf-8 -t utf-8-mac | iconv -f utf-8-mac -t utf-8 <<< $3)"
date=$(date +%Y-%m-%d)
curl -X POST http://localhost:3001/addTask -H "Content-Type: application/json" -d "{\"summary\": \"$summary\", \"taskcode\": \"$taskcode\", \"memo\": \"$memo\"}"
