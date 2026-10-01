#!/usr/bin/env bash
# Concatena src/*.css (orden por prefijo numérico) en dist/bedrock-theme.css
set -euo pipefail
cd "$(dirname "$0")"
LC_ALL=C cat src/*.css > dist/bedrock-theme.css
echo "dist/bedrock-theme.css: $(wc -c < dist/bedrock-theme.css) bytes"
