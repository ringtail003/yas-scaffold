#!/bin/bash
sleep 1

source=$(cat $(pwd)/dist/bundle.js | sed -e 's/export { .*$//')
commit_hash=$(git rev-parse --short=7 HEAD)
project_name=$(grep '"name"' $(pwd)/package.json | sed -E 's/.*"name": *"([^"]+)".*/\1/')
output_path=dist/publish.js

content=$(cat <<EOF
/**
 * @file
 *   コードはGitHubで管理しています。
 *   スクリプト編集画面で直接編集しないでください。
 * 
 * @author {SAMPLE_AUTHOR}
 * @see https://github.com/{SAMPLE_ORGANIZATION}/$project_name/commit/$commit_hash
 */
$source
EOF
)

echo "$content" > $(pwd)/$output_path
cat $(pwd)/$output_path | pbcopy

echo -e "created $output_path\n\n"
echo "クリップボードにコピーしました。スクリプト編集画面でペーストしてください。"
