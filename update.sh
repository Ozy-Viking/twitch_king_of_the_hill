#!/usr/bin/env bash
version="v0.1.0"
set -o errexit

while getopts 'Vmsat:p' OPTION; do
case "$OPTION" in
  V )
    echo "$version"
    exit
    ;;
  m )
    COMMIT=true
    msg=$OPTARG;
    ;;
  s )
    STATUS=true
    ;;
  a )
    ADD=true
    ;;
  t )
    git_tag=$OPTARG
    ;;
  p )
    PUSH=true
    ;;
esac;
done

if [[ -n "$git_tag" ]]; then
  sed -i "s/\(image:.*:\).*$/\1${git_tag}/" ./docker-compose.yaml
  ${0%/*}/scripts/version.sh v${git_tag}
fi
if [[ -n "$ADD" ]]; then
  git add ${0%/*}
fi
if [[ -n "$COMMIT" ]]; then
echo "commit"
  if [[ -n "$msg" ]]; then
    git commit -a --allow-empty -m "${msg}"
  else
    echo "right place"
    git commit -a --allow-empty
  fi
fi
if [[ -n "$git_tag" ]]; then
  git tag v${git_tag}
fi
if [[ -n "$PUSH" ]]; then
  git push origin HEAD --tags
fi
if [[ -n "$STATUS" ]]; then
  git status
fi